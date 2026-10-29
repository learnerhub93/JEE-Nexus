import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, ShieldAlert, Sparkles, Bell } from 'lucide-react';

interface StudyTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTimerUpdate?: (secondsLeft: number, isRunning: boolean, modeName: string) => void;
}

export const StudyTimerModal: React.FC<StudyTimerModalProps> = ({ isOpen, onClose, onTimerUpdate }) => {
  const [mode, setMode] = useState<'pomodoro_25' | 'deep_45' | 'exam_180' | 'break_5'>('pomodoro_25');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getInitialSeconds = (selectedMode: 'pomodoro_25' | 'deep_45' | 'exam_180' | 'break_5'): number => {
    switch (selectedMode) {
      case 'pomodoro_25':
        return 25 * 60;
      case 'deep_45':
        return 45 * 60;
      case 'exam_180':
        return 180 * 60; // 3 Hours JEE Exam Stamina
      case 'break_5':
        return 5 * 60;
    }
  };

  const getModeTitle = (): string => {
    switch (mode) {
      case 'pomodoro_25': return '25m Pomodoro Focus';
      case 'deep_45': return '45m Deep Concept Session';
      case 'exam_180': return '3-Hour JEE Exam Stamina';
      case 'break_5': return '5m Quick Recharge';
    }
  };

  const playChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio chime not supported');
    }
  };

  const handleModeChange = (newMode: 'pomodoro_25' | 'deep_45' | 'exam_180' | 'break_5') => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsRemaining(getInitialSeconds(newMode));
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playChime();
            setSessionCount((c) => c + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    onTimerUpdate?.(secondsRemaining, isRunning, getModeTitle());
  }, [secondsRemaining, isRunning, mode]);

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsRemaining(getInitialSeconds(mode));
  };

  const addMinutes = (mins: number) => {
    setSecondsRemaining((prev) => Math.max(0, prev + mins * 60));
  };

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalModeSeconds = getInitialSeconds(mode);
  const progressPercent = Math.min(100, Math.max(0, ((totalModeSeconds - secondsRemaining) / totalModeSeconds) * 100));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-2xl transition-all scrollbar-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Bell className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                JEE Study Timer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distraction-Free Focus & Stamina Training
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            aria-label="Close Timer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => handleModeChange('pomodoro_25')}
            className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-semibold transition-all border ${
              mode === 'pomodoro_25'
                ? 'bg-blue-500 text-white border-blue-600 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            🍅 25m Pomodoro
          </button>
          <button
            onClick={() => handleModeChange('deep_45')}
            className={`min-h-[42px] rounded-xl px-3 py-2 text-xs font-semibold transition-all border ${
              mode === 'deep_45'
                ? 'bg-blue-500 text-white border-blue-600 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            ⚡ 45m Deep Work
          </button>
          <button
            onClick={() => handleModeChange('exam_180')}
            className={`col-span-2 min-h-[44px] rounded-xl px-3 py-2.5 text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
              mode === 'exam_180'
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-600 shadow-sm'
                : 'border-amber-300/60 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 hover:bg-amber-100/50'
            }`}
          >
            <ShieldAlert className="h-4 w-4" />
            <span>🎯 3-Hour JEE Exam Stamina Mode</span>
          </button>
          <button
            onClick={() => handleModeChange('break_5')}
            className={`col-span-2 min-h-[38px] rounded-xl px-3 py-1.5 text-xs font-medium transition-all border ${
              mode === 'break_5'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            ☕ 5m Quick Break
          </button>
        </div>

        {/* Timer Digital Display */}
        <div className="my-6 text-center">
          <div className="relative inline-flex items-center justify-center">
            <span className="font-mono text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-xs">
              {formatTime(secondsRemaining)}
            </span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            {getModeTitle()} {isRunning ? '• Active Session' : '• Paused'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
            <div
              className={`h-full transition-all duration-300 ${
                mode === 'exam_180' ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <button
            onClick={toggleStartPause}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-sm text-white shadow-md transition-all ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5 fill-white" />
                <span>{secondsRemaining === totalModeSeconds ? 'Start Session' : 'Resume'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => addMinutes(5)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Add 5 Minutes"
          >
            +5m
          </button>
        </div>

        {/* Footer tip */}
        <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3 text-center border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'exam_180'
              ? '💡 Simulates 9:00 AM – 12:00 PM JEE Shift conditions. Train your brain for sustained 180 min concentration!'
              : `🎯 Completed today: ${sessionCount} focus session${sessionCount === 1 ? '' : 's'}. Keep up the momentum!`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyTimerModal;

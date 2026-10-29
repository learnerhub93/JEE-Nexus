import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Zap,
  AlertTriangle,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Chapter, PracticePYQ } from '../types';
import MathRenderer from './MathRenderer';
import MathText from './MathText';
import { getChapterPracticePYQs } from '../data/practicePYQData';

interface PracticePYQViewProps {
  chapter: Chapter;
  savedAnswers?: Record<string, 'A' | 'B' | 'C' | 'D'>;
  onSaveAnswers: (chapterId: string, answers: Record<string, 'A' | 'B' | 'C' | 'D'>) => void;
}

export const PracticePYQView: React.FC<PracticePYQViewProps> = ({
  chapter,
  savedAnswers = {},
  onSaveAnswers,
}) => {
  const questions: PracticePYQ[] = getChapterPracticePYQs(chapter);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>(savedAnswers);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Sync state if savedAnswers changes externally
  React.useEffect(() => {
    setAnswers(savedAnswers || {});
  }, [savedAnswers]);

  // Handle Option Select
  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    const q = questions.find((item) => item.id === questionId);
    if (!q) return;

    const newAnswers = {
      ...answers,
      [questionId]: optionKey,
    };
    setAnswers(newAnswers);
    onSaveAnswers(chapter.id, newAnswers);

    // Auto expand solution upon answering
    setExpandedSolutions((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    // If answer is correct, fire subtle confetti
    if (optionKey === q.correctOption) {
      try {
        confetti({
          particleCount: 35,
          spread: 55,
          origin: { y: 0.7 },
          colors: ['#10B981', '#3B82F6', '#F59E0B'],
        });
      } catch (err) {}
    }
  };

  // Toggle Solution Expand
  const toggleSolution = (questionId: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Reset Quiz
  const handleResetQuiz = () => {
    setAnswers({});
    setExpandedSolutions({});
    onSaveAnswers(chapter.id, {});
  };

  // Compute JEE Score (+4 for correct, -1 for wrong, 0 for unattempted)
  const stats = React.useMemo(() => {
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;

    questions.forEach((q) => {
      const selected = answers[q.id];
      if (selected) {
        attemptedCount++;
        if (selected === q.correctOption) {
          score += 4;
          correctCount++;
        } else {
          score -= 1;
          incorrectCount++;
        }
      }
    });

    const maxScore = questions.length * 4;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    return {
      score,
      maxScore,
      correctCount,
      incorrectCount,
      attemptedCount,
      totalCount: questions.length,
      accuracy,
    };
  }, [questions, answers]);

  return (
    <div className="space-y-6">
      {/* Quiz Header & JEE Marking Scheme Banner */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                <Target className="h-3.5 w-3.5" />
                <span>NTA JEE Main Pattern</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Marking Scheme: <strong className="text-emerald-600 dark:text-emerald-400">+4</strong> Correct / <strong className="text-rose-500">-1</strong> Negative
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎯 Practice Top {questions.length} High-Yield PYQs</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Hand-picked from recent JEE Main shifts targeting the 80/20 repeat concepts. Test your readiness with immediate step-by-step verification.
            </p>
          </div>

          {/* Reset / Re-attempt Button */}
          {stats.attemptedCount > 0 && (
            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors self-start md:self-auto shrink-0 shadow-xs"
              title="Reset all selections to re-attempt this quiz"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Re-attempt Quiz</span>
            </button>
          )}
        </div>

        {/* Live Scorecard & Quick Question Jump Strip */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">
              Current Score
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`text-xl font-black font-mono ${stats.score > 0 ? 'text-emerald-600 dark:text-emerald-400' : stats.score < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {stats.score > 0 ? `+${stats.score}` : stats.score}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ {stats.maxScore}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">
              Attempted
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
                {stats.attemptedCount}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ {stats.totalCount} Qs</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">
              Accuracy
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-black font-mono text-blue-600 dark:text-blue-400">
                {stats.accuracy}%
              </span>
              <span className="text-xs text-slate-400">({stats.correctCount} correct)</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/40 p-3">
            <span className="text-[11px] font-semibold uppercase text-slate-400 block">
              Status
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              {stats.attemptedCount === stats.totalCount ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> All Answered
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-500">
                  {stats.totalCount - stats.attemptedCount} remaining
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Question Jump Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none touch-scroll">
          <span className="text-xs font-bold text-slate-500 shrink-0">Jump to:</span>
          {questions.map((q, idx) => {
            const selected = answers[q.id];
            const isAnswered = !!selected;
            const isCorrect = selected === q.correctOption;

            return (
              <a
                key={q.id}
                href={`#${q.id}`}
                className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                  !isAnswered
                    ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                    : isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                }`}
              >
                <span>Q{idx + 1}</span>
                {isAnswered && (
                  isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                  )
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* List of Practice Questions */}
      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selectedOption = answers[q.id];
          const hasAnswered = !!selectedOption;
          const isCorrect = selectedOption === q.correctOption;
          const isSolutionOpen = expandedSolutions[q.id] ?? false;

          return (
            <div
              key={q.id}
              id={q.id}
              className={`rounded-2xl border transition-all p-4 sm:p-6 scroll-mt-24 ${
                !hasAnswered
                  ? 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] shadow-xs'
                  : isCorrect
                  ? 'border-emerald-300/80 dark:border-emerald-800/80 bg-white dark:bg-[#1E293B] shadow-sm'
                  : 'border-rose-300/80 dark:border-rose-800/80 bg-white dark:bg-[#1E293B] shadow-sm'
              }`}
            >
              {/* Question Header Bar */}
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center justify-center h-6 w-6 rounded-lg bg-blue-600 text-white font-mono text-xs font-bold shrink-0">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {q.yearTag}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    • {q.conceptTested}
                  </span>
                </div>

                {/* Score Tag for this question */}
                {hasAnswered && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md border ${
                      isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>+4 Marks (Correct)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        <span>-1 Mark (Penalty)</span>
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Statement */}
              <div className="mb-5">
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line break-words">
                  <MathText text={q.question} />
                </p>
                {q.latexQuestion && (
                  <div className="mt-2 text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 overflow-x-auto max-w-full">
                    <MathRenderer math={q.latexQuestion} display={true} />
                  </div>
                )}
              </div>

              {/* 4 Interactive Option Buttons */}
              <div className="space-y-2.5">
                {q.options.map((opt) => {
                  const isSelected = selectedOption === opt.key;
                  const isThisCorrect = q.correctOption === opt.key;

                  let optionStyle =
                    'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300';
                  let badge = null;

                  if (hasAnswered) {
                    if (isThisCorrect) {
                      // Correct option always highlighted green
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/30 font-bold';
                      badge = (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 self-center">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span className="hidden xs:inline">Correct</span>
                        </span>
                      );
                    } else if (isSelected && !isThisCorrect) {
                      // Wrong selected option highlighted red
                      optionStyle =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/30 font-bold';
                      badge = (
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 shrink-0 self-center">
                          <XCircle className="h-4 w-4 text-rose-500" />
                          <span className="hidden xs:inline">Your Choice</span>
                        </span>
                      );
                    } else {
                      // Other unchosen options faded
                      optionStyle =
                        'border-slate-200/60 dark:border-slate-800/60 bg-transparent text-slate-400 dark:text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(q.id, opt.key)}
                      disabled={hasAnswered}
                      className={`min-h-[48px] w-full text-left rounded-xl border p-3 sm:p-3.5 transition-all flex items-start justify-between gap-2.5 ${optionStyle} ${
                        !hasAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0 flex-1">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-lg font-mono text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected && isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isSelected && !isCorrect
                              ? 'bg-rose-600 text-white'
                              : isThisCorrect && hasAnswered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <div className="text-xs sm:text-sm font-medium min-w-0 flex-1">
                          <span className="break-words">
                            <MathText text={opt.text} />
                          </span>
                          {opt.latex && (
                            <div className="mt-1 overflow-x-auto max-w-full">
                              <MathRenderer math={opt.latex} display={false} />
                            </div>
                          )}
                        </div>
                      </div>

                      {badge}
                    </button>
                  );
                })}
              </div>

              {/* Solution Toggle Bar (Visible after answering or via reveal button) */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>
                    {isSolutionOpen ? 'Hide Step-by-Step Solution' : 'View Step-by-Step Shortcut Solution'}
                  </span>
                  {isSolutionOpen ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                {!hasAnswered && (
                  <span className="text-[11px] text-slate-400 italic">
                    Select an option above to check answer immediately
                  </span>
                )}
              </div>

              {/* Collapsible Step-by-Step Solution Card */}
              {isSolutionOpen && (
                <div className="mt-4 rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-4 sm:p-5 space-y-4 text-xs sm:text-sm animate-fadeIn">
                  {/* Correct Option Banner */}
                  <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-600 text-white text-xs font-mono">
                      {q.correctOption}
                    </span>
                    <span>Correct Option: Option {q.correctOption}</span>
                  </div>

                  {/* Step-by-Step Methodical Solution */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Methodical Working:
                    </h5>
                    <ol className="space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300">
                      {q.solutionSteps.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          <span>
                            <MathText text={step} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* ⚡ NTA Speed Shortcut */}
                  {q.shortcutMethod && (
                    <div className="rounded-xl border border-amber-300/80 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/40 p-3.5 text-amber-900 dark:text-amber-200">
                      <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                        <Zap className="h-3.5 w-3.5 fill-current" />
                        <span>NTA Speed Shortcut & Elimination Trick</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed font-medium">
                        <MathText text={q.shortcutMethod} />
                      </p>
                    </div>
                  )}

                  {/* ⚠️ Trap Alert */}
                  {q.trapAlert && (
                    <div className="rounded-xl border border-purple-300/80 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/40 p-3.5 text-purple-900 dark:text-purple-200">
                      <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Common JEE Trap Avoided</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        <MathText text={q.trapAlert} />
                      </p>
                    </div>
                  )}

                  {/* NCERT Reference */}
                  {q.ncertReference && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-blue-100 dark:border-blue-900/40 pt-2 flex items-center justify-between">
                      <span>Ref: {q.ncertReference}</span>
                      <span>Verified for JEE Main Syllabus</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticePYQView;

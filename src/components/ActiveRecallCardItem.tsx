import React, { useState } from 'react';
import { RotateCw, CheckCircle2, RotateCcw, Sparkles, BookOpen, Lightbulb, Zap, AlertTriangle, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveRecallCard } from '../types';
import MathRenderer from './MathRenderer';
import MathText from './MathText';

export type CardMasteryStatus = 'mastered' | 'revision' | 'unreviewed';

interface ActiveRecallCardItemProps {
  card: ActiveRecallCard;
  status?: CardMasteryStatus;
  onSetStatus: (cardId: string, status: CardMasteryStatus) => void;
  onNavigateChapter?: (chapterId: string) => void;
  compact?: boolean;
}

export const ActiveRecallCardItem: React.FC<ActiveRecallCardItemProps> = ({
  card,
  status = 'unreviewed',
  onSetStatus,
  onNavigateChapter,
  compact = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleMasteredClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = status === 'mastered' ? 'unreviewed' : 'mastered';
    onSetStatus(card.id, nextStatus);
    if (nextStatus === 'mastered') {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10B981', '#3B82F6', '#F59E0B'],
        });
      } catch (err) {}
    }
  };

  const handleRevisionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = status === 'revision' ? 'unreviewed' : 'revision';
    onSetStatus(card.id, nextStatus);
  };

  // Color accents based on subject
  const subjectAccent =
    card.subject === 'physics'
      ? {
          border: 'border-blue-200 dark:border-blue-900/60',
          badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          highlight: 'text-blue-600 dark:text-blue-400',
        }
      : card.subject === 'chemistry'
      ? {
          border: 'border-emerald-200 dark:border-emerald-900/60',
          badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          highlight: 'text-emerald-600 dark:text-emerald-400',
        }
      : {
          border: 'border-amber-200 dark:border-amber-900/60',
          badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          highlight: 'text-amber-600 dark:text-amber-400',
        };

  return (
    <div className="flex flex-col w-full select-none">
      {/* 3D Flip Card Container */}
      <div
        className="perspective-1000 w-full cursor-pointer"
        onClick={handleCardClick}
      >
        <div
          className={`relative w-full ${
            compact ? 'min-h-[310px] sm:min-h-[330px]' : 'min-h-[320px] sm:min-h-[340px]'
          } rounded-2xl transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* ==================================================== */}
          {/* FRONT FACE: PROMPT / SITUATION / QUESTION           */}
          {/* ==================================================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl border-2 ${subjectAccent.border} bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow backface-hidden flex flex-col justify-between overflow-y-auto scrollbar-none`}
          >
            {/* Top Bar of Front */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold border uppercase tracking-wide ${subjectAccent.badge}`}
                  >
                    {card.subject} • Cl {card.classLevel}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    {card.categoryLabel}
                  </span>
                </div>

                {/* Status Indicator Chip */}
                {status === 'mastered' && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <Zap className="h-3 w-3" />
                    <span>Mastered ⚡</span>
                  </span>
                )}
                {status === 'revision' && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-rose-100 dark:bg-rose-950 px-2 py-0.5 text-[10px] font-bold text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    <RotateCcw className="h-3 w-3" />
                    <span>Needs Revision 🔁</span>
                  </span>
                )}
              </div>

              {card.highYieldBadge && (
                <div className="mb-2">
                  <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900/60">
                    {card.highYieldBadge}
                  </span>
                </div>
              )}

              {/* Context Pill */}
              {card.promptContext && (
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mb-1.5">
                  {card.promptContext}
                </p>
              )}

              {/* Main Prompt */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                <MathText text={card.prompt} />
              </h3>
            </div>

            {/* Bottom Hint on Front */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[200px] text-[11px]">
                {card.chapterTitle}
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                <RotateCw className="h-3.5 w-3.5 transition-transform duration-500 hover:rotate-180" />
                <span>Flip Card ➔</span>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* BACK FACE: EXACT ANSWER, FORMULA & CLEVER MNEMONIC   */}
          {/* ==================================================== */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-[#13222B] p-5 sm:p-6 shadow-sm backface-hidden rotate-y-180 flex flex-col justify-between overflow-y-auto scrollbar-none`}
          >
            <div>
              {/* Back Top Bar */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Exact Answer & Vault</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400">
                  Click card to flip back
                </span>
              </div>

              {/* Text Answer */}
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed mb-3">
                <MathText text={card.answer} />
              </p>

              {/* KaTeX Math / Equation if present */}
              {card.latex && (
                <div className="my-2.5 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-900/50 p-2.5 text-center overflow-x-auto shadow-xs text-slate-900 dark:text-slate-100">
                  <MathRenderer math={card.latex} display={true} />
                </div>
              )}

              {/* Clever Memory Trick / Mnemonic Callout Box */}
              <div className="my-2.5 rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50/90 dark:bg-amber-950/40 p-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                  <Lightbulb className="h-4 w-4 fill-amber-400 text-amber-600 shrink-0" />
                  <span>Clever Memory Trick / Mnemonic</span>
                </div>
                <p className="text-xs font-medium text-amber-950 dark:text-amber-100 leading-relaxed">
                  <MathText text={card.mnemonic} />
                </p>
              </div>

              {/* Extra Explanation / NCERT Takeaway if present */}
              {card.explanation && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">NCERT Note: </span>
                  <MathText text={card.explanation} />
                </p>
              )}
            </div>

            {/* Back Footer */}
            <div className="pt-3 mt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[200px]">
                {card.chapterTitle}
              </span>
              <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                <RotateCw className="h-3 w-3" />
                <span>Showing Back</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* ACTION BUTTONS UNDER CARD: "Needs Revision 🔁" & "Mastered ⚡" */}
      {/* ==================================================== */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={handleRevisionClick}
          className={`min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border shadow-xs ${
            status === 'revision'
              ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-500/30'
              : 'border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40'
          }`}
          title="Mark this card for immediate revision"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Needs Revision 🔁</span>
        </button>

        <button
          onClick={handleMasteredClick}
          className={`min-h-[42px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border shadow-xs ${
            status === 'mastered'
              ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500/30'
              : 'border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
          title="Mark this concept as mastered"
        >
          <Zap className="h-3.5 w-3.5 fill-current" />
          <span>Mastered ⚡</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveRecallCardItem;

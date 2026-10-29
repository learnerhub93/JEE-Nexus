import React from 'react';
import { Trophy, Flame, Star, Target, CheckCircle2, Award } from 'lucide-react';
import { Chapter, UserChapterState } from '../types';

interface ProgressAnalyticsBannerProps {
  chapters: Chapter[];
  userStates: Record<string, UserChapterState>;
  onFilterHighYield: () => void;
  onFilterWeakOnly: () => void;
  isHighYieldActive: boolean;
  isWeakActive: boolean;
}

export const ProgressAnalyticsBanner: React.FC<ProgressAnalyticsBannerProps> = ({
  chapters,
  userStates,
  onFilterHighYield,
  onFilterWeakOnly,
  isHighYieldActive,
  isWeakActive,
}) => {
  const totalChapters = chapters.length;

  const masteredChapters = chapters.filter(
    (ch) => userStates[ch.id]?.status === 'mastered'
  );
  const inProgressChapters = chapters.filter(
    (ch) => userStates[ch.id]?.status === 'in_progress'
  );

  const overallPercent = totalChapters > 0
    ? Math.round((masteredChapters.length / totalChapters) * 100)
    : 0;

  // High Repeat (80/20 Pareto)
  const highRepeatChapters = chapters.filter((ch) => ch.repeatPriority === 'high');
  const highRepeatMastered = highRepeatChapters.filter(
    (ch) => userStates[ch.id]?.status === 'mastered'
  );
  const highRepeatPercent = highRepeatChapters.length > 0
    ? Math.round((highRepeatMastered.length / highRepeatChapters.length) * 100)
    : 0;

  // Weak chapters count
  const weakChaptersCount = chapters.filter((ch) => userStates[ch.id]?.isWeakTopic).length;

  // Subject breakdowns
  const getSubjectStats = (subject: 'physics' | 'chemistry' | 'mathematics') => {
    const subChapters = chapters.filter((ch) => ch.subject === subject);
    const subMastered = subChapters.filter((ch) => userStates[ch.id]?.status === 'mastered');
    const percent = subChapters.length > 0 ? Math.round((subMastered.length / subChapters.length) * 100) : 0;
    return {
      total: subChapters.length,
      mastered: subMastered.length,
      percent,
    };
  };

  const phyStats = getSubjectStats('physics');
  const chemStats = getSubjectStats('chemistry');
  const mathStats = getSubjectStats('mathematics');

  return (
    <div className="mb-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        {/* Left: Overall Syllabus Meter */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Trophy className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  JEE Syllabus Mastery
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {masteredChapters.length} Mastered • {inProgressChapters.length} In Progress • {totalChapters} Total Chapters
                </p>
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
              {overallPercent}%
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-500 rounded-full"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* Right: 80/20 High-Yield Pareto Widget */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onFilterHighYield}
            className={`flex-1 sm:flex-initial flex items-center justify-between gap-3 rounded-xl border p-3 transition-all ${
              isHighYieldActive
                ? 'border-rose-500 bg-rose-500/15 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30'
                : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400">
                <Flame className="h-4 w-4 fill-rose-500 text-rose-500" />
              </span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                    80/20 High-Yield Tracker
                  </span>
                  <span className="text-[10px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 px-1.5 py-0.2 rounded-sm">
                    {isHighYieldActive ? 'Active' : 'Filter'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Mastered: {highRepeatMastered.length} / {highRepeatChapters.length} ({highRepeatPercent}%)
                </p>
              </div>
            </div>
            <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono pl-2">
              {highRepeatPercent}%
            </span>
          </button>

          {/* Weak Topics Quick Button */}
          <button
            onClick={onFilterWeakOnly}
            className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
              isWeakActive
                ? 'border-amber-500 bg-amber-500/15 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/30'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
            title="Show Marked Weak Topics"
          >
            <Star className={`h-4 w-4 ${weakChaptersCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <div className="text-left">
              <span className="text-xs font-bold block">Weak Topics</span>
              <span className="text-[11px] text-slate-500">{weakChaptersCount} flagged</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Subject-Wise Triple Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        {/* Physics Meter */}
        <div className="rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-950/20 p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Physics
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {phyStats.mastered}/{phyStats.total} ({phyStats.percent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 rounded-full"
              style={{ width: `${phyStats.percent}%` }}
            />
          </div>
        </div>

        {/* Chemistry Meter */}
        <div className="rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-950/20 p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Chemistry
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {chemStats.mastered}/{chemStats.total} ({chemStats.percent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
              style={{ width: `${chemStats.percent}%` }}
            />
          </div>
        </div>

        {/* Mathematics Meter */}
        <div className="rounded-xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-950/20 p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Mathematics
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
              {mathStats.mastered}/{mathStats.total} ({mathStats.percent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${mathStats.percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalyticsBanner;

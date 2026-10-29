import React from 'react';
import { Flame, Star, Filter, RotateCcw, Search, Sparkles } from 'lucide-react';
import ChapterCard from './ChapterCard';
import { Chapter, FilterState, Subject, ClassLevel, RepeatPriority, ChapterStatus, ChemistryBranch, UserChapterState } from '../types';

interface SyllabusExplorerProps {
  chapters: Chapter[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  userStates: Record<string, UserChapterState>;
  onSelectChapter: (chapterId: string) => void;
  onUpdateStatus: (chapterId: string, status: ChapterStatus) => void;
  onToggleBookmark: (chapterId: string) => void;
  onToggleWeak: (chapterId: string) => void;
}

export const SyllabusExplorer: React.FC<SyllabusExplorerProps> = ({
  chapters,
  filters,
  onFilterChange,
  onResetFilters,
  userStates,
  onSelectChapter,
  onUpdateStatus,
  onToggleBookmark,
  onToggleWeak,
}) => {
  // Filter logic
  const filteredChapters = chapters.filter((ch) => {
    // Subject filter
    if (filters.subject !== 'all' && ch.subject !== filters.subject) return false;

    // Class filter
    if (filters.classLevel !== 'all' && ch.classLevel !== filters.classLevel) return false;

    // Repeat priority
    if (filters.repeatPriority !== 'all' && ch.repeatPriority !== filters.repeatPriority) return false;

    // Status filter
    const status = userStates[ch.id]?.status || 'not_started';
    if (filters.status !== 'all' && status !== filters.status) return false;

    // Branch filter for chemistry
    if (filters.chemistryBranch !== 'all' && ch.subject === 'chemistry') {
      if (ch.branch !== filters.chemistryBranch) return false;
    }

    // Weak topics filter
    if (filters.weakOnly && !userStates[ch.id]?.isWeakTopic) return false;

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = ch.title.toLowerCase().includes(q) || ch.ncertName.toLowerCase().includes(q);
      const matchSubtopics = ch.highlightedSubtopics.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchSubtopics) return false;
    }

    return true;
  });

  const isFilterActive =
    filters.subject !== 'all' ||
    filters.classLevel !== 'all' ||
    filters.repeatPriority !== 'all' ||
    filters.status !== 'all' ||
    filters.chemistryBranch !== 'all' ||
    filters.weakOnly ||
    filters.searchQuery.trim() !== '';

  return (
    <section>
      {/* Subject Tabs - Smooth touch horizontal scroll with pill style */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-slate-200 dark:border-slate-800 mb-5 scrollbar-none touch-scroll">
        <button
          onClick={() => onFilterChange({ subject: 'all' })}
          className={`min-h-[44px] flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            filters.subject === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>All Subjects</span>
          <span className="rounded-md bg-slate-200/60 dark:bg-slate-700/60 px-1.5 py-0.5 text-[11px] font-mono">
            {chapters.length}
          </span>
        </button>

        <button
          onClick={() => onFilterChange({ subject: 'physics' })}
          className={`min-h-[44px] flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            filters.subject === 'physics'
              ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600'
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span>Physics</span>
          <span className="rounded-md bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 text-[11px] font-mono text-blue-700 dark:text-blue-300">
            {chapters.filter((c) => c.subject === 'physics').length}
          </span>
        </button>

        <button
          onClick={() => onFilterChange({ subject: 'chemistry' })}
          className={`min-h-[44px] flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            filters.subject === 'chemistry'
              ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600'
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span>Chemistry</span>
          <span className="rounded-md bg-emerald-100 dark:bg-emerald-950 px-1.5 py-0.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
            {chapters.filter((c) => c.subject === 'chemistry').length}
          </span>
        </button>

        <button
          onClick={() => onFilterChange({ subject: 'mathematics' })}
          className={`min-h-[44px] flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
            filters.subject === 'mathematics'
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 hover:text-amber-600'
          }`}
        >
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span>Mathematics</span>
          <span className="rounded-md bg-amber-100 dark:bg-amber-950 px-1.5 py-0.5 text-[11px] font-mono text-amber-700 dark:text-amber-300">
            {chapters.filter((c) => c.subject === 'mathematics').length}
          </span>
        </button>
      </div>

      {/* Filter Control Bar */}
      <div className="mb-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-3 sm:p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Class Filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 uppercase shrink-0">Class:</span>
            {(['all', '11', '12'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onFilterChange({ classLevel: lvl })}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  filters.classLevel === lvl
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl === 'all' ? 'All Classes' : `Class ${lvl}`}
              </button>
            ))}
          </div>

          {/* Repeat Priority Filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 uppercase shrink-0">Priority:</span>
            <button
              onClick={() => onFilterChange({ repeatPriority: 'all' })}
              className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                filters.repeatPriority === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange({ repeatPriority: 'high' })}
              className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                filters.repeatPriority === 'high'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
              }`}
            >
              <Flame className="h-3 w-3 fill-current shrink-0" />
              <span>High Repeat</span>
            </button>
            <button
              onClick={() => onFilterChange({ repeatPriority: 'medium' })}
              className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                filters.repeatPriority === 'medium'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
              }`}
            >
              <Star className="h-3 w-3 fill-current shrink-0" />
              <span>Medium</span>
            </button>
            <button
              onClick={() => onFilterChange({ repeatPriority: 'foundation' })}
              className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                filters.repeatPriority === 'foundation'
                  ? 'bg-slate-700 text-white dark:bg-slate-300 dark:text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Base
            </button>
          </div>

          {/* Chemistry Branch Filter (if Chemistry selected) */}
          {(filters.subject === 'chemistry' || filters.subject === 'all') && (
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full">
              <span className="text-[11px] font-bold text-slate-400 px-1.5 uppercase shrink-0">Branch:</span>
              {(['all', 'physical', 'inorganic', 'organic'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => onFilterChange({ chemistryBranch: b })}
                  className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                    filters.chemistryBranch === b
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          )}

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60 overflow-x-auto max-w-full">
            <span className="text-[11px] font-bold text-slate-400 px-1.5 uppercase shrink-0">Status:</span>
            {(['all', 'not_started', 'in_progress', 'mastered'] as const).map((st) => (
              <button
                key={st}
                onClick={() => onFilterChange({ status: st })}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  filters.status === st
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {st === 'all'
                  ? 'All'
                  : st === 'mastered'
                  ? '🟢 Mastered'
                  : st === 'in_progress'
                  ? '🔵 Learning'
                  : '⚪ Not Started'}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex-1 min-w-[220px] w-full sm:w-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search chapters or subtopics..."
              className="w-full min-h-[42px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Reset button if active */}
          {isFilterActive && (
            <button
              onClick={onResetFilters}
              className="min-h-[42px] flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Results Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>Syllabus Chapters</span>
          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-mono text-slate-500">
            {filteredChapters.length} found
          </span>
        </h3>
        {filters.repeatPriority === 'high' && (
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 fill-rose-500" />
            Showing 80/20 High-Repeat Chapters
          </span>
        )}
      </div>

      {/* Chapter Cards Grid */}
      {filteredChapters.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300">
            No chapters match your selected filters
          </p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try resetting your filters or modifying your search query.
          </p>
          <button
            onClick={onResetFilters}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              userState={userStates[chapter.id]}
              onSelect={onSelectChapter}
              onUpdateStatus={onUpdateStatus}
              onToggleBookmark={onToggleBookmark}
              onToggleWeak={onToggleWeak}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SyllabusExplorer;

import React from 'react';
import { Flame, Star, Bookmark, ArrowRight, CheckCircle2, Clock, CircleDot, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Chapter, ChapterStatus, UserChapterState } from '../types';

interface ChapterCardProps {
  chapter: Chapter;
  userState?: UserChapterState;
  onSelect: (chapterId: string) => void;
  onUpdateStatus: (chapterId: string, status: ChapterStatus) => void;
  onToggleBookmark: (chapterId: string) => void;
  onToggleWeak: (chapterId: string) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  userState,
  onSelect,
  onUpdateStatus,
  onToggleBookmark,
  onToggleWeak,
}) => {
  const status: ChapterStatus = userState?.status || 'not_started';
  const isBookmarked = userState?.isBookmarked || false;
  const isWeakTopic = userState?.isWeakTopic || false;

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newStatus = e.target.value as ChapterStatus;
    onUpdateStatus(chapter.id, newStatus);

    if (newStatus === 'mastered') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#3B82F6', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        // Safe fallback
      }
    }
  };

  const getSubjectBadgeStyle = () => {
    switch (chapter.subject) {
      case 'physics':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/60';
      case 'chemistry':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/60';
      case 'mathematics':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/60';
    }
  };

  const getRepeatBadge = () => {
    switch (chapter.repeatPriority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-[11px] font-bold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
            <Flame className="h-3 w-3 fill-rose-500 text-rose-500" />
            <span>High Repeat</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>Medium Repeat</span>
          </span>
        );
      case 'foundation':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <span>📘 Foundation</span>
          </span>
        );
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'mastered':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mastered
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            <Clock className="h-3.5 w-3.5" />
            In Progress
          </span>
        );
      case 'not_started':
        return (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <CircleDot className="h-3.5 w-3.5" />
            Not Started
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect(chapter.id)}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-500/50 cursor-pointer"
    >
      {/* Top Meta Badges & Actions */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getSubjectBadgeStyle()}`}>
              {chapter.subject}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
              Class {chapter.classLevel}
            </span>
            {chapter.branch && (
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md capitalize">
                {chapter.branch}
              </span>
            )}
            {getRepeatBadge()}
          </div>

          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            {/* Weak Topic Star Toggle */}
            <button
              onClick={() => onToggleWeak(chapter.id)}
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl transition-colors ${
                isWeakTopic
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-1 ring-amber-400/30'
                  : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isWeakTopic ? 'Flagged as Weak Topic (click to remove)' : 'Mark as Weak Topic'}
              aria-label="Toggle Weak Topic"
            >
              <Star className={`h-4 w-4 ${isWeakTopic ? 'fill-amber-500' : ''}`} />
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl transition-colors ${
                isBookmarked
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-400/30'
                  : 'text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Bookmarked (click to remove)' : 'Bookmark chapter'}
              aria-label="Toggle Bookmark"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-blue-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Chapter Title & NCERT Number */}
        <div className="mb-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
            Chapter {chapter.chapterNumber}
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {chapter.title}
          </h3>
        </div>

        {/* Weightage Banner */}
        <div className="mb-3.5 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2 sm:p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {chapter.avgQuestions}
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold truncate">
            {chapter.expectedWeightage}
          </span>
        </div>

        {/* Highlighted Subtopics Chips Preview */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Key High-Yield Concepts
          </p>
          <div className="flex flex-wrap gap-1.5">
            {chapter.highlightedSubtopics.slice(0, 3).map((topic, i) => (
              <span
                key={i}
                className="text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md line-clamp-1 max-w-[220px]"
                title={topic}
              >
                {topic}
              </span>
            ))}
            {chapter.highlightedSubtopics.length > 3 && (
              <span className="text-[10px] font-medium text-slate-400 self-center">
                +{chapter.highlightedSubtopics.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Area: Status Dropdown & Study Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1.5">
          <select
            value={status}
            onChange={handleStatusChange}
            className={`min-h-[38px] text-xs font-semibold rounded-lg px-2.5 py-1.5 border transition-colors cursor-pointer ${
              status === 'mastered'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                : status === 'in_progress'
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <option value="not_started">⚪ Not Started</option>
            <option value="in_progress">🔵 In Progress</option>
            <option value="mastered">🟢 Mastered</option>
          </select>
        </div>

        <button
          onClick={() => onSelect(chapter.id)}
          className="min-h-[38px] px-2.5 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-0.5 transition-transform"
        >
          <span>Notes</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ChapterCard;

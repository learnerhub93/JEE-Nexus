import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Flame, ArrowRight, X, BookOpen, Hash } from 'lucide-react';
import { Chapter, Subject } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  onSelectChapter: (chapterId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  chapters,
  onSelectChapter,
}) => {
  const [query, setQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'all' | Subject>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return chapters.filter((ch) => {
      if (selectedSubject !== 'all' && ch.subject !== selectedSubject) return false;
      if (!q) return true;

      const titleMatch = ch.title.toLowerCase().includes(q) || ch.ncertName.toLowerCase().includes(q);
      const subtopicsMatch = ch.highlightedSubtopics.some((s) => s.toLowerCase().includes(q));
      const pyqMatch = ch.pyqTrend.topRepeatedConcepts.some((c) => c.toLowerCase().includes(q));
      const checklistMatch = ch.mustSolveChecklist.some((c) => c.toLowerCase().includes(q));

      return titleMatch || subtopicsMatch || pyqMatch || checklistMatch;
    });
  }, [chapters, query, selectedSubject]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredResults.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
      e.preventDefault();
      onSelectChapter(filteredResults[selectedIndex].id);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4 sm:pt-16"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] shadow-2xl transition-all overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-slate-200 dark:border-slate-800 px-3.5 sm:px-4 py-3">
          <Search className="h-5 w-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, subtopics, or formulas across PCM..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear Search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="min-h-[36px] px-2.5 flex items-center justify-center rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close Search"
          >
            Cancel
          </button>
          <span className="hidden md:inline-block rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shrink-0">
            ESC
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60 overflow-x-auto text-xs scrollbar-none touch-scroll">
          <span className="text-slate-400 font-medium mr-1 shrink-0">Filter:</span>
          {(['all', 'physics', 'chemistry', 'mathematics'] as const).map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`min-h-[34px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1 font-semibold capitalize whitespace-nowrap transition-colors shrink-0 ${
                selectedSubject === sub
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-400 shrink-0 pl-2">
            {filteredResults.length} chapter{filteredResults.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No chapters or subtopics found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for concepts like "Bohr", "Adjoint", or "Thermodynamics"</p>
            </div>
          ) : (
            filteredResults.map((ch, idx) => {
              const isSelected = idx === selectedIndex;
              const subjectColor =
                ch.subject === 'physics'
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900'
                  : ch.subject === 'chemistry'
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900'
                  : 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900';

              return (
                <div
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-500/10 dark:bg-blue-500/15 text-slate-900 dark:text-white'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md border ${subjectColor}`}>
                        {ch.subject}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                        Class {ch.classLevel}
                      </span>
                      {ch.repeatPriority === 'high' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                          <Flame className="h-3 w-3 fill-rose-500" />
                          High Repeat
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {ch.avgQuestions}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      Ch {ch.chapterNumber}: {ch.title}
                    </h4>

                    {/* Subtopics snippet */}
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
                      <Hash className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {ch.highlightedSubtopics.slice(0, 3).join(' • ')}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-blue-600 dark:text-blue-400 translate-x-1' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-semibold text-blue-600 dark:text-blue-400">JEE Nexus Search</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;

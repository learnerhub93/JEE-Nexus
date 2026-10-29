import React, { useState, useMemo } from 'react';
import {
  RotateCw,
  Zap,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Grid,
  Maximize2,
  Brain
} from 'lucide-react';
import { Chapter, Flashcard } from '../types';
import { getChapterRecallCards } from '../data/flashcardsData';
import ActiveRecallCardItem, { CardMasteryStatus } from './ActiveRecallCardItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FlashcardsViewProps {
  chapter?: Chapter;
  flashcards?: Flashcard[];
  externalStatusMap?: Record<string, CardMasteryStatus>;
  onUpdateStatus?: (cardId: string, status: CardMasteryStatus) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  chapter,
  flashcards = [],
  externalStatusMap,
  onUpdateStatus,
}) => {
  // Local storage for fallback or direct chapter study
  const [localStatusMap, setLocalStatusMap] = useLocalStorage<Record<string, CardMasteryStatus>>(
    'jee_nexus_flashcard_mastery',
    {}
  );

  const statusMap = externalStatusMap || localStatusMap;
  const handleSetStatus = onUpdateStatus || ((cardId: string, status: CardMasteryStatus) => {
    setLocalStatusMap((prev) => ({
      ...prev,
      [cardId]: status,
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterMode, setFilterMode] = useState<'all' | 'revision' | 'mastered'>('all');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  // Derive active recall cards from chapter if provided, or from flashcards
  const activeCards = useMemo(() => {
    if (chapter) {
      return getChapterRecallCards(chapter);
    }
    // Fallback if only raw flashcards array provided
    return flashcards.map((fc, i) => ({
      id: fc.id || `raw-fc-${i}`,
      subject: 'physics' as const,
      classLevel: '12' as const,
      chapterId: 'general',
      chapterTitle: 'Chapter Concepts',
      category: 'physics_formula' as const,
      categoryLabel: fc.tag || 'Concept',
      prompt: fc.question,
      promptContext: fc.ncertReference,
      answer: fc.answer,
      latex: fc.latex,
      mnemonic: fc.mnemonic || '💡 Focus on formula structure and units for quick recall.',
      explanation: fc.explanation,
      tags: [fc.tag || 'Concept'],
    }));
  }, [chapter, flashcards]);

  // Apply filter mode
  const filteredCards = useMemo(() => {
    if (filterMode === 'all') return activeCards;
    return activeCards.filter((c) => {
      const st = statusMap[c.id] || 'unreviewed';
      return st === filterMode;
    });
  }, [activeCards, filterMode, statusMap]);

  // Clamp index
  const safeIndex = Math.min(currentIndex, Math.max(0, filteredCards.length - 1));

  if (!activeCards || activeCards.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-8 text-center text-slate-500">
        <Sparkles className="mx-auto h-8 w-8 text-amber-500 mb-2 opacity-50" />
        <p className="text-sm font-semibold">Active recall cards for this chapter are compiling.</p>
      </div>
    );
  }

  // Count stats
  const masteredCount = activeCards.filter((c) => statusMap[c.id] === 'mastered').length;
  const revisionCount = activeCards.filter((c) => statusMap[c.id] === 'revision').length;

  const currentCard = filteredCards[safeIndex];

  return (
    <div className="space-y-4">
      {/* Top Controls & Filter Strip */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        {/* Status filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            All Cards ({activeCards.length})
          </button>
          <button
            onClick={() => setFilterMode('revision')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'revision'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            <RotateCcw className="h-3 w-3" />
            <span>Needs Revision ({revisionCount})</span>
          </button>
          <button
            onClick={() => setFilterMode('mastered')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterMode === 'mastered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>Mastered ({masteredCount})</span>
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl self-end sm:self-auto">
          <button
            onClick={() => setViewMode('carousel')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'carousel'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
            title="Focus Carousel"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Focus</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
            title="Grid Mode"
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500">
          <Brain className="mx-auto h-8 w-8 text-slate-400 mb-2 opacity-60" />
          <p className="text-sm font-semibold mb-2">No flashcards under "{filterMode}".</p>
          <button
            onClick={() => setFilterMode('all')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 underline"
          >
            Show All Cards
          </button>
        </div>
      ) : viewMode === 'carousel' ? (
        <div className="max-w-xl mx-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>
              Card {safeIndex + 1} of {filteredCards.length}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">
              {masteredCount} of {activeCards.length} Mastered ⚡
            </span>
          </div>

          {currentCard && (
            <ActiveRecallCardItem
              card={currentCard}
              status={statusMap[currentCard.id] || 'unreviewed'}
              onSetStatus={handleSetStatus}
            />
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() =>
                setCurrentIndex(
                  (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
                )
              }
              className="flex-1 min-h-[42px] flex items-center justify-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <span className="font-mono text-xs font-bold text-slate-500 px-2">
              {safeIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
              }
              className="flex-1 min-h-[42px] flex items-center justify-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCards.map((card) => (
            <ActiveRecallCardItem
              key={card.id}
              card={card}
              status={statusMap[card.id] || 'unreviewed'}
              onSetStatus={handleSetStatus}
              compact={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardsView;

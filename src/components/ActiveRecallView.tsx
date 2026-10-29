import React, { useState, useMemo, useEffect } from 'react';
import {
  Brain,
  Search,
  Filter,
  RotateCcw,
  Zap,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Grid,
  Maximize2,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveRecallCard, Subject, ClassLevel, FlashcardCategory } from '../types';
import { HIGH_YIELD_ACTIVE_RECALL_CARDS } from '../data/flashcardsData';
import ActiveRecallCardItem, { CardMasteryStatus } from './ActiveRecallCardItem';

interface ActiveRecallViewProps {
  cardStatusMap: Record<string, CardMasteryStatus>;
  onUpdateCardStatus: (cardId: string, status: CardMasteryStatus) => void;
  onNavigateChapter: (chapterId: string) => void;
}

export const ActiveRecallView: React.FC<ActiveRecallViewProps> = ({
  cardStatusMap,
  onUpdateCardStatus,
  onNavigateChapter,
}) => {
  // Filters
  const [selectedSubject, setSelectedSubject] = useState<'all' | Subject>('all');
  const [selectedClass, setSelectedClass] = useState<'all' | ClassLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | FlashcardCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'revision' | 'mastered' | 'unreviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Display Mode: 'carousel' (Focus Mode) or 'grid' (Overview Mode)
  const [displayMode, setDisplayMode] = useState<'carousel' | 'grid'>('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Deck ordering (supports shuffle)
  const [deckOrder, setDeckOrder] = useState<string[]>(() =>
    HIGH_YIELD_ACTIVE_RECALL_CARDS.map((c) => c.id)
  );

  // Shuffled or base cards
  const orderedCards = useMemo(() => {
    const cardMap = new Map(HIGH_YIELD_ACTIVE_RECALL_CARDS.map((c) => [c.id, c]));
    return deckOrder
      .map((id) => cardMap.get(id))
      .filter((c): c is ActiveRecallCard => Boolean(c));
  }, [deckOrder]);

  // Filtered cards
  const filteredCards = useMemo(() => {
    return orderedCards.filter((card) => {
      // Subject filter
      if (selectedSubject !== 'all' && card.subject !== selectedSubject) return false;

      // Class filter
      if (selectedClass !== 'all' && card.classLevel !== selectedClass) return false;

      // Category filter
      if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;

      // Status filter
      const status = cardStatusMap[card.id] || 'unreviewed';
      if (statusFilter !== 'all' && status !== statusFilter) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPrompt = card.prompt.toLowerCase().includes(query);
        const matchesAnswer = card.answer.toLowerCase().includes(query);
        const matchesMnemonic = card.mnemonic.toLowerCase().includes(query);
        const matchesTags = card.tags.some((t) => t.toLowerCase().includes(query));
        const matchesChapter = card.chapterTitle.toLowerCase().includes(query);
        if (!matchesPrompt && !matchesAnswer && !matchesMnemonic && !matchesTags && !matchesChapter) {
          return false;
        }
      }

      return true;
    });
  }, [orderedCards, selectedSubject, selectedClass, selectedCategory, statusFilter, searchQuery, cardStatusMap]);

  // Clamp carousel index when filtered list changes
  useEffect(() => {
    if (carouselIndex >= filteredCards.length && filteredCards.length > 0) {
      setCarouselIndex(0);
    }
  }, [filteredCards.length, carouselIndex]);

  // Overall statistics
  const stats = useMemo(() => {
    const total = HIGH_YIELD_ACTIVE_RECALL_CARDS.length;
    let mastered = 0;
    let revision = 0;
    for (const card of HIGH_YIELD_ACTIVE_RECALL_CARDS) {
      const st = cardStatusMap[card.id] || 'unreviewed';
      if (st === 'mastered') mastered++;
      else if (st === 'revision') revision++;
    }
    const unreviewed = total - mastered - revision;
    const progressPercent = Math.round((mastered / total) * 100);
    return { total, mastered, revision, unreviewed, progressPercent };
  }, [cardStatusMap]);

  // Keyboard navigation for Carousel
  useEffect(() => {
    if (displayMode !== 'carousel' || filteredCards.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCarouselIndex((prev) => (prev + 1) % filteredCards.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCarouselIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
      } else if (e.key === '1') {
        const currentCard = filteredCards[carouselIndex];
        if (currentCard) {
          onUpdateCardStatus(
            currentCard.id,
            cardStatusMap[currentCard.id] === 'revision' ? 'unreviewed' : 'revision'
          );
        }
      } else if (e.key === '2') {
        const currentCard = filteredCards[carouselIndex];
        if (currentCard) {
          const next = cardStatusMap[currentCard.id] === 'mastered' ? 'unreviewed' : 'mastered';
          onUpdateCardStatus(currentCard.id, next);
          if (next === 'mastered') {
            try {
              confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
            } catch (err) {}
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayMode, filteredCards, carouselIndex, cardStatusMap, onUpdateCardStatus]);

  const handleShuffle = () => {
    setDeckOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCarouselIndex(0);
  };

  const currentCarouselCard = filteredCards[carouselIndex];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-4">
      {/* ==================================================== */}
      {/* TOP HEADER & MASTERY PROGRESS BANNER                 */}
      {/* ==================================================== */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-indigo-50/60 via-white to-amber-50/40 dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-sm">
                <Brain className="h-4 w-4" />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Active Recall & Mnemonics
              </h1>
              <span className="rounded-md bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 px-2 py-0.5 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                3D Flip Vault
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              Rapid retrieval practice with clever memory hooks for high-yield formulas, Inorganic exceptions, and Organic reagents. Click or press Space to flip!
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3 py-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Mastered
              </span>
              <div className="flex items-center gap-1 text-sm font-black text-emerald-600 dark:text-emerald-400">
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>{stats.mastered}</span>
                <span className="text-xs font-normal text-slate-400">/ {stats.total}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3 py-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Needs Revision
              </span>
              <div className="flex items-center gap-1 text-sm font-black text-rose-600 dark:text-rose-400">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{stats.revision}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 px-3 py-1.5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Retention
              </span>
              <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                {stats.progressPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            <span>Overall Active Recall Mastery</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {stats.mastered} of {stats.total} cards mastered ({stats.progressPercent}%)
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
              title={`Mastered: ${stats.mastered}`}
            />
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${(stats.revision / stats.total) * 100}%` }}
              title={`Needs Revision: ${stats.revision}`}
            />
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* FILTER & SEARCH BAR                                  */}
      {/* ==================================================== */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Subject Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedSubject === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Subjects ({HIGH_YIELD_ACTIVE_RECALL_CARDS.length})
            </button>
            <button
              onClick={() => setSelectedSubject('physics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedSubject === 'physics'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40'
              }`}
            >
              ⚡ Physics
            </button>
            <button
              onClick={() => setSelectedSubject('chemistry')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedSubject === 'chemistry'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
              }`}
            >
              🧪 Chemistry
            </button>
            <button
              onClick={() => setSelectedSubject('mathematics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedSubject === 'mathematics'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
              }`}
            >
              📐 Mathematics
            </button>
          </div>

          {/* Search within flashcards */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, mnemonics, or formulas..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Toggle & Shuffle */}
          <div className="flex items-center gap-1.5 self-end lg:self-auto shrink-0">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              title="Shuffle Deck Order"
            >
              <Shuffle className="h-3.5 w-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>

            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setDisplayMode('carousel')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  displayMode === 'carousel'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Single Card Carousel Focus"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Focus</span>
              </button>
              <button
                onClick={() => setDisplayMode('grid')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  displayMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="All Cards Grid"
              >
                <Grid className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Filter Chips: Status, Category, Class */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          {/* Status filter chips */}
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            Status:
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All ({HIGH_YIELD_ACTIVE_RECALL_CARDS.length})
          </button>
          <button
            onClick={() => setStatusFilter('revision')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'revision'
                ? 'bg-rose-500 text-white'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
            }`}
          >
            <RotateCcw className="h-3 w-3" />
            <span>Needs Revision 🔁 ({stats.revision})</span>
          </button>
          <button
            onClick={() => setStatusFilter('mastered')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'mastered'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <Zap className="h-3 w-3" />
            <span>Mastered ⚡ ({stats.mastered})</span>
          </button>
          <button
            onClick={() => setStatusFilter('unreviewed')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'unreviewed'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
            }`}
          >
            Unreviewed ({stats.unreviewed})
          </button>

          {/* Class Filter */}
          <div className="ml-auto flex items-center gap-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as any)}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <option value="all">Class 11 & 12</option>
              <option value="11">Class 11 Only</option>
              <option value="12">Class 12 Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MAIN CONTENT AREA: CAROUSEL OR GRID                   */}
      {/* ==================================================== */}
      {filteredCards.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-12 text-center">
          <Brain className="mx-auto h-12 w-12 text-slate-400 mb-3 opacity-50" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            No Flashcards Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No flashcards match the currently active subject or filter options.
          </p>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedClass('all');
              setSelectedCategory('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : displayMode === 'carousel' ? (
        /* ================= CAROUSEL FOCUS MODE ================= */
        <div className="max-w-xl mx-auto space-y-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
            <span>
              Card {carouselIndex + 1} of {filteredCards.length}
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">
              Press [Space] to Flip • [1] Revision • [2] Mastered
            </span>
          </div>

          {/* Render 3D Card */}
          {currentCarouselCard && (
            <ActiveRecallCardItem
              card={currentCarouselCard}
              status={cardStatusMap[currentCarouselCard.id] || 'unreviewed'}
              onSetStatus={onUpdateCardStatus}
              onNavigateChapter={onNavigateChapter}
            />
          )}

          {/* Carousel Navigation Bar */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={() =>
                setCarouselIndex(
                  (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
                )
              }
              className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
              title="Previous Card (Left Arrow)"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 px-2 shrink-0">
              {carouselIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={() =>
                setCarouselIndex((prev) => (prev + 1) % filteredCards.length)
              }
              className="flex-1 min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
              title="Next Card (Right Arrow)"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* ================= GRID OVERVIEW MODE ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCards.map((card) => (
            <ActiveRecallCardItem
              key={card.id}
              card={card}
              status={cardStatusMap[card.id] || 'unreviewed'}
              onSetStatus={onUpdateCardStatus}
              onNavigateChapter={onNavigateChapter}
              compact={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveRecallView;

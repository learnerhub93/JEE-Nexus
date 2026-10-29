import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Layers, Flame, Clock, Search, Brain } from 'lucide-react';
import Navbar from './components/Navbar';
import ProgressAnalyticsBanner from './components/ProgressAnalyticsBanner';
import SyllabusExplorer from './components/SyllabusExplorer';
import ChapterReaderView from './components/ChapterReaderView';
import FormulaVaultView from './components/FormulaVaultView';
import ActiveRecallView from './components/ActiveRecallView';
import { CardMasteryStatus } from './components/ActiveRecallCardItem';
import GlobalSearchModal from './components/GlobalSearchModal';
import StudyTimerModal from './components/StudyTimerModal';
import { ALL_CHAPTERS } from './data/chaptersData';
import { HIGH_YIELD_ACTIVE_RECALL_CARDS } from './data/flashcardsData';
import { getAllVaultItems } from './utils/formulaExtractor';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ChapterStatus, FilterState, UserChapterState } from './types';

export default function App() {
  // Theme state: dark mode as default for deep slate academic UI
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('jee_nexus_dark_mode', true);

  // User persistence state for chapters
  const [userStates, setUserStates] = useLocalStorage<Record<string, UserChapterState>>(
    'jee_nexus_user_states',
    {
      'phy-12-03-current-electricity': {
        status: 'in_progress',
        isBookmarked: true,
        isWeakTopic: false,
        personalNotes: 'Remember shunt is parallel, multiplier resistor is in series. V = E - Ir.',
        completedChecklistIds: ['task-0', 'task-1'],
        updatedAt: Date.now(),
      },
      'chem-11-04-chemical-bonding': {
        status: 'mastered',
        isBookmarked: false,
        isWeakTopic: false,
        personalNotes: 'Bond order 14 is 3.0. Count total electrons. O2 is paramagnetic.',
        completedChecklistIds: ['task-0', 'task-1', 'task-2'],
        updatedAt: Date.now(),
      },
      'math-12-09-3d-geometry': {
        status: 'in_progress',
        isBookmarked: true,
        isWeakTopic: true,
        personalNotes: 'Skew lines shortest distance determinant method. Check standard form!',
        completedChecklistIds: ['task-0'],
        updatedAt: Date.now(),
      },
    }
  );

  // Active view: null = Dashboard/Explorer, string = Chapter ID for Reader
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [isFormulaVaultOpen, setIsFormulaVaultOpen] = useState(false);
  const [isActiveRecallOpen, setIsActiveRecallOpen] = useState(false);

  // Persistent flashcard mastery status across chapters & global active recall
  const [flashcardMastery, setFlashcardMastery] = useLocalStorage<Record<string, CardMasteryStatus>>(
    'jee_nexus_flashcard_mastery',
    {
      'phy-flash-01-de-broglie': 'mastered',
      'chem-flash-01-electron-gain-f-cl': 'revision',
      'math-flash-01-kings-property': 'mastered',
    }
  );

  const handleUpdateCardStatus = (cardId: string, status: CardMasteryStatus) => {
    setFlashcardMastery((prev) => ({
      ...prev,
      [cardId]: status,
    }));
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // Bookmarked chapters count
  const bookmarkedCount = useMemo(() => {
    return Object.values(userStates).filter((s) => s.isBookmarked).length;
  }, [userStates]);

  // Total vault items count across PCM
  const totalVaultCount = useMemo(() => {
    return getAllVaultItems(ALL_CHAPTERS).length;
  }, []);

  const handleBookmarkAllHighRepeat = () => {
    setUserStates((prev) => {
      const updated = { ...prev };
      ALL_CHAPTERS.filter((c) => c.repeatPriority === 'high').forEach((ch) => {
        updated[ch.id] = {
          ...(updated[ch.id] || {
            status: 'not_started',
            isWeakTopic: false,
            personalNotes: '',
            completedChecklistIds: [],
          }),
          isBookmarked: true,
          updatedAt: Date.now(),
        };
      });
      return updated;
    });
  };

  // Timer live feedback
  const [timerStatus, setTimerStatus] = useState<{ isRunning: boolean; timeText: string; modeName: string }>({
    isRunning: false,
    timeText: '25:00',
    modeName: 'Pomodoro',
  });

  // Filter state for explorer
  const [filters, setFilters] = useState<FilterState>({
    subject: 'all',
    classLevel: 'all',
    repeatPriority: 'all',
    status: 'all',
    chemistryBranch: 'all',
    weakOnly: false,
    searchQuery: '',
  });

  // Apply dark class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update filter helper
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      subject: 'all',
      classLevel: 'all',
      repeatPriority: 'all',
      status: 'all',
      chemistryBranch: 'all',
      weakOnly: false,
      searchQuery: '',
    });
  };

  // 80/20 High Yield Filter Toggle
  const toggleHighYield = () => {
    if (filters.repeatPriority === 'high') {
      setFilters((prev) => ({ ...prev, repeatPriority: 'all' }));
    } else {
      setFilters((prev) => ({ ...prev, repeatPriority: 'high' }));
      if (selectedChapterId) setSelectedChapterId(null);
    }
  };

  const toggleWeakOnly = () => {
    setFilters((prev) => ({ ...prev, weakOnly: !prev.weakOnly }));
    if (selectedChapterId) setSelectedChapterId(null);
  };

  // Chapter state mutations
  const handleUpdateStatus = (chapterId: string, status: ChapterStatus) => {
    setUserStates((prev) => ({
      ...prev,
      [chapterId]: {
        ...(prev[chapterId] || {
          isBookmarked: false,
          isWeakTopic: false,
          personalNotes: '',
          completedChecklistIds: [],
        }),
        status,
        updatedAt: Date.now(),
      },
    }));
  };

  const handleToggleBookmark = (chapterId: string) => {
    setUserStates((prev) => {
      const current = prev[chapterId] || {
        status: 'not_started',
        isWeakTopic: false,
        personalNotes: '',
        completedChecklistIds: [],
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        [chapterId]: {
          ...current,
          isBookmarked: !current.isBookmarked,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleToggleWeak = (chapterId: string) => {
    setUserStates((prev) => {
      const current = prev[chapterId] || {
        status: 'not_started',
        isBookmarked: false,
        personalNotes: '',
        completedChecklistIds: [],
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        [chapterId]: {
          ...current,
          isWeakTopic: !current.isWeakTopic,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleSaveNotes = (chapterId: string, notes: string) => {
    setUserStates((prev) => {
      const current = prev[chapterId] || {
        status: 'not_started',
        isBookmarked: false,
        isWeakTopic: false,
        completedChecklistIds: [],
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        [chapterId]: {
          ...current,
          personalNotes: notes,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleToggleChecklistItem = (chapterId: string, taskId: string) => {
    setUserStates((prev) => {
      const current = prev[chapterId] || {
        status: 'not_started',
        isBookmarked: false,
        isWeakTopic: false,
        personalNotes: '',
        completedChecklistIds: [],
        updatedAt: Date.now(),
      };
      const exists = current.completedChecklistIds?.includes(taskId);
      const newIds = exists
        ? current.completedChecklistIds.filter((id) => id !== taskId)
        : [...(current.completedChecklistIds || []), taskId];

      return {
        ...prev,
        [chapterId]: {
          ...current,
          completedChecklistIds: newIds,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleSaveQuizAnswers = (chapterId: string, answers: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    setUserStates((prev) => {
      const current = prev[chapterId] || {
        status: 'not_started',
        isBookmarked: false,
        isWeakTopic: false,
        personalNotes: '',
        completedChecklistIds: [],
        updatedAt: Date.now(),
      };
      return {
        ...prev,
        [chapterId]: {
          ...current,
          practiceQuizAnswers: answers,
          updatedAt: Date.now(),
        },
      };
    });
  };

  // Find active chapter if reader view is active
  const activeChapter = useMemo(
    () => ALL_CHAPTERS.find((ch) => ch.id === selectedChapterId),
    [selectedChapterId]
  );

  const allChaptersInSameSubject = useMemo(() => {
    if (!activeChapter) return [];
    return ALL_CHAPTERS.filter((ch) => ch.subject === activeChapter.subject);
  }, [activeChapter]);

  const formatTimerDisplay = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-800 dark:text-slate-100 transition-colors">
      {/* Global Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
        onToggleHighYield={toggleHighYield}
        isHighYieldActive={filters.repeatPriority === 'high'}
        isFormulaVaultActive={isFormulaVaultOpen}
        onOpenFormulaVault={() => {
          setIsFormulaVaultOpen(true);
          setIsActiveRecallOpen(false);
          setSelectedChapterId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isActiveRecallActive={isActiveRecallOpen}
        onOpenActiveRecall={() => {
          setIsActiveRecallOpen(true);
          setIsFormulaVaultOpen(false);
          setSelectedChapterId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        totalRecallCardsCount={HIGH_YIELD_ACTIVE_RECALL_CARDS.length}
        bookmarkedCount={bookmarkedCount}
        totalVaultCount={totalVaultCount}
        timerActiveInfo={{
          isRunning: timerStatus.isRunning,
          timeText: timerStatus.timeText,
          modeName: timerStatus.modeName,
        }}
        onGoHome={() => {
          setIsFormulaVaultOpen(false);
          setIsActiveRecallOpen(false);
          setSelectedChapterId(null);
        }}
      />

      {/* Main Content Area */}
      {isActiveRecallOpen ? (
        <ActiveRecallView
          cardStatusMap={flashcardMastery}
          onUpdateCardStatus={handleUpdateCardStatus}
          onNavigateChapter={(id) => {
            setIsActiveRecallOpen(false);
            setIsFormulaVaultOpen(false);
            setSelectedChapterId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : isFormulaVaultOpen ? (
        <FormulaVaultView
          chapters={ALL_CHAPTERS}
          userStates={userStates}
          onBack={() => setIsFormulaVaultOpen(false)}
          onSelectChapter={(id) => {
            setIsFormulaVaultOpen(false);
            setSelectedChapterId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBookmarkAllHighRepeat={handleBookmarkAllHighRepeat}
        />
      ) : selectedChapterId && activeChapter ? (
        <ChapterReaderView
          chapter={activeChapter}
          allChaptersInSubject={allChaptersInSameSubject}
          userState={userStates[activeChapter.id]}
          onBack={() => setSelectedChapterId(null)}
          onSelectChapter={(id) => {
            setSelectedChapterId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onUpdateStatus={handleUpdateStatus}
          onToggleBookmark={handleToggleBookmark}
          onToggleWeak={handleToggleWeak}
          onSaveNotes={handleSaveNotes}
          onToggleChecklistItem={handleToggleChecklistItem}
          onSaveQuizAnswers={handleSaveQuizAnswers}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Header Banner Title */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                JEE Main & Advanced High-Yield Portal
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Distraction-free NCERT Class 11 & 12 chapter matrix, 80/20 high-repeat topic weightages, 4-color notes with formula vaults, and 1-click exam-eve revision.
              </p>
            </div>

            {/* Quick Button to open Formula & Exceptions Vault */}
            <button
              onClick={() => {
                setIsFormulaVaultOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 text-left hover:border-emerald-500 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40 transition-all self-start md:self-auto shadow-xs"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                ⚡
              </span>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Formula & Exceptions Vault
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {totalVaultCount} Formulas & Exceptions • Flashcards →
                </span>
              </div>
            </button>
          </div>

          {/* Overall Progress Analytics Banner */}
          <ProgressAnalyticsBanner
            chapters={ALL_CHAPTERS}
            userStates={userStates}
            onFilterHighYield={toggleHighYield}
            onFilterWeakOnly={toggleWeakOnly}
            isHighYieldActive={filters.repeatPriority === 'high'}
            isWeakActive={filters.weakOnly}
          />

          {/* Syllabus Explorer Grid with Multi-Filters */}
          <SyllabusExplorer
            chapters={ALL_CHAPTERS}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            userStates={userStates}
            onSelectChapter={(id) => {
              setSelectedChapterId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateStatus={handleUpdateStatus}
            onToggleBookmark={handleToggleBookmark}
            onToggleWeak={handleToggleWeak}
          />
        </main>
      )}

      {/* Global Cmd+K Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        chapters={ALL_CHAPTERS}
        onSelectChapter={(id) => {
          setIsFormulaVaultOpen(false);
          setSelectedChapterId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Built-in JEE Study Timer Modal */}
      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onTimerUpdate={(secondsLeft, isRunning, modeName) => {
          setTimerStatus({
            isRunning,
            timeText: formatTimerDisplay(secondsLeft),
            modeName,
          });
        }}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] py-8 pb-24 md:pb-8 text-xs text-slate-500 transition-colors no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">JEE Nexus</span>
            <span>•</span>
            <span>Aligned with NCERT & NTA JEE Main/Advanced Syllabus</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Class 11 & 12 PCM Matrix</span>
            <span>•</span>
            <span>LocalStorage Offline Ready</span>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MOBILE BOTTOM NAVIGATION DOCK (Touch Friendly < 768px)  */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg transition-colors no-print safe-area-pb"
      >
        {/* 1. Syllabus (Home) */}
        <button
          onClick={() => {
            setIsFormulaVaultOpen(false);
            setIsActiveRecallOpen(false);
            setSelectedChapterId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-colors ${
            !isFormulaVaultOpen && !isActiveRecallOpen && selectedChapterId === null
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Syllabus</span>
        </button>

        {/* 2. Formula Vault */}
        <button
          onClick={() => {
            setSelectedChapterId(null);
            setIsActiveRecallOpen(false);
            setIsFormulaVaultOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`relative min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-colors ${
            isFormulaVaultOpen
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="text-sm leading-none">📐</span>
          <span>Vault</span>
        </button>

        {/* 3. Active Recall & Mnemonics */}
        <button
          onClick={() => {
            setSelectedChapterId(null);
            setIsFormulaVaultOpen(false);
            setIsActiveRecallOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`relative min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-colors ${
            isActiveRecallOpen
              ? 'text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Brain className="h-4 w-4" />
          <span>Recall</span>
        </button>

        {/* 3. 80/20 High-Yield Filter */}
        <button
          onClick={() => {
            if (isFormulaVaultOpen || selectedChapterId) {
              setIsFormulaVaultOpen(false);
              setSelectedChapterId(null);
            }
            toggleHighYield();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-colors ${
            filters.repeatPriority === 'high'
              ? 'text-rose-600 dark:text-rose-400 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Flame className={`h-4 w-4 ${filters.repeatPriority === 'high' ? 'fill-current' : ''}`} />
          <span>80/20</span>
        </button>

        {/* 4. Study Timer */}
        <button
          onClick={() => setIsTimerOpen(true)}
          className={`min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold transition-colors ${
            timerStatus.isRunning
              ? 'text-amber-500 font-extrabold animate-pulse'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span className="font-mono text-[10px]">
            {timerStatus.isRunning ? timerStatus.timeText : 'Timer'}
          </span>
        </button>

        {/* 5. Global Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="min-h-[44px] min-w-[56px] flex flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </nav>
    </div>
  );
}

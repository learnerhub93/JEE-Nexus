import React from 'react';
import { Search, Flame, Moon, Sun, Clock, Zap, BookOpen, Layers, Sparkles, Brain } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenTimer: () => void;
  onToggleHighYield: () => void;
  isHighYieldActive: boolean;
  isFormulaVaultActive?: boolean;
  onOpenFormulaVault: () => void;
  isActiveRecallActive?: boolean;
  onOpenActiveRecall?: () => void;
  totalRecallCardsCount?: number;
  bookmarkedCount?: number;
  totalVaultCount?: number;
  timerActiveInfo?: { isRunning: boolean; timeText: string; modeName: string };
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenTimer,
  onToggleHighYield,
  isHighYieldActive,
  isFormulaVaultActive,
  onOpenFormulaVault,
  isActiveRecallActive,
  onOpenActiveRecall,
  totalRecallCardsCount = 27,
  bookmarkedCount = 0,
  totalVaultCount = 78,
  timerActiveInfo,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Brand Logo & Title */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                JEE <span className="text-blue-600 dark:text-blue-400">Nexus</span>
              </span>
              <span className="hidden xl:inline-block rounded-md bg-blue-100 dark:bg-blue-950 px-1.5 py-0.2 text-[10px] font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                NCERT 2026
              </span>
            </div>
            <p className="hidden xl:block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              NCERT & High-Yield Study Portal
            </p>
          </div>
        </div>

        {/* Center-Left: Primary Top-Level Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={onGoHome}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !isFormulaVaultActive && !isActiveRecallActive
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-500" />
            <span>Syllabus Explorer</span>
          </button>

          <button
            onClick={onOpenFormulaVault}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isFormulaVaultActive
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <span className="text-xs">⚡</span>
            <span>Formula & Exceptions Vault</span>
            {totalVaultCount > 0 && (
              <span
                className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono ${
                  isFormulaVaultActive
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                }`}
              >
                {totalVaultCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenActiveRecall}
            className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              isActiveRecallActive
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Active Recall & Mnemonics</span>
            {totalRecallCardsCount > 0 && (
              <span
                className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono ${
                  isActiveRecallActive
                    ? 'bg-indigo-700 text-white'
                    : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                }`}
              >
                {totalRecallCardsCount}
              </span>
            )}
          </button>
        </nav>

        {/* Center: Global Search Bar Trigger */}
        <div className="flex-1 max-w-xs mx-1 hidden xl:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-3 py-2 text-xs text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-all shadow-xs"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search chapters, formulas...</span>
            </div>
            <kbd className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Search Button (for <xl screens) */}
          <button
            onClick={onOpenSearch}
            className="xl:hidden min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search (Cmd+K)"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Active Recall Button (Mobile View Trigger) */}
          <button
            onClick={onOpenActiveRecall}
            className={`md:hidden flex items-center gap-1 rounded-xl px-2.5 py-2 min-h-[40px] text-xs font-bold transition-all border ${
              isActiveRecallActive
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                : 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300'
            }`}
            title="Active Recall & Mnemonics"
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Recall</span>
          </button>

          {/* Formula & Exceptions Vault Button (Mobile View Trigger) */}
          <button
            onClick={onOpenFormulaVault}
            className={`md:hidden flex items-center gap-1 rounded-xl px-2.5 py-2 min-h-[40px] text-xs font-bold transition-all border ${
              isFormulaVaultActive
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
            }`}
            title="Open Formula & Exceptions Vault"
          >
            <span className="text-xs">⚡</span>
            <span>Vault</span>
          </button>

          {/* 80/20 High-Yield Filter Toggle */}
          <button
            onClick={onToggleHighYield}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-xl px-2.5 sm:px-3 py-2 min-h-[44px] sm:min-h-0 text-xs font-bold transition-all border ${
              isHighYieldActive
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm ring-2 ring-rose-500/20'
                : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40'
            }`}
            title="Filter to show ONLY High-Repeat chapters"
          >
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">80/20 High-Yield</span>
            <span className="sm:hidden">80/20</span>
          </button>

          {/* Built-in JEE Study Timer Button */}
          <button
            onClick={onOpenTimer}
            className={`flex items-center gap-1 sm:gap-1.5 rounded-xl px-2.5 sm:px-3 py-2 min-h-[44px] sm:min-h-0 text-xs font-semibold transition-all border ${
              timerActiveInfo?.isRunning
                ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Open JEE Study Timer"
          >
            <Clock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-mono">
              {timerActiveInfo?.timeText || 'Study Timer'}
            </span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

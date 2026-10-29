import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Printer,
  Copy,
  Check,
  Search,
  Bookmark,
  Flame,
  Sparkles,
  BookOpen,
  Filter,
  ExternalLink,
  Layers,
  ChevronRight,
  Eye,
  EyeOff,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Chapter, Subject, ClassLevel, UserChapterState } from '../types';
import { getAllVaultItems, VaultItem, VaultCategory } from '../utils/formulaExtractor';
import MathRenderer from './MathRenderer';
import MathText from './MathText';

interface FormulaVaultViewProps {
  chapters: Chapter[];
  userStates: Record<string, UserChapterState>;
  onBack: () => void;
  onSelectChapter: (chapterId: string) => void;
  onBookmarkAllHighRepeat: () => void;
}

export const FormulaVaultView: React.FC<FormulaVaultViewProps> = ({
  chapters,
  userStates,
  onBack,
  onSelectChapter,
  onBookmarkAllHighRepeat,
}) => {
  // Scope: 'all' (default: all PCM chapters) | 'high_repeat' | 'bookmarked'
  const [scope, setScope] = useState<'all' | 'high_repeat' | 'bookmarked'>('all');
  const [itemTypeFilter, setItemTypeFilter] = useState<VaultCategory>('all');
  const [selectedSubject, setSelectedSubject] = useState<'all' | Subject>('all');
  const [selectedClass, setSelectedClass] = useState<'all' | ClassLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Flashcard Active Recall mode (hides formula/punchline until revealed by student)
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [revealedCardIds, setRevealedCardIds] = useState<Set<string>>(new Set());

  // Copy feedback tracking
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);
  const [copiedAllMarkdown, setCopiedAllMarkdown] = useState(false);

  // Identify bookmarked chapters
  const bookmarkedChapters = useMemo(() => {
    return chapters.filter((ch) => userStates[ch.id]?.isBookmarked);
  }, [chapters, userStates]);

  // Determine target chapters based on active scope
  const targetChapters = useMemo(() => {
    switch (scope) {
      case 'bookmarked':
        return bookmarkedChapters;
      case 'high_repeat':
        return chapters.filter((ch) => ch.repeatPriority === 'high');
      case 'all':
      default:
        return chapters;
    }
  }, [scope, bookmarkedChapters, chapters]);

  // Extract all vault items (Formulas + NCERT Exceptions) from target chapters
  const allVaultItems = useMemo(() => {
    return getAllVaultItems(targetChapters);
  }, [targetChapters]);

  // Filter items by type (formula vs ncert-exception), subject, class, and search query
  const filteredItems = useMemo(() => {
    return allVaultItems.filter((item) => {
      // Type filter
      if (itemTypeFilter !== 'all' && item.itemType !== itemTypeFilter) return false;

      // Subject filter
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;

      // Class filter
      if (selectedClass !== 'all' && item.classLevel !== selectedClass) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchChapter = item.chapterTitle.toLowerCase().includes(q);
        const matchLatex = item.latex ? item.latex.toLowerCase().includes(q) : false;
        const matchTips = item.extraTips?.some((t) => t.toLowerCase().includes(q)) || false;
        const matchRef = item.ncertReference?.toLowerCase().includes(q) || false;

        if (!matchTitle && !matchContent && !matchChapter && !matchLatex && !matchTips && !matchRef) {
          return false;
        }
      }

      return true;
    });
  }, [allVaultItems, itemTypeFilter, selectedSubject, selectedClass, searchQuery]);

  // Counts for summary metrics
  const counts = useMemo(() => {
    const formulasCount = allVaultItems.filter((i) => i.itemType === 'formula').length;
    const ncertCount = allVaultItems.filter((i) => i.itemType === 'ncert-exception').length;
    return {
      total: allVaultItems.length,
      formulas: formulasCount,
      ncert: ncertCount,
      filteredTotal: filteredItems.length,
      filteredFormulas: filteredItems.filter((i) => i.itemType === 'formula').length,
      filteredNcert: filteredItems.filter((i) => i.itemType === 'ncert-exception').length,
    };
  }, [allVaultItems, filteredItems]);

  // Toggle reveal for a card in Flashcard Mode
  const toggleRevealCard = (id: string) => {
    setRevealedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRevealAll = () => {
    setRevealedCardIds(new Set(filteredItems.map((i) => i.id)));
  };

  const handleHideAll = () => {
    setRevealedCardIds(new Set());
  };

  const safeCopyText = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // ignore
      }
      document.body.removeChild(textarea);
    }
  };

  // Copy single item LaTeX or content
  const handleCopyItem = (item: VaultItem) => {
    const textToCopy = item.latex ? item.latex : item.content;
    void safeCopyText(textToCopy);
    setCopiedItemId(item.id);
    setTimeout(() => setCopiedItemId(null), 2000);
  };

  // Copy all visible items formatted as Markdown cheat sheet
  const handleCopyAllMarkdown = () => {
    let md = `# JEE Nexus — Formula & Exceptions Vault Cheat Sheet\n\n`;
    md += `> Filter: ${itemTypeFilter.toUpperCase()} | Subject: ${selectedSubject.toUpperCase()} | Scope: ${scope.toUpperCase()}\n\n`;

    filteredItems.forEach((item, idx) => {
      const typeBadge = item.itemType === 'formula' ? '🟢 FORMULA' : '🟡 NCERT EXCEPTION';
      md += `### ${idx + 1}. [${typeBadge}] ${item.title}\n`;
      md += `**Chapter:** [${item.subject.toUpperCase()}] Class ${item.classLevel} - Ch ${item.chapterNumber}: ${item.chapterTitle}\n\n`;
      if (item.latex) {
        md += `$$${item.latex}$$\n\n`;
      }
      if (item.content) {
        md += `${item.content}\n\n`;
      }
      if (item.ncertReference) {
        md += `*Citation:* ${item.ncertReference}\n\n`;
      }
      if (item.extraTips && item.extraTips.length > 0) {
        md += `*NTA Tips / Traps:*\n`;
        item.extraTips.forEach((tip) => {
          md += `- ${tip}\n`;
        });
        md += `\n`;
      }
      md += `---\n\n`;
    });

    void safeCopyText(md);
    setCopiedAllMarkdown(true);
    setTimeout(() => setCopiedAllMarkdown(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Top Action & Navigation Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Syllabus Explorer</span>
            </button>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                ⚡
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Formula & Exceptions Vault
              </span>
              <span className="rounded-md bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {counts.filteredTotal} Items
              </span>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* Flashcard Active Recall Toggle */}
            <button
              onClick={() => {
                const next = !isFlashcardMode;
                setIsFlashcardMode(next);
                if (next) setRevealedCardIds(new Set());
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border ${
                isFlashcardMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
              title="Toggle Flashcard Active Recall Mode: Hide answers to test yourself"
            >
              {isFlashcardMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-amber-500" />}
              <span>{isFlashcardMode ? 'Recall Mode ON' : 'Flashcard Mode'}</span>
            </button>

            {/* Copy All as Markdown */}
            <button
              onClick={handleCopyAllMarkdown}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
              title="Copy all visible items in clean Markdown"
            >
              {copiedAllMarkdown ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAllMarkdown ? 'Copied Markdown!' : 'Copy Sheet'}</span>
            </button>

            {/* Print Cheat Sheet */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
              title="Print clean cheat sheet for offline revision"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Vault</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Printable-Only Document Header */}
        <div className="hidden print:block pb-4 mb-6 border-b border-black">
          <h1 className="text-2xl font-black">JEE Nexus — Master Formula & Exceptions Vault</h1>
          <p className="text-xs text-gray-600">
            Physics, Chemistry & Mathematics • NCERT Class 11 & 12 • High-Yield Revision Matrix
          </p>
        </div>

        {/* Hero Banner with Summary & Scope Switcher */}
        <div className="mb-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs no-print">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  PCM Unified Vault
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  {counts.formulas} Green Formulas • {counts.ncert} Yellow NCERT Exceptions
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Formula & Exceptions Vault
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                One-stop aggregated cheat sheet of all 🟢 Green Master Formulas and 🟡 Yellow NCERT Exception highlights across Physics, Chemistry, and Mathematics. Revise in flashcard grid or print for exam eve.
              </p>
            </div>

            {/* Scope Switcher Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full scrollbar-none touch-scroll shrink-0">
              <button
                onClick={() => setScope('all')}
                className={`min-h-[38px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  scope === 'all'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="h-3.5 w-3.5 shrink-0" />
                <span>All Chapters ({chapters.length})</span>
              </button>

              <button
                onClick={() => setScope('high_repeat')}
                className={`min-h-[38px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  scope === 'high_repeat'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-rose-600 dark:hover:text-rose-400'
                }`}
              >
                <Flame className="h-3.5 w-3.5 fill-current shrink-0" />
                <span>80/20 High-Repeat</span>
              </button>

              <button
                onClick={() => setScope('bookmarked')}
                className={`min-h-[38px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  scope === 'bookmarked'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5 fill-current shrink-0" />
                <span>Bookmarked ({bookmarkedChapters.length})</span>
              </button>
            </div>
          </div>

          {/* Primary Type Filter: All vs Green Formulas vs Yellow NCERT Exceptions */}
          <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full scrollbar-none">
              <button
                onClick={() => setItemTypeFilter('all')}
                className={`min-h-[36px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  itemTypeFilter === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>All Vault Items</span>
                <span className="rounded-md bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 text-[10px]">
                  {allVaultItems.length}
                </span>
              </button>

              <button
                onClick={() => setItemTypeFilter('formula')}
                className={`min-h-[36px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  itemTypeFilter === 'formula'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                }`}
              >
                <span className="font-mono text-sm">🟢</span>
                <span>Formulas Vault Only</span>
                <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
                  itemTypeFilter === 'formula' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                }`}>
                  {counts.formulas}
                </span>
              </button>

              <button
                onClick={() => setItemTypeFilter('ncert-exception')}
                className={`min-h-[36px] flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all whitespace-nowrap ${
                  itemTypeFilter === 'ncert-exception'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                    : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                }`}
              >
                <span className="font-mono text-sm">🟡</span>
                <span>NCERT Exceptions Only</span>
                <span className={`rounded-md px-1.5 py-0.2 text-[10px] ${
                  itemTypeFilter === 'ncert-exception' ? 'bg-amber-600 text-white' : 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                }`}>
                  {counts.ncert}
                </span>
              </button>
            </div>

            {/* Flashcard Recall Controller (When active) */}
            {isFlashcardMode && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  Revealed: {revealedCardIds.size} / {filteredItems.length}
                </span>
                <button
                  onClick={handleRevealAll}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Reveal All
                </button>
                <button
                  onClick={handleHideAll}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Hide All
                </button>
              </div>
            )}
          </div>

          {/* Secondary Filter Row: Subject, Class, Search */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Subject Filter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800 overflow-x-auto max-w-full scrollbar-none">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedSubject === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Subjects
              </button>
              <button
                onClick={() => setSelectedSubject('physics')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                  selectedSubject === 'physics'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>Physics</span>
              </button>
              <button
                onClick={() => setSelectedSubject('chemistry')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                  selectedSubject === 'chemistry'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Chemistry</span>
              </button>
              <button
                onClick={() => setSelectedSubject('mathematics')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1 whitespace-nowrap ${
                  selectedSubject === 'mathematics'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>Maths</span>
              </button>
            </div>

            {/* Class Filter */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
              <button
                onClick={() => setSelectedClass('all')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedClass === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All Classes
              </button>
              <button
                onClick={() => setSelectedClass('11')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedClass === '11'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Class 11
              </button>
              <button
                onClick={() => setSelectedClass('12')}
                className={`min-h-[36px] sm:min-h-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedClass === '12'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Class 12
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="flex-1 min-w-[200px] w-full sm:w-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, exceptions, or equations (e.g. Carnot, Drift, Ionization)..."
                className="w-full min-h-[40px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Empty State when scope === 'bookmarked' and no chapters bookmarked */}
        {scope === 'bookmarked' && bookmarkedChapters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center my-8 bg-white/50 dark:bg-[#1E293B]/50 no-print">
            <Bookmark className="h-12 w-12 mx-auto text-slate-400 mb-3 opacity-40" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              No Chapters Bookmarked Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Bookmark chapters on the syllabus dashboard to generate your tailored exam-day cheat sheet.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onBookmarkAllHighRepeat}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>Bookmark High-Repeat Chapters</span>
              </button>
              <button
                onClick={() => setScope('all')}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
              >
                View All PCM Items ({allVaultItems.length})
              </button>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center my-8 text-slate-400 no-print">
            <p className="text-sm font-semibold">No formulas or exceptions match your current filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSelectedClass('all');
                setItemTypeFilter('all');
              }}
              className="mt-3 text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          /* Flashcard-Style Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredItems.map((item) => {
              const isFormula = item.itemType === 'formula';
              const isRevealed = !isFlashcardMode || revealedCardIds.has(item.id);
              const isCopied = copiedItemId === item.id;

              const subjectBorder =
                item.subject === 'physics'
                  ? 'border-blue-500/20 dark:border-blue-500/30'
                  : item.subject === 'chemistry'
                  ? 'border-emerald-500/20 dark:border-emerald-500/30'
                  : 'border-amber-500/20 dark:border-amber-500/30';

              const subjectBadge =
                item.subject === 'physics'
                  ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900'
                  : item.subject === 'chemistry'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900'
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900';

              return (
                <div
                  key={item.id}
                  className={`flex flex-col justify-between rounded-2xl border bg-white dark:bg-[#1E293B] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden break-inside-avoid ${
                    isFormula
                      ? 'border-emerald-500/30 hover:border-emerald-500'
                      : 'border-amber-500/30 hover:border-amber-500'
                  }`}
                >
                  {/* Card Header Top Accent Bar */}
                  <div
                    className={`h-1.5 w-full ${
                      isFormula
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    }`}
                  />

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Type Badge */}
                          {isFormula ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100/80 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800">
                              <span>🟢</span>
                              <span>Formula</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800">
                              <span>🟡</span>
                              <span>NCERT Exception</span>
                            </span>
                          )}

                          {/* Subject & Class Badge */}
                          <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold border uppercase ${subjectBadge}`}>
                            {item.subject.slice(0, 4)} • Cl {item.classLevel}
                          </span>

                          {item.isHighRepeat && (
                            <span className="inline-flex items-center gap-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
                              <Flame className="h-2.5 w-2.5 fill-current" />
                              <span>80/20</span>
                            </span>
                          )}
                        </div>

                        {/* 1-Click Copy Formula Button */}
                        <button
                          onClick={() => handleCopyItem(item)}
                          className={`no-print flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold transition-colors shrink-0 border ${
                            isCopied
                              ? 'bg-emerald-600 text-white border-emerald-700'
                              : isFormula
                              ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                              : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title={isFormula ? 'Copy LaTeX Formula' : 'Copy NCERT Statement'}
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>{isFormula ? 'Copy Formula' : 'Copy'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Card Title */}
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-1">
                        <MathText text={item.title} />
                      </h3>

                      {/* Chapter Reference */}
                      <button
                        onClick={() => onSelectChapter(item.chapterId)}
                        className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mb-3 text-left"
                        title="Click to open chapter notes"
                      >
                        <span>Ch {item.chapterNumber}: {item.chapterTitle}</span>
                        <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                      </button>

                      {/* Content / Formula Body with Flashcard Mode Reveal */}
                      {isFlashcardMode && !isRevealed ? (
                        <div
                          onClick={() => toggleRevealCard(item.id)}
                          className="my-3 cursor-pointer rounded-xl border border-dashed border-amber-300 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/20 p-5 text-center hover:bg-amber-100/50 dark:hover:bg-amber-950/40 transition-colors group select-none"
                        >
                          <Eye className="h-6 w-6 mx-auto text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            {isFormula ? 'Tap to Reveal Formula' : 'Tap to Reveal NCERT Fact'}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Active Recall Self-Test
                          </p>
                        </div>
                      ) : (
                        <div>
                          {/* Formula LaTeX Display (Green Box Style) */}
                          {item.latex && (
                            <div className="my-2.5 overflow-x-auto rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-emerald-500/20 dark:border-emerald-500/30 text-center text-slate-900 dark:text-slate-100">
                              <MathRenderer math={item.latex} display={true} />
                            </div>
                          )}

                          {/* NCERT Exception Statement Box (Yellow Callout Style) */}
                          {item.content && (
                            <div
                              className={`my-2 rounded-xl p-3 text-xs leading-relaxed ${
                                isFormula
                                  ? 'bg-slate-50/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800'
                                  : 'bg-amber-50/80 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60'
                              }`}
                            >
                              <p className="whitespace-pre-line">
                                <MathText text={item.content} />
                              </p>
                            </div>
                          )}

                          {/* NCERT Citation Tag */}
                          {item.ncertReference && (
                            <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400">
                              <BookOpen className="h-3 w-3 shrink-0" />
                              <span className="truncate">{item.ncertReference}</span>
                            </div>
                          )}

                          {/* Extra Tips / Shortcuts / Traps */}
                          {item.extraTips && item.extraTips.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                {isFormula ? '⚡ JEE Shortcut Tips' : '⚠️ Key Takeaways'}
                              </span>
                              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                                {item.extraTips.map((tip, tIdx) => (
                                  <li key={tIdx} className="flex items-start gap-1.5 leading-snug">
                                    <span
                                      className={`font-bold shrink-0 ${
                                        isFormula ? 'text-emerald-500' : 'text-amber-500'
                                      }`}
                                    >
                                      •
                                    </span>
                                    <span>
                                      <MathText text={tip} />
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 no-print">
                      <button
                        onClick={() => onSelectChapter(item.chapterId)}
                        className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                      >
                        <span>Open Chapter</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>

                      {isFlashcardMode && isRevealed && (
                        <button
                          onClick={() => toggleRevealCard(item.id)}
                          className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Hide</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormulaVaultView;

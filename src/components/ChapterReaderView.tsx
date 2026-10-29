import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Flame,
  Star,
  Bookmark,
  Zap,
  CheckCircle2,
  Printer,
  Sparkles,
  BookOpen,
  Target,
  Layers,
  ChevronRight,
  ChevronDown,
  Save,
  AlertCircle,
  HelpCircle,
  FileText,
  FileDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Chapter, ChapterStatus, UserChapterState } from '../types';
import HighlightBox from './HighlightBox';
import FlashcardsView from './FlashcardsView';
import MathRenderer from './MathRenderer';
import MathText from './MathText';
import PDFExportModal from './PDFExportModal';
import PracticePYQView from './PracticePYQView';
import { getChapterPracticePYQs } from '../data/practicePYQData';
import { getChapterRecallCards } from '../data/flashcardsData';

interface ChapterReaderViewProps {
  chapter: Chapter;
  allChaptersInSubject: Chapter[];
  userState?: UserChapterState;
  onBack: () => void;
  onSelectChapter: (chapterId: string) => void;
  onUpdateStatus: (chapterId: string, status: ChapterStatus) => void;
  onToggleBookmark: (chapterId: string) => void;
  onToggleWeak: (chapterId: string) => void;
  onSaveNotes: (chapterId: string, notes: string) => void;
  onToggleChecklistItem: (chapterId: string, itemId: string) => void;
  onSaveQuizAnswers?: (chapterId: string, answers: Record<string, 'A' | 'B' | 'C' | 'D'>) => void;
}

export const ChapterReaderView: React.FC<ChapterReaderViewProps> = ({
  chapter,
  allChaptersInSubject,
  userState,
  onBack,
  onSelectChapter,
  onUpdateStatus,
  onToggleBookmark,
  onToggleWeak,
  onSaveNotes,
  onToggleChecklistItem,
  onSaveQuizAnswers,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'archetypes' | 'ncert_gems' | 'flashcards' | 'practice'>('notes');
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(userState?.personalNotes || '');
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [mobileToolsTab, setMobileToolsTab] = useState<'trends' | 'checklist' | 'scratchpad'>('checklist');

  const practicePYQs = getChapterPracticePYQs(chapter);
  const recallCards = getChapterRecallCards(chapter);

  useEffect(() => {
    setPersonalNotes(userState?.personalNotes || '');
  }, [chapter.id, userState?.personalNotes]);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setPersonalNotes(text);
    onSaveNotes(chapter.id, text);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ChapterStatus;
    onUpdateStatus(chapter.id, newStatus);
    if (newStatus === 'mastered') {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#3B82F6', '#10B981', '#F59E0B'],
        });
      } catch (err) {}
    }
  };

  const currentStatus = userState?.status || 'not_started';
  const isBookmarked = userState?.isBookmarked || false;
  const isWeak = userState?.isWeakTopic || false;
  const completedChecklist = userState?.completedChecklistIds || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen pb-20 ${isRevisionMode ? 'revision-mode-active' : ''}`}>
      {/* Top Sticky Action & Breadcrumb Bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
          {/* Breadcrumb & Back */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto w-full md:w-auto scrollbar-none">
            <button
              onClick={onBack}
              className="min-h-[38px] flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shrink-0 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Syllabus</span>
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="capitalize font-semibold text-slate-700 dark:text-slate-300 shrink-0">
              {chapter.subject}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-600 dark:text-slate-400 shrink-0 whitespace-nowrap">
              Class {chapter.classLevel}
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-xs">
              Ch {chapter.chapterNumber}: {chapter.title}
            </span>
          </div>

          {/* Right Action Controls: 1-Click Revision Mode, Status, Bookmark, Print */}
          <div className="flex items-center justify-between md:justify-end gap-1.5 sm:gap-2 flex-wrap">
            {/* ⚡ Exam-Eve 1-Click Revision Mode Switch */}
            <button
              onClick={() => setIsRevisionMode(!isRevisionMode)}
              className={`min-h-[38px] flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all border shadow-xs ${
                isRevisionMode
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-amber-600 ring-2 ring-amber-400/30'
                  : 'bg-amber-50 dark:bg-amber-950/30 border-amber-300/80 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
              }`}
              title="Toggle to hide standard theory and show ONLY formulas, high-yield traps, and NCERT exceptions"
            >
              <Zap className={`h-3.5 w-3.5 ${isRevisionMode ? 'fill-white' : 'fill-amber-500 text-amber-500'}`} />
              <span className="hidden xs:inline">{isRevisionMode ? '⚡ Revision: ON' : '⚡ Exam-Eve'}</span>
              <span className="xs:hidden">{isRevisionMode ? '⚡ ON' : '⚡ Eve'}</span>
            </button>

            {/* Status Dropdown */}
            <select
              value={currentStatus}
              onChange={handleStatusChange}
              className={`min-h-[38px] text-xs font-bold rounded-xl px-2 sm:px-2.5 py-1.5 border transition-colors cursor-pointer ${
                currentStatus === 'mastered'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : currentStatus === 'in_progress'
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <option value="not_started">⚪ Not Started</option>
              <option value="in_progress">🔵 In Progress</option>
              <option value="mastered">🟢 Mastered</option>
            </select>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-blue-500 text-white border-blue-600 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add to Bookmarks'}
              aria-label="Toggle Bookmark"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Weak Topic Star */}
            <button
              onClick={() => onToggleWeak(chapter.id)}
              className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border transition-colors ${
                isWeak
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
              title={isWeak ? 'Marked as Weak Topic' : 'Mark as Weak Topic'}
              aria-label="Toggle Weak Topic"
            >
              <Star className={`h-4 w-4 ${isWeak ? 'fill-current' : ''}`} />
            </button>

            {/* Download PDF Notes Button */}
            <button
              onClick={() => setIsPDFModalOpen(true)}
              className="min-h-[38px] flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-50/80 dark:bg-blue-950/40 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors shadow-xs"
              title="Generate and download print-friendly PDF of this chapter's notes"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Quick Browser Print Button */}
            <button
              onClick={handlePrint}
              className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Quick Browser Print (Ctrl+P)"
              aria-label="Print Notes"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Revision Mode Banner when active */}
      {isRevisionMode && (
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-b border-amber-300/40 dark:border-amber-900/40 py-2 px-4 text-center text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2">
          <Zap className="h-3.5 w-3.5 fill-amber-500 shrink-0" />
          <span>
            ⚡ Exam-Eve 1-Click Revision Mode Active: Standard paragraphs hidden. Showing formulas, NTA traps & NCERT exceptions only.
          </span>
          <button
            onClick={() => setIsRevisionMode(false)}
            className="underline ml-2 text-rose-600 dark:text-rose-400 shrink-0"
          >
            Turn Off
          </button>
        </div>
      )}

      {/* Mobile Table of Contents & Chapter Switcher Accordion Bar (<lg screens) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-1 no-print">
        <button
          onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
          className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] text-xs font-bold text-slate-800 dark:text-slate-200 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-500" />
            <span>Table of Contents & {chapter.subject} Chapters</span>
            <span className="rounded-md bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 text-[10px] text-blue-700 dark:text-blue-300 font-mono">
              {chapter.notesSections.length} Sections
            </span>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isMobileTocOpen ? 'rotate-180' : ''}`} />
        </button>

        {isMobileTocOpen && (
          <div className="mt-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 shadow-md space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">On This Page</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {chapter.notesSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setIsMobileTocOpen(false)}
                    className="block rounded-lg px-2.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                  >
                    • {sec.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Switch {chapter.subject} Chapter
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                {allChaptersInSubject.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      setIsMobileTocOpen(false);
                    }}
                    className={`w-full text-left rounded-lg px-2.5 py-2 text-xs transition-colors flex items-center justify-between gap-1.5 ${
                      ch.id === chapter.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="truncate">{ch.chapterNumber}. {ch.title}</span>
                    {ch.repeatPriority === 'high' && (
                      <Flame className={`h-3.5 w-3.5 shrink-0 ${ch.id === chapter.id ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3-Column Academic Layout on Desktop / Adaptive Layout on Mobile & Tablets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================= */}
        {/* LEFT COLUMN: CHAPTER SWITCHER & SUBTOPIC TOC (Col 3, Desktop Only) */}
        {/* ========================================================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 order-2 lg:order-1 no-print">
          {/* Table of Contents for Active Chapter */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 shadow-xs sticky top-20">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
              <Layers className="h-4 w-4 text-blue-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                On This Page
              </h4>
            </div>

            <nav className="space-y-1.5 text-xs">
              {chapter.notesSections.map((sec, idx) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block rounded-lg px-2.5 py-1.5 font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
                >
                  {sec.title}
                </a>
              ))}
              {chapter.solvedArchetypes.length > 0 && (
                <button
                  onClick={() => setActiveTab('archetypes')}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 font-semibold transition-colors flex items-center justify-between ${
                    activeTab === 'archetypes'
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span>🎯 Solved PYQ Archetypes</span>
                  <span className="font-mono text-[10px] bg-blue-100 dark:bg-blue-900/60 px-1 rounded-sm">
                    {chapter.solvedArchetypes.length}
                  </span>
                </button>
              )}
              {chapter.ncertGems.length > 0 && (
                <button
                  onClick={() => setActiveTab('ncert_gems')}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 font-semibold transition-colors flex items-center justify-between ${
                    activeTab === 'ncert_gems'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span>💎 NCERT Hidden Gems</span>
                  <span className="font-mono text-[10px] bg-amber-100 dark:bg-amber-900/60 px-1 rounded-sm">
                    {chapter.ncertGems.length}
                  </span>
                </button>
              )}
              {recallCards.length > 0 && (
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 font-semibold transition-colors flex items-center justify-between ${
                    activeTab === 'flashcards'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span>🧠 Active Recall & Mnemonics</span>
                  <span className="font-mono text-[10px] bg-emerald-100 dark:bg-emerald-900/60 px-1 rounded-sm">
                    {recallCards.length}
                  </span>
                </button>
              )}
              {practicePYQs.length > 0 && (
                <button
                  onClick={() => setActiveTab('practice')}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 font-semibold transition-colors flex items-center justify-between ${
                    activeTab === 'practice'
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>Practice Top PYQs</span>
                  </span>
                  <span className="font-mono text-[10px] bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 px-1 rounded-sm font-bold">
                    {practicePYQs.length}
                  </span>
                </button>
              )}
            </nav>

            {/* Quick Download PDF Notes Action */}
            <button
              onClick={() => setIsPDFModalOpen(true)}
              className="w-full mt-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 p-2.5 text-left hover:border-blue-300 dark:hover:border-blue-800 transition-colors flex items-center justify-between gap-2 group"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400">
                  <FileDown className="h-4 w-4" />
                </span>
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Download PDF Notes
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Print-Ready jsPDF Format
                  </span>
                </div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Quick jump to same-subject chapters */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {chapter.subject} Chapters
              </h5>
              <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                {allChaptersInSubject.map((ch) => {
                  const isCurrent = ch.id === chapter.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => onSelectChapter(ch.id)}
                      className={`w-full text-left rounded-lg px-2 py-1.5 text-xs transition-colors flex items-center justify-between gap-1.5 ${
                        isCurrent
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">
                        {ch.chapterNumber}. {ch.title}
                      </span>
                      {ch.repeatPriority === 'high' && (
                        <Flame className={`h-3 w-3 shrink-0 ${isCurrent ? 'fill-white text-white' : 'fill-rose-500 text-rose-500'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* CENTER COLUMN: DETAILED HIGH-YIELD NOTES (Col 6)           */}
        {/* ========================================================= */}
        <main className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          {/* Part 1: Chapter Weightage & Priority Banner */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                {chapter.subject} • Class {chapter.classLevel}
              </span>
              {chapter.repeatPriority === 'high' ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 text-xs font-bold text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                  <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                  <span>🔥 High Repeat (Must Do)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300 border border-amber-200">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>⭐ Medium Repeat</span>
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Ch {chapter.chapterNumber}: {chapter.title}
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
              NCERT Curriculum: {chapter.ncertName}
            </p>

            {/* Trend & Marks Highlight Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3 border border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                  Avg 5-Yr PYQs
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {chapter.avgQuestions}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                  Expected Marks
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono text-sm">
                  {chapter.expectedWeightage}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase block">
                  Difficulty Level
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {chapter.pyqTrend.difficulty}
                </span>
              </div>
            </div>

            {/* Top 3 Subtopics */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Top High-Frequency JEE Subtopics
              </p>
              <div className="flex flex-wrap gap-1.5">
                {chapter.highlightedSubtopics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    • {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reader Sub-Tabs: Notes | Archetypes | NCERT Gems | Flashcards | Practice */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1.5 no-print scrollbar-none touch-scroll">
            <button
              onClick={() => setActiveTab('notes')}
              className={`min-h-[44px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'notes'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Theory & Highlights</span>
            </button>
            <button
              onClick={() => setActiveTab('archetypes')}
              className={`min-h-[44px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'archetypes'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Target className="h-4 w-4" />
              <span>PYQ Archetypes ({chapter.solvedArchetypes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('ncert_gems')}
              className={`min-h-[44px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'ncert_gems'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>NCERT Gems ({chapter.ncertGems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`min-h-[44px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'flashcards'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Zap className="h-4 w-4 text-amber-500" />
              <span>Active Recall & Mnemonics ({recallCards.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`min-h-[44px] flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'practice'
                  ? 'border-rose-600 text-rose-600 dark:text-rose-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Target className="h-4 w-4 text-rose-500" />
              <span>Practice Top 5 PYQs ({practicePYQs.length})</span>
            </button>
          </div>

          {/* TAB 1: NOTES WITH 4-COLOR HIGHLIGHT SYSTEM */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              {chapter.notesSections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs scroll-mt-24"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                    {section.title}
                  </h3>

                  {/* Standard Explanatory Paragraphs (Hidden when Exam-Eve Mode is Active) */}
                  {section.standardTheory && section.standardTheory.length > 0 && (
                    <div className="standard-theory-para space-y-2.5 mb-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {section.standardTheory.map((p, pIdx) => (
                        <p key={pIdx}>
                          <MathText text={p} />
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Highlight Callout Boxes (4-Color System: Red, Green, Yellow, Purple) */}
                  {section.highlightBoxes && section.highlightBoxes.length > 0 && (
                    <div className="space-y-3">
                      {section.highlightBoxes.map((box, bIdx) => (
                        <HighlightBox key={bIdx} data={box} />
                      ))}
                    </div>
                  )}

                  {/* Step-by-Step Reaction/Derivation Flowchart */}
                  {section.flowchartOrDerivation && (
                    <div className="my-5 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{section.flowchartOrDerivation.title}</span>
                      </h4>
                      <div className="space-y-2">
                        {section.flowchartOrDerivation.steps.map((st, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200">
                            <span className="font-mono font-bold px-1.5 py-0.5 rounded-sm bg-blue-200/70 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shrink-0">
                              {st.step}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium">
                                <MathText text={st.desc} />
                              </p>
                              {st.formulaOrReaction && (
                                <div className="block mt-1.5 text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 overflow-x-auto">
                                  <MathText text={st.formulaOrReaction} />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: SOLVED PYQ ARCHETYPES */}
          {activeTab === 'archetypes' && (
            <div className="space-y-5">
              {chapter.solvedArchetypes.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-8 text-center text-slate-500">
                  <Target className="h-8 w-8 mx-auto text-blue-500 mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Archetypes for this chapter are loading.</p>
                </div>
              ) : (
                chapter.solvedArchetypes.map((arch) => (
                  <div
                    key={arch.number}
                    className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200">
                        Archetype #{arch.number}
                      </span>
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                        {arch.yearTag}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Concept Tested: {arch.conceptTested}
                    </h4>

                    <div className="rounded-xl bg-slate-50 dark:bg-slate-900/80 p-3.5 mb-4 text-sm font-medium text-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-800">
                      <MathText text={arch.question} />
                    </div>

                    {/* Step-by-Step Solution */}
                    <div className="mb-4">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Step-by-Step Methodical Solution
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {arch.solutionSteps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span>
                              <MathText text={step} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* NTA Trap / Speed Shortcut Alert */}
                    <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-3 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>NTA Trap & Speed Shortcut</span>
                      </div>
                      <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                        <MathText text={arch.ntaTrapOrShortcut} />
                      </p>
                    </div>

                    {/* Final Answer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="font-semibold text-slate-500">Final Answer:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                        <MathText text={arch.answer} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: NCERT HIDDEN GEMS & TABLES */}
          {activeTab === 'ncert_gems' && (
            <div className="space-y-5">
              {chapter.ncertGems.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-8 text-center text-slate-500">
                  <Sparkles className="h-8 w-8 mx-auto text-amber-500 mb-2 opacity-50" />
                  <p className="text-sm font-semibold">NCERT gems for this chapter are compiling.</p>
                </div>
              ) : (
                chapter.ncertGems.map((gem) => (
                  <div
                    key={gem.id}
                    className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {gem.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                        {gem.tableOrPageRef}
                      </span>
                    </div>

                    <div className="my-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3.5 text-xs sm:text-sm italic leading-relaxed text-slate-800 dark:text-slate-200">
                      "<MathText text={gem.statement} />"
                    </div>

                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      <strong className="text-amber-700 dark:text-amber-400">Why NTA Asks This:</strong>{' '}
                      <MathText text={gem.importanceReason} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: INTERACTIVE ACTIVE RECALL FLASHCARDS & MNEMONICS */}
          {activeTab === 'flashcards' && (
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-5 sm:p-6 shadow-xs">
              <div className="text-center mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  3D Active Recall Flashcards & Mnemonics
                </h3>
                <p className="text-xs text-slate-500">
                  Click on the card to flip and reveal exact NCERT formulas, answers, and clever memory tricks.
                </p>
              </div>
              <FlashcardsView chapter={chapter} flashcards={chapter.flashcards} />
            </div>
          )}

          {/* TAB 5: PRACTICE TOP 5 PYQS */}
          {activeTab === 'practice' && (
            <PracticePYQView
              chapter={chapter}
              savedAnswers={userState?.practiceQuizAnswers}
              onSaveAnswers={onSaveQuizAnswers || (() => {})}
            />
          )}
        </main>

        {/* ========================================================= */}
        {/* MOBILE & TABLET INTELLIGENCE & SCRATCHPAD (lg:hidden)     */}
        {/* ========================================================= */}
        <section className="col-span-1 lg:hidden order-3 space-y-4 no-print mt-2">
          {/* Segmented Selector for Mobile Tools */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 shadow-xs">
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 mb-4">
              <button
                onClick={() => setMobileToolsTab('checklist')}
                className={`min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold transition-all ${
                  mobileToolsTab === 'checklist'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">Checklist</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  {completedChecklist.length}/{chapter.mustSolveChecklist.length}
                </span>
              </button>
              <button
                onClick={() => setMobileToolsTab('trends')}
                className={`min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold transition-all ${
                  mobileToolsTab === 'trends'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>PYQ Trend</span>
              </button>
              <button
                onClick={() => setMobileToolsTab('scratchpad')}
                className={`min-h-[40px] flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold transition-all ${
                  mobileToolsTab === 'scratchpad'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Scratchpad</span>
              </button>
            </div>

            {/* Mobile Tool 1: Checklist */}
            {mobileToolsTab === 'checklist' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Must-Solve Subtopic Checklist
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {completedChecklist.length}/{chapter.mustSolveChecklist.length} Done
                  </span>
                </div>
                {chapter.mustSolveChecklist.map((task, idx) => {
                  const taskId = `task-${idx}`;
                  const isChecked = completedChecklist.includes(taskId);
                  return (
                    <label
                      key={idx}
                      className="min-h-[42px] flex items-start gap-2.5 text-xs cursor-pointer group select-none py-1"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleChecklistItem(chapter.id, taskId)}
                        className="mt-0.5 h-4 w-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <span
                        className={`leading-snug transition-colors ${
                          isChecked
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {/* Mobile Tool 2: Trends */}
            {mobileToolsTab === 'trends' && (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Syllabus Contribution:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {chapter.pyqTrend.marksPercentage}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">NTA Shift Focus:</span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    {chapter.pyqTrend.recentShiftFocus}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block mb-1">Most Repeated Concepts:</span>
                  <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {chapter.pyqTrend.topRepeatedConcepts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1">
                        <span className="text-rose-500 font-bold shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Mobile Tool 3: Scratchpad */}
            {mobileToolsTab === 'scratchpad' && (
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Personal Chapter Scratchpad
                  </span>
                  {isSavedRecently && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Save className="h-3 w-3" />
                      Saved
                    </span>
                  )}
                </div>
                <textarea
                  value={personalNotes}
                  onChange={handleNotesChange}
                  placeholder="Jot down personal tricks, weak formulas, question references from your coaching modules (auto-saved to browser)..."
                  rows={4}
                  className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none font-mono"
                />
                <p className="mt-1 text-[10px] text-slate-400 text-right">
                  {personalNotes.length} characters • Auto-saved
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: CHAPTER INTELLIGENCE & SCRATCHPAD (Col 3, Desktop Only) */}
        {/* ========================================================= */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 order-3 no-print">
          {/* Past 5-Year PYQ Trend Panel */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 sm:p-5 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>PYQ Intelligence & Trends</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Syllabus Contribution:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {chapter.pyqTrend.marksPercentage}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">NTA Shift Focus:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px] bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  {chapter.pyqTrend.recentShiftFocus}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">Most Repeated Concepts:</span>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                  {chapter.pyqTrend.topRepeatedConcepts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Must-Solve Subtopic Checklist with LocalStorage */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Must-Solve Checklist</span>
              </h4>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {completedChecklist.length}/{chapter.mustSolveChecklist.length}
              </span>
            </div>

            <div className="space-y-2">
              {chapter.mustSolveChecklist.map((task, idx) => {
                const taskId = `task-${idx}`;
                const isChecked = completedChecklist.includes(taskId);

                return (
                  <label
                    key={idx}
                    className="flex items-start gap-2.5 text-xs cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleChecklistItem(chapter.id, taskId)}
                      className="mt-0.5 h-3.5 w-3.5 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span
                      className={`leading-tight transition-colors ${
                        isChecked
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white'
                      }`}
                    >
                      {task}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Quick Scratchpad ("My Chapter Notes") */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-500" />
                <span>My Chapter Scratchpad</span>
              </h4>
              {isSavedRecently && (
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Save className="h-3 w-3" />
                  Saved
                </span>
              )}
            </div>

            <textarea
              value={personalNotes}
              onChange={handleNotesChange}
              placeholder="Jot down personal tricks, weak formulas, question references from your coaching modules (auto-saved to browser)..."
              rows={5}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none font-mono"
            />
            <p className="mt-1 text-[10px] text-slate-400 text-right">
              {personalNotes.length} characters • Auto-saved
            </p>
          </div>
        </aside>
      </div>

      {/* jsPDF Print-Friendly Export Modal */}
      <PDFExportModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        chapter={chapter}
        userState={userState}
      />
    </div>
  );
};

export default ChapterReaderView;

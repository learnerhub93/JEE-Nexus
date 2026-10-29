import React, { useState } from 'react';
import {
  FileDown,
  X,
  Check,
  Zap,
  Printer,
  ExternalLink,
  BookOpen,
  Sparkles,
  Loader2,
  FileText
} from 'lucide-react';
import { Chapter, UserChapterState } from '../types';
import { generateChapterPDF, PDFExportOptions } from '../utils/pdfGenerator';

interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter;
  userState?: UserChapterState;
}

export const PDFExportModal: React.FC<PDFExportModalProps> = ({
  isOpen,
  onClose,
  chapter,
  userState,
}) => {
  const [revisionOnly, setRevisionOnly] = useState(false);
  const [includeArchetypes, setIncludeArchetypes] = useState(true);
  const [includeNCERTGems, setIncludeNCERTGems] = useState(true);
  const [includeChecklist, setIncludeChecklist] = useState(true);
  const [includePersonalNotes, setIncludePersonalNotes] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const getOptions = (): PDFExportOptions => ({
    revisionModeOnly: revisionOnly,
    includeStandardTheory: !revisionOnly,
    includeArchetypes,
    includeNCERTGems,
    includeChecklist,
    includePersonalNotes,
  });

  const getFileName = () => {
    const cleanTitle = chapter.title.replace(/[^a-zA-Z0-9]/g, '_');
    const modeSuffix = revisionOnly ? '_ExamEve_Revision' : '_Master_Notes';
    return `${cleanTitle}_Class${chapter.classLevel}${modeSuffix}_JEE_Nexus.pdf`;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setSuccessMessage(null);

    // Yield to allow UI spinner to render
    setTimeout(() => {
      try {
        const doc = generateChapterPDF(chapter, userState, getOptions());
        const fileName = getFileName();
        doc.save(fileName);
        setIsGenerating(false);
        setSuccessMessage(`Downloaded: ${fileName}`);
        setTimeout(() => setSuccessMessage(null), 3500);
      } catch (err) {
        console.error('PDF Generation Error:', err);
        setIsGenerating(false);
      }
    }, 250);
  };

  const handlePreviewInTab = () => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const doc = generateChapterPDF(chapter, userState, getOptions());
        const blob = doc.output('blob');
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setIsGenerating(false);
      } catch (err) {
        console.error('PDF Preview Error:', err);
        setIsGenerating(false);
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-4">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-2xl transition-all scrollbar-none">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <FileDown className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Generate Print-Friendly PDF Notes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ch {chapter.chapterNumber}: {chapter.title} (Class {chapter.classLevel})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            aria-label="Close PDF Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="my-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select PDF Document Format:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Option A: Comprehensive */}
            <div
              onClick={() => setRevisionOnly(false)}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                !revisionOnly
                  ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Full Master Notes
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Complete theory paragraphs, 4-color highlight boxes, and full concept derivations.
              </p>
            </div>

            {/* Option B: Exam-Eve Revision */}
            <div
              onClick={() => setRevisionOnly(true)}
              className={`cursor-pointer rounded-xl border p-3 transition-all ${
                revisionOnly
                  ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300">
                  ⚡ Exam-Eve Revision
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                Hides long theory. High-yield formulas, NTA traps & NCERT lines only.
              </p>
            </div>
          </div>
        </div>

        {/* Content Checkboxes */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/60 p-3.5 border border-slate-100 dark:border-slate-800 space-y-2 mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Include in PDF:
          </span>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeArchetypes}
              onChange={(e) => setIncludeArchetypes(e.target.checked)}
              className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Top Solved PYQ Archetypes ({chapter.solvedArchetypes.length} questions)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeNCERTGems}
              onChange={(e) => setIncludeNCERTGems(e.target.checked)}
              className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>NCERT Hidden Gems & Textbook Tables ({chapter.ncertGems.length} items)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeChecklist}
              onChange={(e) => setIncludeChecklist(e.target.checked)}
              className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Must-Solve Subtopic Checklist with student completion marks</span>
          </label>

          {userState?.personalNotes && (
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includePersonalNotes}
                onChange={(e) => setIncludePersonalNotes(e.target.checked)}
                className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>My Chapter Scratchpad / Personal notes</span>
            </label>
          )}
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-2.5 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="truncate">{successMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            data-testid="modal-download-btn"
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full sm:flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                <span>Download PDF Notes</span>
              </>
            )}
          </button>

          <button
            onClick={handlePreviewInTab}
            disabled={isGenerating}
            className="w-full sm:w-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
            title="Preview PDF in a new browser tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Preview in Tab</span>
          </button>

          <button
            onClick={() => {
              onClose();
              window.print();
            }}
            className="w-full sm:w-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
            title="Standard Browser Print"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFExportModal;

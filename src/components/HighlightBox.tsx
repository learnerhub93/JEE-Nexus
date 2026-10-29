import React, { useState } from 'react';
import { Flame, Calculator, BookOpen, AlertOctagon, CheckCircle2, Copy, Check } from 'lucide-react';
import MathRenderer from './MathRenderer';
import MathText from './MathText';
import { HighlightBoxData } from '../types';

interface HighlightBoxProps {
  data: HighlightBoxData;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({ data }) => {
  const { type, title, content, latex, extraTips } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyFormula = async () => {
    const formulaText = latex || content;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formulaText);
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = formulaText;
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  switch (type) {
    case 'most-repeated':
      return (
        <div className="highlight-box my-4 rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-amber-500/5 to-transparent p-4 sm:p-5 shadow-xs transition-all hover:border-rose-500/50">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-600 dark:text-rose-400">
              <Flame className="h-4 w-4 fill-rose-500 text-rose-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Most Repeated PYQ Topic (80% JEE Questions)
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            <MathText text={title} />
          </h4>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line mb-3">
            <MathText text={content} />
          </p>
          {latex && (
            <div className="my-3 overflow-x-auto rounded-lg bg-white/80 dark:bg-slate-900/90 p-3 border border-rose-200/50 dark:border-rose-900/30 text-center text-slate-900 dark:text-slate-100">
              <MathRenderer math={latex} display={true} />
            </div>
          )}
          {extraTips && extraTips.length > 0 && (
            <ul className="mt-2.5 space-y-1.5 border-t border-rose-200/40 dark:border-rose-900/40 pt-2.5 text-xs text-slate-600 dark:text-slate-400">
              {extraTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <MathText text={tip} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'formula':
      return (
        <div className="highlight-box my-4 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-4 sm:p-5 shadow-xs transition-all hover:border-emerald-500/50">
          <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Calculator className="h-4 w-4 text-emerald-500" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Formula & Shortcut Vault
              </span>
            </div>

            {/* 1-Click Copy Formula Button */}
            <button
              onClick={handleCopyFormula}
              className={`no-print flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all border ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'border-emerald-300 dark:border-emerald-800 bg-white/80 dark:bg-slate-900/80 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
              }`}
              title="Copy LaTeX Formula to Clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied Formula!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Formula</span>
                </>
              )}
            </button>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            <MathText text={title} />
          </h4>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line mb-3">
            <MathText text={content} />
          </p>
          {latex && (
            <div className="my-3 overflow-x-auto rounded-lg bg-white/85 dark:bg-slate-900/90 p-3.5 border border-emerald-200/60 dark:border-emerald-900/40 text-center text-slate-900 dark:text-slate-100 shadow-2xs">
              <MathRenderer math={latex} display={true} />
            </div>
          )}
          {extraTips && extraTips.length > 0 && (
            <ul className="mt-2.5 space-y-1.5 border-t border-emerald-200/40 dark:border-emerald-900/40 pt-2.5 text-xs text-slate-600 dark:text-slate-400">
              {extraTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <span>
                    <MathText text={tip} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'ncert-line':
      return (
        <div className="highlight-box my-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent p-4 sm:p-5 shadow-xs transition-all hover:border-amber-500/60">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <BookOpen className="h-4 w-4 text-amber-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Direct NCERT Line / Exception (High-Yield Assertion)
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            <MathText text={title} />
          </h4>
          <div className="rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3 text-sm italic leading-relaxed text-slate-800 dark:text-slate-200 mb-2">
            "<MathText text={content} />"
          </div>
          {latex && (
            <div className="my-3 overflow-x-auto rounded-lg bg-white/80 dark:bg-slate-900/90 p-3 border border-amber-200/50 dark:border-amber-900/30 text-center text-slate-900 dark:text-slate-100">
              <MathRenderer math={latex} display={true} />
            </div>
          )}
          {extraTips && extraTips.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              {extraTips.map((tip, idx) => (
                <li key={idx}>
                  • <MathText text={tip} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'trap':
      return (
        <div className="highlight-box my-4 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/5 to-transparent p-4 sm:p-5 shadow-xs transition-all hover:border-purple-500/50">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <AlertOctagon className="h-4 w-4 text-purple-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Common JEE Trap / Silly Mistake Alert
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
            <MathText text={title} />
          </h4>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line mb-3">
            <MathText text={content} />
          </p>
          {latex && (
            <div className="my-3 overflow-x-auto rounded-lg bg-white/80 dark:bg-slate-900/90 p-3 border border-purple-200/50 dark:border-purple-900/30 text-center text-slate-900 dark:text-slate-100">
              <MathRenderer math={latex} display={true} />
            </div>
          )}
          {extraTips && extraTips.length > 0 && (
            <ul className="mt-2.5 space-y-1.5 border-t border-purple-200/40 dark:border-purple-900/40 pt-2.5 text-xs text-slate-600 dark:text-slate-400">
              {extraTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-purple-500 font-bold">!</span>
                  <span>
                    <MathText text={tip} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default HighlightBox;

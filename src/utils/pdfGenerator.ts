import { jsPDF } from 'jspdf';
import { Chapter, UserChapterState } from '../types';

export interface PDFExportOptions {
  includeStandardTheory?: boolean;
  includeArchetypes?: boolean;
  includeNCERTGems?: boolean;
  includeFlashcards?: boolean;
  includePersonalNotes?: boolean;
  includeChecklist?: boolean;
  revisionModeOnly?: boolean;
}

// Clean non-Latin1 symbols for crisp PDF typography in standard jsPDF fonts
function cleanPDFText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[🔥⭐📘📐⚠️🔴🟢🟡🟣💎🎯🗂️⚡★✓]/g, '')
    .replace(/Ω/g, ' Ohm')
    .replace(/μ/g, 'u')
    .replace(/τ/g, 'tau')
    .replace(/α/g, 'alpha')
    .replace(/β/g, 'beta')
    .replace(/γ/g, 'gamma')
    .replace(/θ/g, 'theta')
    .replace(/λ/g, 'lambda')
    .replace(/σ/g, 'sigma')
    .replace(/ρ/g, 'rho')
    .replace(/Δ/g, 'Delta ')
    .replace(/Σ/g, 'Sum ')
    .replace(/π/g, 'pi')
    .replace(/φ/g, 'phi')
    .replace(/ν/g, 'nu')
    .replace(/±/g, '+/-')
    .replace(/≈/g, '~=')
    .replace(/≠/g, '!=')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/→/g, '->')
    .replace(/⇒/g, '=>')
    .replace(/\biff\b/g, '<=>')
    .replace(/°/g, ' deg')
    .replace(/’|‘/g, "'")
    .replace(/“|”/g, '"')
    .replace(/–|—/g, '-')
    .replace(/•/g, '-')
    .replace(/Å/g, ' Angstrom')
    .trim();
}

function cleanLatexForPDF(latex: string): string {
  if (!latex) return '';
  return cleanPDFText(
    latex
      .replace(/\\quad/g, '  ')
      .replace(/\\qquad/g, '    ')
      .replace(/\\implies/g, '==>')
      .replace(/\\iff/g, '<==>')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
      .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\times/g, 'x')
      .replace(/\\cdot/g, '·')
      .replace(/\\nu/g, 'nu')
      .replace(/\\mu/g, 'u')
      .replace(/\\tau/g, 'tau')
      .replace(/\\Delta/g, 'Delta ')
      .replace(/\\sum/g, 'Sum ')
      .replace(/\\int/g, 'Integral ')
      .replace(/\\le/g, '<=')
      .replace(/\\ge/g, '>=')
      .replace(/\\to/g, '->')
      .replace(/\\pm/g, '+/-')
      .replace(/\\left|\\right/g, '')
      .replace(/\\;/g, ' ')
      .replace(/\\,/g, ' ')
      .replace(/\\!/g, '')
      .replace(/\\\\/g, ' | ')
      .replace(/\\begin\{aligned\}|\\end\{aligned\}/g, '')
      .replace(/&/g, '')
      .replace(/\\/g, '')
  );
}

export function generateChapterPDF(
  chapter: Chapter,
  userState?: UserChapterState,
  options: PDFExportOptions = {}
): jsPDF {
  const {
    includeStandardTheory = !options.revisionModeOnly,
    includeArchetypes = true,
    includeNCERTGems = true,
    includeFlashcards = true,
    includePersonalNotes = true,
    includeChecklist = true,
    revisionModeOnly = false,
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;
  const bottomLimit = pageHeight - 18;

  let currentY = 16;

  // Subject Primary & Background Tint Colors
  let primaryColor: [number, number, number] = [37, 99, 235]; // Blue for Physics
  let secondaryColor: [number, number, number] = [239, 246, 255]; // Soft blue
  if (chapter.subject === 'chemistry') {
    primaryColor = [5, 150, 105]; // Emerald
    secondaryColor = [236, 253, 245];
  } else if (chapter.subject === 'mathematics') {
    primaryColor = [217, 119, 6]; // Amber
    secondaryColor = [254, 252, 232];
  }

  // Helper: check space and add page with margin reset
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > bottomLimit) {
      doc.addPage();
      currentY = 16;
    }
  };

  // ==========================================
  // 1. COVER / CHAPTER HEADER BANNER
  // ==========================================
  doc.setFillColor(...secondaryColor);
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.8);
  doc.roundedRect(marginX, currentY, contentWidth, 34, 3, 3, 'FD');

  // Brand and Chapter tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...primaryColor);
  const tagText = cleanPDFText(
    `JEE NEXUS • NCERT CLASS ${chapter.classLevel} • ${chapter.subject.toUpperCase()}${
      revisionModeOnly ? ' • EXAM-EVE REVISION MODE' : ''
    }`
  );
  doc.text(tagText, marginX + 4, currentY + 6.5);

  // Chapter Title
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  const titleText = cleanPDFText(`Chapter ${chapter.chapterNumber}: ${chapter.title}`);
  doc.text(titleText, marginX + 4, currentY + 15);

  // Weightage & Priority metadata pill
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105); // slate-600
  const metaText = cleanPDFText(
    `NCERT: ${chapter.ncertName}  |  Avg PYQs: ${chapter.avgQuestions}  |  Weightage: ${chapter.expectedWeightage}  |  Diff: ${chapter.pyqTrend.difficulty}`
  );
  doc.text(metaText, marginX + 4, currentY + 22.5);

  // Repeat Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  if (chapter.repeatPriority === 'high') {
    doc.setFillColor(255, 228, 230); // rose-100
    doc.setTextColor(190, 18, 60); // rose-700
    doc.roundedRect(marginX + 4, currentY + 25.5, 48, 5, 1, 1, 'F');
    doc.text('* HIGH REPEAT CHAPTER (MUST DO)', marginX + 6, currentY + 29.2);
  } else {
    doc.setFillColor(254, 243, 199); // amber-100
    doc.setTextColor(146, 64, 14); // amber-800
    doc.roundedRect(marginX + 4, currentY + 25.5, 44, 5, 1, 1, 'F');
    doc.text('* MEDIUM REPEAT CHAPTER', marginX + 6, currentY + 29.2);
  }

  currentY += 39;

  // ==========================================
  // 2. HIGH-FREQUENCY SUBTOPICS & PYQ TREND
  // ==========================================
  ensureSpace(24);
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('HIGH-YIELD JEE SUBTOPICS:', marginX + 3, currentY + 5.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  const subtopicsStr = cleanPDFText(chapter.highlightedSubtopics.join('   -   '));
  const wrappedSubtopics = doc.splitTextToSize(subtopicsStr, contentWidth - 6);
  doc.text(wrappedSubtopics, marginX + 3, currentY + 10.5);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  const shiftText = cleanPDFText(`NTA Focus: ${chapter.pyqTrend.recentShiftFocus}`);
  const wrappedShift = doc.splitTextToSize(shiftText, contentWidth - 6);
  doc.text(wrappedShift, marginX + 3, currentY + 17.5);

  currentY += 27;

  // ==========================================
  // 3. CHAPTER NOTES & 4-COLOR HIGHLIGHT BOXES
  // ==========================================
  chapter.notesSections.forEach((section) => {
    ensureSpace(16);

    // Section Title Header
    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 2.5, 6, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanPDFText(section.title), marginX + 5, currentY + 4.8);
    currentY += 8.5;

    // Standard Theory Paragraphs (skip if revisionModeOnly)
    if (includeStandardTheory && !revisionModeOnly && section.standardTheory) {
      section.standardTheory.forEach((para) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const wrappedPara = doc.splitTextToSize(cleanPDFText(para), contentWidth);
        const paraHeight = wrappedPara.length * 3.8;
        ensureSpace(paraHeight + 3);
        doc.text(wrappedPara, marginX, currentY + 3);
        currentY += paraHeight + 3.5;
      });
    }

    // Highlight Callout Boxes
    if (section.highlightBoxes) {
      section.highlightBoxes.forEach((box) => {
        let boxBg: [number, number, number] = [255, 241, 242]; // rose-50
        let boxBorder: [number, number, number] = [244, 63, 94]; // rose-500
        let boxHeader = 'MOST REPEATED PYQ TOPIC (80% JEE Questions)';
        let headerColor: [number, number, number] = [190, 18, 60];

        if (box.type === 'formula') {
          boxBg = [240, 253, 244]; // emerald-50
          boxBorder = [16, 185, 129];
          boxHeader = 'FORMULA & SHORTCUT VAULT';
          headerColor = [4, 120, 87];
        } else if (box.type === 'ncert-line') {
          boxBg = [254, 252, 232]; // amber-50
          boxBorder = [245, 158, 11];
          boxHeader = 'DIRECT NCERT STATEMENT / EXCEPTION';
          headerColor = [180, 83, 9];
        } else if (box.type === 'trap') {
          boxBg = [250, 245, 255]; // purple-50
          boxBorder = [168, 85, 247];
          boxHeader = 'COMMON JEE TRAP / SILLY MISTAKE ALERT';
          headerColor = [126, 34, 206];
        }

        // Measure heights
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        const cleanedContent = cleanPDFText(box.content);
        const wrappedContent = doc.splitTextToSize(cleanedContent, contentWidth - 8);
        const contentHeight = wrappedContent.length * 3.6;

        const cleanedLatex = box.latex ? cleanLatexForPDF(box.latex) : '';
        const wrappedLatex = cleanedLatex ? doc.splitTextToSize(cleanedLatex, contentWidth - 12) : [];
        const latexBoxHeight = box.latex ? wrappedLatex.length * 3.6 + 4 : 0;

        const tipsHeight = box.extraTips ? box.extraTips.length * 3.4 : 0;

        const totalBoxHeight = 11 + contentHeight + latexBoxHeight + tipsHeight + 3;
        ensureSpace(totalBoxHeight + 4);

        // Draw Callout Box
        doc.setFillColor(...boxBg);
        doc.setDrawColor(...boxBorder);
        doc.setLineWidth(0.5);
        doc.roundedRect(marginX, currentY, contentWidth, totalBoxHeight, 2, 2, 'FD');

        // Header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.2);
        doc.setTextColor(...headerColor);
        doc.text(boxHeader, marginX + 4, currentY + 4.8);

        // Box Title
        doc.setFontSize(8.2);
        doc.setTextColor(15, 23, 42);
        doc.text(cleanPDFText(box.title), marginX + 4, currentY + 9);

        let innerY = currentY + 13;

        // Content
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.setTextColor(30, 41, 59);
        doc.text(wrappedContent, marginX + 4, innerY);
        innerY += contentHeight;

        // Formula pill if available
        if (box.latex) {
          innerY += 1.5;
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(203, 213, 225);
          doc.setLineWidth(0.2);
          doc.roundedRect(marginX + 4, innerY, contentWidth - 8, latexBoxHeight, 1, 1, 'FD');
          doc.setFont('courier', 'bold');
          doc.setFontSize(7.8);
          doc.setTextColor(...headerColor);
          doc.text(wrappedLatex, marginX + 6, innerY + 3.8);
          innerY += latexBoxHeight + 1.5;
        }

        // Tips
        if (box.extraTips && box.extraTips.length > 0) {
          innerY += 1;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.2);
          doc.setTextColor(71, 85, 105);
          box.extraTips.forEach((tip) => {
            const wrappedTip = doc.splitTextToSize(`- ${cleanPDFText(tip)}`, contentWidth - 10);
            doc.text(wrappedTip, marginX + 5, innerY);
            innerY += wrappedTip.length * 3.4;
          });
        }

        currentY += totalBoxHeight + 4.5;
      });
    }

    // Reaction or Derivation Steps
    if (section.flowchartOrDerivation) {
      const flow = section.flowchartOrDerivation;
      ensureSpace(16 + flow.steps.length * 6);

      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      const flowH = 8 + flow.steps.length * 6;
      doc.roundedRect(marginX, currentY, contentWidth, flowH, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(30, 41, 59);
      doc.text(`METHOD / DERIVATION: ${cleanPDFText(flow.title)}`, marginX + 4, currentY + 4.8);

      let stepY = currentY + 9;
      flow.steps.forEach((st) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.2);
        doc.setTextColor(...primaryColor);
        doc.text(`[${cleanPDFText(st.step)}]`, marginX + 4, stepY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.2);
        doc.setTextColor(51, 65, 85);
        const descText = st.formulaOrReaction ? `${st.desc} -- ${st.formulaOrReaction}` : st.desc;
        const wrappedStep = doc.splitTextToSize(cleanPDFText(descText), contentWidth - 22);
        doc.text(wrappedStep, marginX + 18, stepY);
        stepY += 6;
      });

      currentY += flowH + 4;
    }

    currentY += 3;
  });

  // ==========================================
  // 4. SOLVED PYQ ARCHETYPES
  // ==========================================
  if (includeArchetypes && chapter.solvedArchetypes && chapter.solvedArchetypes.length > 0) {
    ensureSpace(18);
    currentY += 3;
    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 2.5, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`Top Solved PYQ Archetypes (${chapter.solvedArchetypes.length})`, marginX + 5, currentY + 4.8);
    currentY += 9;

    chapter.solvedArchetypes.forEach((arch) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      const wrappedQ = doc.splitTextToSize(cleanPDFText(arch.question), contentWidth - 8);
      const qHeight = wrappedQ.length * 3.6;

      const stepsHeight = arch.solutionSteps.length * 3.8;
      const wrappedTrap = doc.splitTextToSize(cleanPDFText(arch.ntaTrapOrShortcut), contentWidth - 10);
      const trapHeight = wrappedTrap.length * 3.4;

      const totalArchHeight = 15 + qHeight + stepsHeight + trapHeight + 7;
      ensureSpace(totalArchHeight);

      // Card frame
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, currentY, contentWidth, totalArchHeight, 2, 2, 'FD');

      // Archetype Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(...primaryColor);
      doc.text(`Archetype #${arch.number} (${cleanPDFText(arch.yearTag)})`, marginX + 4, currentY + 4.8);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.2);
      doc.setTextColor(100, 116, 139);
      doc.text(`Concept: ${cleanPDFText(arch.conceptTested)}`, marginX + 4, currentY + 8.5);

      // Question Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(marginX + 3, currentY + 10.5, contentWidth - 6, qHeight + 3.5, 1, 1, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(wrappedQ, marginX + 5, currentY + 13.5);

      let archY = currentY + 16.5 + qHeight;

      // Solution Steps
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      doc.setTextColor(71, 85, 105);
      doc.text('Methodical Solution Steps:', marginX + 4, archY);
      archY += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(30, 41, 59);
      arch.solutionSteps.forEach((step) => {
        const wrappedStep = doc.splitTextToSize(`- ${cleanPDFText(step)}`, contentWidth - 8);
        doc.text(wrappedStep, marginX + 4, archY);
        archY += wrappedStep.length * 3.6;
      });

      // NTA Trap & Speed Shortcut Box
      archY += 1.5;
      doc.setFillColor(254, 243, 199);
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.3);
      doc.roundedRect(marginX + 3, archY, contentWidth - 6, trapHeight + 5, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(180, 83, 9);
      doc.text('NTA Trap & Shortcut:', marginX + 5, archY + 3.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text(wrappedTrap, marginX + 5, archY + 7);

      archY += trapHeight + 7.5;

      // Final Answer
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(16, 185, 129);
      doc.text(`Final Answer: ${cleanPDFText(arch.answer)}`, marginX + 4, archY);

      currentY += totalArchHeight + 4.5;
    });
  }

  // ==========================================
  // 5. NCERT HIDDEN GEMS & EXCEPTIONS
  // ==========================================
  if (includeNCERTGems && chapter.ncertGems && chapter.ncertGems.length > 0) {
    ensureSpace(18);
    currentY += 3;
    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 2.5, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`NCERT Hidden Gems & Tables (${chapter.ncertGems.length})`, marginX + 5, currentY + 4.8);
    currentY += 9;

    chapter.ncertGems.forEach((gem) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.8);
      const wrappedStmt = doc.splitTextToSize(`"${cleanPDFText(gem.statement)}"`, contentWidth - 10);
      const stmtHeight = wrappedStmt.length * 3.6;

      const reasonText = cleanPDFText(`Why NTA Asks This: ${gem.importanceReason}`);
      const wrappedReason = doc.splitTextToSize(reasonText, contentWidth - 10);
      const reasonHeight = wrappedReason.length * 3.4;
      const totalGemHeight = 11 + stmtHeight + reasonHeight + 4;

      ensureSpace(totalGemHeight);

      doc.setFillColor(254, 252, 232);
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, currentY, contentWidth, totalGemHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(180, 83, 9);
      doc.text(`${cleanPDFText(gem.title)}  (${cleanPDFText(gem.tableOrPageRef)})`, marginX + 4, currentY + 4.8);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.text(wrappedStmt, marginX + 5, currentY + 9);

      const rY = currentY + 11 + stmtHeight;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(wrappedReason, marginX + 5, rY);

      currentY += totalGemHeight + 4;
    });
  }

  // ==========================================
  // 6. MUST-SOLVE CHECKLIST & PERSONAL NOTES
  // ==========================================
  if (includeChecklist || (includePersonalNotes && userState?.personalNotes)) {
    ensureSpace(28);
    currentY += 3;

    doc.setFillColor(...primaryColor);
    doc.rect(marginX, currentY, 2.5, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Checklist & Personal Notes', marginX + 5, currentY + 4.8);
    currentY += 9;

    // Checklist
    if (includeChecklist && chapter.mustSolveChecklist) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(71, 85, 105);
      doc.text('Must-Solve Subtopic Checklist:', marginX, currentY + 2.5);
      currentY += 5.5;

      chapter.mustSolveChecklist.forEach((task, idx) => {
        const isDone = userState?.completedChecklistIds?.includes(`task-${idx}`);
        ensureSpace(5.5);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.2);
        doc.setTextColor(isDone ? 16 : 51, isDone ? 185 : 65, isDone ? 129 : 85);
        const taskText = cleanPDFText(task);
        const checkPrefix = isDone ? '[X] ' : '[ ] ';
        const wrappedTask = doc.splitTextToSize(`${checkPrefix}${taskText}`, contentWidth - 6);
        doc.text(wrappedTask, marginX + 3, currentY + 2);
        currentY += wrappedTask.length * 3.8;
      });
      currentY += 3;
    }

    // Personal Scratchpad notes
    if (includePersonalNotes && userState?.personalNotes && userState.personalNotes.trim()) {
      ensureSpace(22);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);

      const cleanedNotes = cleanPDFText(userState.personalNotes);
      const wrappedNotes = doc.splitTextToSize(cleanedNotes, contentWidth - 8);
      const notesH = wrappedNotes.length * 3.6 + 9;
      doc.roundedRect(marginX, currentY, contentWidth, notesH, 2, 2, 'FD');

      doc.text('My Chapter Scratchpad / Student Notes:', marginX + 4, currentY + 5);
      doc.setFont('courier', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(51, 65, 85);
      doc.text(wrappedNotes, marginX + 4, currentY + 9.5);
      currentY += notesH + 4;
    }
  }

  // ==========================================
  // 7. RUNNING HEADERS & FOOTERS (PAGE X OF Y)
  // ==========================================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Running Header (pages > 1)
    if (i > 1) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(
        cleanPDFText(
          `JEE Nexus • Class ${chapter.classLevel} ${chapter.subject.toUpperCase()} • Ch ${chapter.chapterNumber}: ${chapter.title}`
        ),
        marginX,
        8.5
      );
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(marginX, 10.5, pageWidth - marginX, 10.5);
    }

    // Running Footer (all pages)
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 10, pageWidth - marginX, pageHeight - 10);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'JEE Nexus — NCERT & High-Yield Study Portal (Print-Friendly Notes Generated with jsPDF)',
      marginX,
      pageHeight - 6.5
    );

    doc.setFont('helvetica', 'bold');
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - marginX - 16, pageHeight - 6.5);
  }

  return doc;
}

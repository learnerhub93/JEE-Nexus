import test from 'node:test';
import assert from 'node:assert/strict';

test('Syllabus Data Integrity', async (t) => {
  const { ALL_CHAPTERS } = await import('../src/data/chaptersData.ts');

  await t.test('has complete 60+ PCM chapters', () => {
    assert.ok(ALL_CHAPTERS.length >= 60, `Expected at least 60 chapters, found ${ALL_CHAPTERS.length}`);
  });

  await t.test('all chapters have valid subjects', () => {
    const validSubjects = ['physics', 'chemistry', 'mathematics'];
    for (const ch of ALL_CHAPTERS) {
      assert.ok(validSubjects.includes(ch.subject), `Invalid subject: ${ch.subject} in chapter ${ch.id}`);
      assert.ok(ch.classLevel === '11' || ch.classLevel === '12', `Invalid class: ${ch.classLevel}`);
      assert.ok(ch.title && ch.title.length > 0, `Missing title for ${ch.id}`);
      assert.ok(ch.highlightedSubtopics && ch.highlightedSubtopics.length > 0, `Missing subtopics for ${ch.id}`);
    }
  });

  await t.test('all chapter IDs are unique', () => {
    const ids = new Set();
    for (const ch of ALL_CHAPTERS) {
      assert.ok(!ids.has(ch.id), `Duplicate chapter ID found: ${ch.id}`);
      ids.add(ch.id);
    }
  });

  await t.test('has 6 flagship chapters with rich notes and archetypes', () => {
    const flagshipIds = [
      'phy-12-03-current-electricity',
      'phy-12-09-dual-nature-atoms-nuclei',
      'phy-11-06-system-of-particles-and-rotation',
      'phy-12-07-ray-optics',
      'chem-11-04-chemical-bonding',
      'chem-12-05-coordination-compounds',
      'chem-12-02-electrochemistry',
      'math-12-09-3d-geometry',
      'math-12-02-matrices-and-determinants',
      'math-12-05-integrals',
    ];

    for (const id of flagshipIds) {
      const ch = ALL_CHAPTERS.find((c) => c.id === id);
      assert.ok(ch, `Flagship chapter missing: ${id}`);
      assert.ok(ch.notesSections.length >= 2, `Expected multiple note sections for ${id}`);
      assert.ok(ch.solvedArchetypes.length >= 1, `Expected solved archetypes for ${id}`);
      assert.ok(ch.flashcards.length >= 2, `Expected flashcards for ${id}`);
      assert.ok(ch.mustSolveChecklist.length >= 4, `Expected checklist for ${id}`);

      // Verify 4 purple JEE traps and 5 red PYQ concepts for target chapters
      if (['phy-12-07-ray-optics', 'chem-12-02-electrochemistry', 'math-12-05-integrals'].includes(id)) {
        const traps = ch.notesSections.flatMap(s => s.highlightBoxes || []).filter(b => b.type === 'trap');
        const pyqs = ch.notesSections.flatMap(s => s.highlightBoxes || []).filter(b => b.type === 'most-repeated');
        const formulas = ch.notesSections.flatMap(s => s.highlightBoxes || []).filter(b => b.type === 'formula');
        assert.ok(traps.length >= 4, `Expected at least 4 purple traps in ${id}, got ${traps.length}`);
        assert.ok(pyqs.length >= 5, `Expected at least 5 red PYQs in ${id}, got ${pyqs.length}`);
        assert.ok(formulas.length >= 4, `Expected at least 4 green formulas in ${id}, got ${formulas.length}`);
      }
    }
  });

  await t.test('formula extractor successfully extracts formulas from chapters', async () => {
    const { extractFormulasFromChapter, getAllFormulas } = await import('../src/utils/formulaExtractor.ts');
    const ch = ALL_CHAPTERS.find((c) => c.id === 'phy-12-03-current-electricity');
    assert.ok(ch);
    const formulas = extractFormulasFromChapter(ch);
    assert.ok(formulas.length >= 3, `Expected at least 3 formulas for Current Electricity, got ${formulas.length}`);
    for (const f of formulas) {
      assert.ok(f.latex && f.latex.length > 0, `Formula missing latex`);
      assert.ok(f.title && f.title.length > 0, `Formula missing title`);
    }

    const all = getAllFormulas(ALL_CHAPTERS);
    assert.ok(all.length >= 30, `Expected at least 30 formulas in total syllabus, got ${all.length}`);
  });

  await t.test('jsPDF generates valid multi-page chapter document', async () => {
    const { generateChapterPDF } = await import('../src/utils/pdfGenerator.ts');
    const ch = ALL_CHAPTERS.find((c) => c.id === 'phy-12-03-current-electricity');
    assert.ok(ch);

    const doc = generateChapterPDF(ch, {
      status: 'in_progress',
      isBookmarked: true,
      isWeakTopic: false,
      personalNotes: 'Remember delta-star bridge transformation',
      completedChecklistIds: ['task-0', 'task-1'],
      updatedAt: Date.now(),
    });

    assert.ok(doc, 'Expected jsPDF document to be created');
    const pageCount = doc.getNumberOfPages();
    assert.ok(pageCount >= 1, `Expected at least 1 page, got ${pageCount}`);
  });

  await t.test('practice PYQ questions exist and are valid for all chapters', async () => {
    const { getChapterPracticePYQs, CURATED_CHAPTER_PRACTICE_PYQS } = await import('../src/data/practicePYQData.ts');

    // Test curated flagship chapters
    const flagshipIds = [
      'phy-12-03-current-electricity',
      'phy-12-09-dual-nature-atoms-nuclei',
      'phy-11-06-system-of-particles-and-rotation',
      'chem-11-04-chemical-bonding',
      'chem-12-05-coordination-compounds',
      'math-12-09-3d-geometry',
      'math-12-02-matrices-and-determinants',
    ];

    for (const id of flagshipIds) {
      assert.ok(CURATED_CHAPTER_PRACTICE_PYQS[id], `Missing curated PYQs for flagship chapter ${id}`);
      const pyqs = CURATED_CHAPTER_PRACTICE_PYQS[id];
      assert.ok(pyqs.length >= 3, `Expected at least 3 curated questions for ${id}, got ${pyqs.length}`);
      
      for (const q of pyqs) {
        assert.ok(q.question && q.question.length > 10, `Invalid question text in ${q.id}`);
        assert.equal(q.options.length, 4, `Expected 4 options in ${q.id}`);
        assert.ok(['A', 'B', 'C', 'D'].includes(q.correctOption), `Invalid correctOption in ${q.id}`);
        assert.ok(q.solutionSteps.length >= 2, `Expected solution steps in ${q.id}`);
        assert.ok(q.shortcutMethod && q.shortcutMethod.length > 5, `Expected shortcut method in ${q.id}`);
      }
    }

    // Verify all 61 chapters produce 3 to 5 questions
    for (const ch of ALL_CHAPTERS) {
      const pyqs = getChapterPracticePYQs(ch);
      assert.ok(pyqs.length >= 3 && pyqs.length <= 5, `Expected 3-5 questions for ${ch.id}, got ${pyqs.length}`);
      for (const q of pyqs) {
        assert.ok(['A', 'B', 'C', 'D'].includes(q.correctOption));
        assert.equal(q.options.length, 4);
      }
    }
  });

  await t.test('Formula & Exceptions Vault extracts green formulas and yellow NCERT exceptions', async () => {
    const { getAllVaultItems, extractVaultItemsFromChapter } = await import('../src/utils/formulaExtractor.ts');
    
    // Test whole syllabus
    const allItems = getAllVaultItems(ALL_CHAPTERS);
    assert.ok(allItems.length >= 50, `Expected at least 50 vault items, got ${allItems.length}`);

    const formulas = allItems.filter((i) => i.itemType === 'formula');
    const ncertExceptions = allItems.filter((i) => i.itemType === 'ncert-exception');

    assert.ok(formulas.length >= 30, `Expected at least 30 green formulas, got ${formulas.length}`);
    assert.ok(ncertExceptions.length >= 15, `Expected at least 15 yellow NCERT exceptions, got ${ncertExceptions.length}`);

    // Verify all subjects covered
    const physicsItems = allItems.filter((i) => i.subject === 'physics');
    const chemistryItems = allItems.filter((i) => i.subject === 'chemistry');
    const mathsItems = allItems.filter((i) => i.subject === 'mathematics');

    assert.ok(physicsItems.length >= 10, `Expected at least 10 physics items, got ${physicsItems.length}`);
    assert.ok(chemistryItems.length >= 10, `Expected at least 10 chemistry items, got ${chemistryItems.length}`);
    assert.ok(mathsItems.length >= 10, `Expected at least 10 maths items, got ${mathsItems.length}`);

    // Verify item fields
    for (const item of allItems) {
      assert.ok(item.id, `Item missing id`);
      assert.ok(item.title, `Item missing title`);
      assert.ok(['formula', 'ncert-exception'].includes(item.itemType), `Invalid itemType: ${item.itemType}`);
      assert.ok(['physics', 'chemistry', 'mathematics'].includes(item.subject), `Invalid subject: ${item.subject}`);
      assert.ok(item.chapterId, `Item missing chapterId`);
      assert.ok(item.chapterTitle, `Item missing chapterTitle`);
      if (item.itemType === 'formula') {
        assert.ok(item.latex && item.latex.length > 0, `Formula item missing LaTeX: ${item.id}`);
      }
      if (item.itemType === 'ncert-exception') {
        assert.ok(item.content && item.content.length > 0, `NCERT exception missing content: ${item.id}`);
      }
    }
  });

  await t.test('Active Recall Flashcards & Mnemonics has 25+ high-yield cards across PCM', async () => {
    const { HIGH_YIELD_ACTIVE_RECALL_CARDS, getChapterRecallCards } = await import('../src/data/flashcardsData.ts');

    assert.ok(
      HIGH_YIELD_ACTIVE_RECALL_CARDS.length >= 25,
      `Expected at least 25 active recall flashcards, got ${HIGH_YIELD_ACTIVE_RECALL_CARDS.length}`
    );

    const phy = HIGH_YIELD_ACTIVE_RECALL_CARDS.filter((c) => c.subject === 'physics');
    const chem = HIGH_YIELD_ACTIVE_RECALL_CARDS.filter((c) => c.subject === 'chemistry');
    const math = HIGH_YIELD_ACTIVE_RECALL_CARDS.filter((c) => c.subject === 'mathematics');

    assert.ok(phy.length >= 6, `Expected at least 6 Physics flashcards, got ${phy.length}`);
    assert.ok(chem.length >= 10, `Expected at least 10 Chemistry flashcards, got ${chem.length}`);
    assert.ok(math.length >= 6, `Expected at least 6 Maths flashcards, got ${math.length}`);

    for (const card of HIGH_YIELD_ACTIVE_RECALL_CARDS) {
      assert.ok(card.id, `Card missing id`);
      assert.ok(card.prompt && card.prompt.length > 10, `Card missing valid prompt: ${card.id}`);
      assert.ok(card.answer && card.answer.length > 5, `Card missing valid answer: ${card.id}`);
      assert.ok(card.mnemonic && card.mnemonic.length > 5, `Card missing mnemonic: ${card.id}`);
    }

    // Verify chapter-level recall cards extraction
    const rayOptics = ALL_CHAPTERS.find((c) => c.id === 'phy-12-07-ray-optics');
    assert.ok(rayOptics);
    const chapterCards = getChapterRecallCards(rayOptics);
    assert.ok(chapterCards.length >= 3, `Expected at least 3 recall cards for Ray Optics, got ${chapterCards.length}`);
  });

  await t.test('MathText parseMathSegments accurately parses inline $...$ and block $$...$$ equations', async () => {
    const { parseMathSegments } = await import('../src/components/MathText.tsx');

    const sample = 'Under electric field $\\vec{E}$, drift velocity is $$\\vec{v}_d = -\\frac{e\\vec{E}\\tau}{m}$$ where $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$.';
    const segments = parseMathSegments(sample);

    assert.equal(segments.length, 7);
    assert.deepEqual(segments[0], { type: 'text', content: 'Under electric field ' });
    assert.deepEqual(segments[1], { type: 'inline-math', content: '\\vec{E}' });
    assert.deepEqual(segments[2], { type: 'text', content: ', drift velocity is ' });
    assert.deepEqual(segments[3], { type: 'block-math', content: '\\vec{v}_d = -\\frac{e\\vec{E}\\tau}{m}' });
    assert.deepEqual(segments[4], { type: 'text', content: ' where ' });
    assert.deepEqual(segments[5], { type: 'inline-math', content: '\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}' });
    assert.deepEqual(segments[6], { type: 'text', content: '.' });
  });

  await t.test('Modular subject files (physicsNotes, chemistryNotes, mathsNotes) export valid subject chapters', async () => {
    const { PHYSICS_NOTES, physicsNotes } = await import('../src/data/physicsNotes.ts');
    const { CHEMISTRY_NOTES, chemistryNotes } = await import('../src/data/chemistryNotes.ts');
    const { MATHS_NOTES, mathsNotes } = await import('../src/data/mathsNotes.ts');

    assert.equal(PHYSICS_NOTES, physicsNotes);
    assert.equal(CHEMISTRY_NOTES, chemistryNotes);
    assert.equal(MATHS_NOTES, mathsNotes);

    assert.ok(PHYSICS_NOTES.length >= 20, `Expected at least 20 Physics chapters, got ${PHYSICS_NOTES.length}`);
    assert.ok(CHEMISTRY_NOTES.length >= 20, `Expected at least 20 Chemistry chapters, got ${CHEMISTRY_NOTES.length}`);
    assert.ok(MATHS_NOTES.length >= 20, `Expected at least 20 Maths chapters, got ${MATHS_NOTES.length}`);

    assert.ok(PHYSICS_NOTES.every((ch) => ch.subject === 'physics'), 'All PHYSICS_NOTES chapters must have subject === "physics"');
    assert.ok(CHEMISTRY_NOTES.every((ch) => ch.subject === 'chemistry'), 'All CHEMISTRY_NOTES chapters must have subject === "chemistry"');
    assert.ok(MATHS_NOTES.every((ch) => ch.subject === 'mathematics'), 'All MATHS_NOTES chapters must have subject === "mathematics"');

    assert.equal(
      ALL_CHAPTERS.length,
      PHYSICS_NOTES.length + CHEMISTRY_NOTES.length + MATHS_NOTES.length,
      'ALL_CHAPTERS must equal the sum of PHYSICS_NOTES, CHEMISTRY_NOTES, and MATHS_NOTES'
    );
  });
});





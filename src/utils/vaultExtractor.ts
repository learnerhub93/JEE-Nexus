import { Chapter, Subject, ClassLevel } from '../types';
import { CURATED_NCERT_EXCEPTIONS } from '../data/ncertExceptionsData';

export type VaultCategory = 'all' | 'formula' | 'ncert-exception';

export interface VaultItem {
  id: string;
  itemType: 'formula' | 'ncert-exception';
  title: string;
  content: string;
  latex?: string;
  extraTips?: string[];
  ncertReference?: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  subject: Subject;
  classLevel: ClassLevel;
  sectionTitle: string;
  isHighRepeat: boolean;
}

/**
 * Clean title of icons/emojis and repetitive prefixes
 */
function cleanTitle(title: string): string {
  return title
    .replace(/^(?:🔥|📐|⚠️|📘|⚡|⭐|🟡|🟢|🔴|🟣)\s*/g, '')
    .replace(/^Master Formula Vault:\s*/i, '')
    .replace(/^Direct NCERT (?:Statement|Exception|Line):\s*/i, '')
    .replace(/^NTA Favorite:\s*/i, '')
    .replace(/^Common Student Trap:\s*/i, '')
    .trim();
}

/**
 * Extracts all 🟢 Green Formula boxes and 🟡 Yellow NCERT Exception highlights
 * from a given chapter.
 */
export function extractVaultItemsFromChapter(chapter: Chapter): VaultItem[] {
  const items: VaultItem[] = [];

  // 1. Extract from note sections highlight boxes
  chapter.notesSections?.forEach((section, sIdx) => {
    section.highlightBoxes?.forEach((box, bIdx) => {
      // 🟢 Green Formula Box
      if (box.type === 'formula') {
        items.push({
          id: `${chapter.id}-sec-${sIdx}-formula-${bIdx}`,
          itemType: 'formula',
          title: cleanTitle(box.title),
          content: box.content,
          latex: box.latex || '',
          extraTips: box.extraTips,
          chapterId: chapter.id,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.title,
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          sectionTitle: section.title,
          isHighRepeat: chapter.repeatPriority === 'high',
        });
      }

      // 🟡 Yellow NCERT Exception / Line Box
      if (box.type === 'ncert-line') {
        items.push({
          id: `${chapter.id}-sec-${sIdx}-ncert-${bIdx}`,
          itemType: 'ncert-exception',
          title: cleanTitle(box.title),
          content: box.content,
          latex: box.latex,
          extraTips: box.extraTips,
          ncertReference: `NCERT Class ${chapter.classLevel} - Ch ${chapter.chapterNumber}`,
          chapterId: chapter.id,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.title,
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          sectionTitle: section.title,
          isHighRepeat: chapter.repeatPriority === 'high',
        });
      }
    });
  });

  // 2. Extract from ncertGems if not already covered
  chapter.ncertGems?.forEach((gem, gIdx) => {
    const exists = items.some((it) => it.title.toLowerCase() === gem.title.toLowerCase());
    if (!exists) {
      items.push({
        id: `${chapter.id}-gem-${gIdx}`,
        itemType: 'ncert-exception',
        title: cleanTitle(gem.title),
        content: gem.statement,
        ncertReference: gem.tableOrPageRef || `NCERT Class ${chapter.classLevel}`,
        extraTips: [gem.importanceReason],
        chapterId: chapter.id,
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.title,
        subject: chapter.subject,
        classLevel: chapter.classLevel,
        sectionTitle: 'NCERT Direct Exceptions & Lines',
        isHighRepeat: chapter.repeatPriority === 'high',
      });
    }
  });

  // 3. Extract formula items from flashcards with latex if chapter didn't produce formula boxes
  const hasFormula = items.some((it) => it.itemType === 'formula');
  if (!hasFormula && chapter.flashcards) {
    chapter.flashcards.forEach((fc, fcIdx) => {
      if (fc.latex) {
        items.push({
          id: `${chapter.id}-fc-formula-${fcIdx}`,
          itemType: 'formula',
          title: cleanTitle(fc.question),
          content: fc.answer,
          latex: fc.latex,
          ncertReference: fc.ncertReference,
          chapterId: chapter.id,
          chapterNumber: chapter.chapterNumber,
          chapterTitle: chapter.title,
          subject: chapter.subject,
          classLevel: chapter.classLevel,
          sectionTitle: 'High-Yield Formula',
          isHighRepeat: chapter.repeatPriority === 'high',
        });
      }
    });
  }

  // 4. Merge curated NCERT exceptions specifically tied to this chapter
  const curatedMatches = CURATED_NCERT_EXCEPTIONS.filter((item) => item.chapterId === chapter.id);
  curatedMatches.forEach((curated) => {
    const alreadyExists = items.some(
      (it) => it.title.toLowerCase() === curated.title.toLowerCase() || it.id === curated.id
    );
    if (!alreadyExists) {
      items.push(curated);
    }
  });

  return items;
}

/**
 * Aggregates all formula and NCERT exception items across all chapters
 */
export function getAllVaultItems(chapters: Chapter[]): VaultItem[] {
  const all: VaultItem[] = [];
  const seenIds = new Set<string>();

  chapters.forEach((ch) => {
    const chapterItems = extractVaultItemsFromChapter(ch);
    chapterItems.forEach((item) => {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        all.push(item);
      }
    });
  });

  // Also include any curated exceptions whose chapter might not be loaded or filtered in current subset if chapters contains it
  CURATED_NCERT_EXCEPTIONS.forEach((curated) => {
    const chapterExists = chapters.some((ch) => ch.id === curated.chapterId);
    if (chapterExists && !seenIds.has(curated.id)) {
      seenIds.add(curated.id);
      all.push(curated);
    }
  });

  return all;
}

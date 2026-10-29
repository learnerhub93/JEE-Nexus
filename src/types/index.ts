export type Subject = 'physics' | 'chemistry' | 'mathematics';
export type ClassLevel = '11' | '12';
export type RepeatPriority = 'high' | 'medium' | 'foundation';
export type ChapterStatus = 'not_started' | 'in_progress' | 'mastered';
export type ChemistryBranch = 'physical' | 'inorganic' | 'organic' | 'general';

export interface SolvedArchetype {
  number: number;
  question: string;
  yearTag: string; // e.g. "JEE Main 2024 / 2022 Repeats"
  conceptTested: string;
  solutionSteps: string[];
  ntaTrapOrShortcut: string;
  answer: string;
}

export interface HighlightBoxData {
  type: 'most-repeated' | 'formula' | 'ncert-line' | 'trap';
  title: string;
  content: string;
  latex?: string;
  extraTips?: string[];
}

export interface FormulaItem {
  id: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  subject: Subject;
  classLevel: ClassLevel;
  title: string;
  latex: string;
  explanation?: string;
  tips?: string[];
  isHighRepeat?: boolean;
}

export interface ReactionOrDerivation {
  title: string;
  description?: string;
  steps: Array<{
    step: string;
    desc: string;
    formulaOrReaction?: string;
  }>;
}

export interface NoteSection {
  id: string;
  title: string;
  standardTheory?: string[];
  highlightBoxes?: HighlightBoxData[];
  flowchartOrDerivation?: ReactionOrDerivation;
}

export type FlashcardCategory =
  | 'physics_formula'
  | 'physics_concept'
  | 'inorganic_exception'
  | 'organic_reaction'
  | 'maths_identity'
  | 'general_mnemonic';

export interface ActiveRecallCard {
  id: string;
  subject: Subject;
  classLevel: ClassLevel;
  chapterId: string;
  chapterTitle: string;
  category: FlashcardCategory;
  categoryLabel: string;
  prompt: string;
  promptContext?: string;
  answer: string;
  latex?: string;
  mnemonic: string;
  explanation?: string;
  tags: string[];
  highYieldBadge?: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  latex?: string;
  tag: string;
  ncertReference?: string;
  mnemonic?: string;
  category?: FlashcardCategory;
  explanation?: string;
}

export interface NCERTGem {
  id: string;
  title: string;
  statement: string;
  tableOrPageRef: string;
  importanceReason: string;
}

export interface Chapter {
  id: string;
  subject: Subject;
  classLevel: ClassLevel;
  chapterNumber: number;
  title: string;
  ncertName: string;
  repeatPriority: RepeatPriority;
  repeatTagText: string; // e.g. "🔥 High Repeat (2–3 Qs/Shift)"
  avgQuestions: string; // e.g. "2 to 3 Questions per Shift"
  expectedWeightage: string; // e.g. "8–12 Marks"
  branch?: ChemistryBranch;
  highlightedSubtopics: string[];
  pyqTrend: {
    avgQuestions5Yr: number;
    difficulty: 'Easy' | 'Moderate' | 'Tough';
    marksPercentage: string;
    topRepeatedConcepts: string[];
    recentShiftFocus: string;
  };
  mustSolveChecklist: string[];
  notesSections: NoteSection[];
  solvedArchetypes: SolvedArchetype[];
  ncertGems: NCERTGem[];
  flashcards: Flashcard[];
  practicePYQs?: PracticePYQ[];
}

export interface PracticePYQOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  latex?: string;
}

export interface PracticePYQ {
  id: string;
  questionNumber: number;
  yearTag: string;
  conceptTested: string;
  question: string;
  latexQuestion?: string;
  options: PracticePYQOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  solutionSteps: string[];
  shortcutMethod: string;
  trapAlert?: string;
  ncertReference?: string;
}

export interface UserChapterState {
  status: ChapterStatus;
  isBookmarked: boolean;
  isWeakTopic: boolean;
  personalNotes: string;
  completedChecklistIds: string[];
  practiceQuizAnswers?: Record<string, 'A' | 'B' | 'C' | 'D'>;
  updatedAt: number;
}

export interface FilterState {
  subject: 'all' | Subject;
  classLevel: 'all' | ClassLevel;
  repeatPriority: 'all' | RepeatPriority;
  status: 'all' | ChapterStatus;
  chemistryBranch: 'all' | ChemistryBranch;
  weakOnly: boolean;
  searchQuery: string;
}

export interface TimerState {
  mode: 'pomodoro' | 'break' | 'exam_stamina';
  durationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

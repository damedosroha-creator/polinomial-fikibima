export type QuestionType = 'PG' | 'PGK' | 'BS';
export type DifficultyLevel = 'Pemanasan' | 'Menengah' | 'Menantang';

export interface Stimulus {
  type: 'context' | 'table' | 'graph' | 'error_analysis' | 'experiment';
  title: string;
  contextText: string;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  graphData?: {
    type: 'cubic' | 'quadratic' | 'quartic' | 'rational';
    title: string;
    points: { x: number; y: number; label?: string }[];
    xRange: [number, number];
    yRange: [number, number];
    curvePoints: { x: number; y: number }[];
    equationLatex?: string;
  };
  visualTableau?: {
    divisorRoot: number | string;
    coefficients: (number | string)[];
    multiplications: (number | string)[];
    results: (number | string)[];
    remainderIndex: number;
    notes?: string;
  };
  spokenStimulus: string;
}

export interface OptionItem {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  latex?: string;
  spokenText?: string;
}

export interface StatementItem {
  id: number; // 1 | 2 | 3
  statement: string;
  latex?: string;
  spokenStatement?: string;
  correctIsBenar: boolean;
  explanation: string;
}

export interface ExplanationSevenParts {
  aMemahamiMasalah: string;
  bKonsepMatematika: string;
  cRumusKunci: string;
  dLangkahPerhitungan: string;
  eHasilAkhir: string;
  fKesimpulan: string;
  gCaraCepatMisterJo: string;
  spokenSummary: string;
}

export interface Question {
  id: number; // 1 to 25
  materialId: number; // 1 to 5
  materialTitle: string;
  submaterial: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  stimulus: Stimulus;
  questionText: string;
  questionLatex?: string;
  spokenQuestion: string;
  // For PG and PGK
  options?: OptionItem[];
  correctPg?: string; // e.g. 'B'
  correctPgk?: string[]; // e.g. ['A', 'C', 'D']
  // For BS
  statements?: StatementItem[];
  // Progressive Hints
  hints: {
    hint1Identifikasi: string;
    hint2Rumus: string;
    hint3Langkah: string;
  };
  keyFormulaRef: string;
  caraCepatMisterJo: {
    title: string;
    explanation: string;
    spokenText: string;
  };
  explanation: ExplanationSevenParts;
}

export interface UserAnswerState {
  questionId: number;
  type: QuestionType;
  pgSelected?: string;
  pgkSelected?: string[];
  bsSelected?: Record<number, boolean>; // statementId -> true (Benar) / false (Salah)
  isSubmitted: boolean;
  isCorrect?: boolean;
  scoreEarned: number; // 0 to 1
  partialScoreDetail?: string;
  hintsUnlockedCount: number; // 0, 1, 2, 3
  isBookmarked: boolean;
  viewedExplanation: boolean;
  viewedCaraCepat: boolean;
  submittedAt?: string;
}

export interface AppProgress {
  currentQuestionIndex: number;
  answers: Record<number, UserAnswerState>;
  lastActiveTab: string;
  totalTimeSpentSeconds: number;
  lastUpdated: string;
}

export type MasteryCategory = 
  | 'MASTER POLINOMIAL'
  | 'SANGAT BAIK'
  | 'BAIK'
  | 'PERLU LATIHAN'
  | 'AYO BELAJAR LAGI';

export interface EvaluationResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  totalCorrect: number;
  totalPartial: number;
  totalWrong: number;
  totalUnanswered: number;
  masteryCategory: MasteryCategory;
  categoryDescription: string;
  materialScores: {
    materialId: number;
    title: string;
    correctCount: number;
    totalCount: number;
    score: number;
    percentage: number;
  }[];
  weaknesses: string[];
  recommendations: string[];
  misterJoMessage: string;
}

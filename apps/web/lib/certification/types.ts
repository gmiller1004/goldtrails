export type QuizSlug = "week-1" | "week-2" | "week-3" | "week-4" | "final";

export type QuestionType = "true_false" | "multiple_choice";

export type QuizChoice = {
  id: string;
  label: string;
};

/** Full question including answer key — server-only. */
export type QuizQuestion = {
  id: string;
  type: QuestionType;
  prompt: string;
  choices: QuizChoice[];
  /** Choice id of the correct answer */
  correctChoiceId: string;
};

/** Safe for the browser — no answer key. */
export type PublicQuizQuestion = Omit<QuizQuestion, "correctChoiceId">;

export type QuizDefinition = {
  slug: QuizSlug;
  title: string;
  subtitle: string;
  week: number | null;
  /** Pass threshold as a fraction, e.g. 0.8 */
  passPercent: number;
  questions: QuizQuestion[];
};

export type PublicQuiz = {
  slug: QuizSlug;
  title: string;
  subtitle: string;
  week: number | null;
  passPercent: number;
  questionCount: number;
  questions: PublicQuizQuestion[];
};

export type QuizAnswerMap = Record<string, string>;

export type QuizGradeResult = {
  slug: QuizSlug;
  total: number;
  correct: number;
  percent: number;
  passed: boolean;
  passPercent: number;
  /** questionId → whether answer was correct */
  results: Record<string, boolean>;
};

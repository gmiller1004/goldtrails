import "server-only";

import { getQuiz, isQuizSlug, QUIZ_SLUGS } from "./quizzes";
import type {
  PublicQuiz,
  QuizAnswerMap,
  QuizGradeResult,
  QuizSlug,
} from "./types";

export { isQuizSlug, QUIZ_SLUGS };
export type { PublicQuiz, QuizAnswerMap, QuizGradeResult, QuizSlug };

export function getPublicQuiz(slug: QuizSlug): PublicQuiz {
  const quiz = getQuiz(slug);
  return {
    slug: quiz.slug,
    title: quiz.title,
    subtitle: quiz.subtitle,
    week: quiz.week,
    passPercent: quiz.passPercent,
    questionCount: quiz.questions.length,
    questions: quiz.questions.map(({ correctChoiceId: _correct, ...publicQuestion }) => publicQuestion),
  };
}

export function gradeQuiz(slug: QuizSlug, answers: QuizAnswerMap): QuizGradeResult {
  const quiz = getQuiz(slug);
  const results: Record<string, boolean> = {};
  let correct = 0;

  for (const question of quiz.questions) {
    const selected = answers[question.id];
    const isCorrect = selected === question.correctChoiceId;
    results[question.id] = isCorrect;
    if (isCorrect) correct += 1;
  }

  const total = quiz.questions.length;
  const percent = total === 0 ? 0 : correct / total;
  const passed = percent >= quiz.passPercent;

  return {
    slug,
    total,
    correct,
    percent,
    passed,
    passPercent: quiz.passPercent,
    results,
  };
}

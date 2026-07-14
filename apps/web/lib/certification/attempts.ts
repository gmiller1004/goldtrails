import { getDb } from "@/lib/db";
import type { QuizAnswerMap, QuizSlug } from "@/lib/certification/types";

export type QuizAttemptRecord = {
  id: string;
  enrollment_id: string;
  quiz_slug: string;
  correct_count: number;
  total_count: number;
  percent: number;
  passed: boolean;
  created_at: string;
};

export async function recordQuizAttempt(input: {
  enrollmentId: string;
  quizSlug: QuizSlug;
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  answers: QuizAnswerMap;
  results: Record<string, boolean>;
}): Promise<QuizAttemptRecord> {
  const sql = getDb();
  const rows = (await sql`
    INSERT INTO certification_quiz_attempts (
      enrollment_id,
      quiz_slug,
      correct_count,
      total_count,
      percent,
      passed,
      answers,
      results
    )
    VALUES (
      ${input.enrollmentId},
      ${input.quizSlug},
      ${input.correct},
      ${input.total},
      ${input.percent},
      ${input.passed},
      ${JSON.stringify(input.answers)}::jsonb,
      ${JSON.stringify(input.results)}::jsonb
    )
    RETURNING
      id,
      enrollment_id,
      quiz_slug,
      correct_count,
      total_count,
      percent::float8 AS percent,
      passed,
      created_at::text
  `) as QuizAttemptRecord[];

  const row = rows[0];
  if (!row) {
    throw new Error("Failed to record quiz attempt.");
  }
  return row;
}

/** Whether this enrollment has ever passed a given quiz. */
export async function hasPassedQuiz(enrollmentId: string, quizSlug: QuizSlug): Promise<boolean> {
  const sql = getDb();
  const rows = (await sql`
    SELECT 1
    FROM certification_quiz_attempts
    WHERE enrollment_id = ${enrollmentId}
      AND quiz_slug = ${quizSlug}
      AND passed = true
    LIMIT 1
  `) as Array<{ "?column?": number }>;

  return rows.length > 0;
}

/** Map of quiz_slug → true if enrollment has ever passed that quiz. */
export async function getPassedQuizSlugs(enrollmentId: string): Promise<Set<string>> {
  const sql = getDb();
  const rows = (await sql`
    SELECT DISTINCT quiz_slug
    FROM certification_quiz_attempts
    WHERE enrollment_id = ${enrollmentId}
      AND passed = true
  `) as Array<{ quiz_slug: string }>;

  return new Set(rows.map((row) => row.quiz_slug));
}

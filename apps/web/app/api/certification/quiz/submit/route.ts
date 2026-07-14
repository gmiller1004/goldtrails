import { NextResponse } from "next/server";
import { z } from "zod";
import { getPassedQuizSlugs, recordQuizAttempt } from "@/lib/certification/attempts";
import { getEnrollmentByToken } from "@/lib/certification/enrollments";
import { gradeQuiz, isQuizSlug } from "@/lib/certification/server";
import { syncCertificationQuizProgressToKlaviyo } from "@/lib/klaviyo";

const submitSchema = z.object({
  slug: z.string(),
  token: z.string().min(1, "A valid enrollment token is required."),
  answers: z.record(z.string(), z.string()),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid quiz submission.";
    return NextResponse.json({ success: false, error: firstError }, { status: 400 });
  }

  const { slug, token, answers } = parsed.data;
  if (!isQuizSlug(slug)) {
    return NextResponse.json({ success: false, error: "Unknown quiz." }, { status: 404 });
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      { success: false, error: "Quiz tracking is not configured yet." },
      { status: 500 },
    );
  }

  const enrollment = await getEnrollmentByToken(token.trim());
  if (!enrollment) {
    return NextResponse.json(
      {
        success: false,
        error:
          "This quiz link is invalid or expired. Open the link from your certification email, or re-enroll to get a fresh link.",
      },
      { status: 401 },
    );
  }

  const result = gradeQuiz(slug, answers);

  try {
    await recordQuizAttempt({
      enrollmentId: enrollment.id,
      quizSlug: slug,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      passed: result.passed,
      answers,
      results: result.results,
    });
  } catch (error) {
    console.error("[certification/quiz/submit] Failed to record attempt:", error);
    return NextResponse.json(
      { success: false, error: "Could not save your quiz result. Please try again." },
      { status: 502 },
    );
  }

  let passedSlugs: string[] = [];
  try {
    const passed = await getPassedQuizSlugs(enrollment.id);
    passedSlugs = Array.from(passed);
  } catch (error) {
    console.error("[certification/quiz/submit] Failed to load pass status:", error);
  }

  const klaviyoResult = await syncCertificationQuizProgressToKlaviyo({
    email: enrollment.email,
    firstName: enrollment.first_name,
    lastName: enrollment.last_name,
    quizSlug: slug,
    percent: result.percent,
    passed: result.passed,
    passedSlugs,
  });

  if (!klaviyoResult.ok) {
    // Attempt is saved — don't fail the learner UX on a Klaviyo blip.
    console.error(
      "[certification/quiz/submit] Klaviyo sync failed:",
      klaviyoResult.status,
      klaviyoResult.message,
    );
  }

  return NextResponse.json({
    success: true,
    result: {
      slug: result.slug,
      total: result.total,
      correct: result.correct,
      percent: result.percent,
      passed: result.passed,
      passPercent: result.passPercent,
      results: result.results,
    },
  });
}

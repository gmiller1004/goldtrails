import { NextResponse } from "next/server";
import { z } from "zod";
import { gradeQuiz, isQuizSlug } from "@/lib/certification/server";

const submitSchema = z.object({
  slug: z.string(),
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
    return NextResponse.json({ success: false, error: "Invalid quiz submission." }, { status: 400 });
  }

  const { slug, answers } = parsed.data;
  if (!isQuizSlug(slug)) {
    return NextResponse.json({ success: false, error: "Unknown quiz." }, { status: 404 });
  }

  const result = gradeQuiz(slug, answers);

  return NextResponse.json({
    success: true,
    result: {
      slug: result.slug,
      total: result.total,
      correct: result.correct,
      percent: result.percent,
      passed: result.passed,
      passPercent: result.passPercent,
      // Per-question correctness (not the answer key) so the UI can highlight misses.
      results: result.results,
    },
  });
}

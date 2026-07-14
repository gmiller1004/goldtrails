import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificationQuizForm } from "@/components/certification/certification-quiz-form";
import { hasPassedQuiz } from "@/lib/certification/attempts";
import { getEnrollmentByToken } from "@/lib/certification/enrollments";
import { getPublicQuiz, isQuizSlug, QUIZ_SLUGS } from "@/lib/certification/server";
import { pageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string }>;
};

export function generateStaticParams() {
  return QUIZ_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isQuizSlug(slug)) {
    return pageMetadata({
      title: "Certification Quiz",
      description: "GPAA Metal Detecting Certification quiz.",
      path: `/certification/quiz/${slug}`,
    });
  }

  const quiz = getPublicQuiz(slug);
  return pageMetadata({
    title: `${quiz.title} — ${quiz.subtitle}`,
    description: `Take the ${quiz.title} for the GPAA Metal Detecting Certification program.`,
    path: `/certification/quiz/${slug}`,
  });
}

function MissingTokenState({ quizTitle }: { quizTitle: string }) {
  return (
    <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-[#1a140f]">Open your email quiz link</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
        To save progress for <strong>{quizTitle}</strong>, use the personalized button in your
        certification email. That link identifies your enrollment so we can record your score.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f]">
        Haven&apos;t enrolled yet? Start free certification and we&apos;ll send the lesson plan (with
        quiz links as you go).
      </p>
      <Link
        href="/new-home#certification"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold !text-primary-foreground no-underline hover:bg-primary/90"
      >
        Go to certification signup
      </Link>
    </div>
  );
}

function InvalidTokenState() {
  return (
    <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-[#1a140f]">This quiz link isn&apos;t valid</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
        The token in your URL doesn&apos;t match an enrollment. Use the link from your latest
        certification email, or re-enroll with the same email to refresh your token on file.
      </p>
      <Link
        href="/new-home#certification"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold !text-primary-foreground no-underline hover:bg-primary/90"
      >
        Go to certification signup
      </Link>
    </div>
  );
}

export default async function CertificationQuizPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { token: rawToken } = await searchParams;
  if (!isQuizSlug(slug)) notFound();

  const quiz = getPublicQuiz(slug);
  const token = rawToken?.trim() ?? "";

  let enrollment: Awaited<ReturnType<typeof getEnrollmentByToken>> | null = null;
  let alreadyPassed = false;
  let lookupError: "missing" | "invalid" | "db" | null = null;

  if (!token) {
    lookupError = "missing";
  } else if (!process.env.DATABASE_URL?.trim()) {
    lookupError = "db";
  } else {
    try {
      enrollment = await getEnrollmentByToken(token);
      if (!enrollment) {
        lookupError = "invalid";
      } else {
        alreadyPassed = await hasPassedQuiz(enrollment.id, slug);
      }
    } catch (error) {
      console.error("[certification/quiz] enrollment lookup failed:", error);
      lookupError = "db";
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
          GPAA Metal Detecting Certification
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{quiz.title}</h1>
        <p className="mt-2 text-base text-[#5c4f3f] sm:text-lg">{quiz.subtitle}</p>
        <p className="mt-4 text-sm leading-relaxed text-[#6d7760]">
          Answer each question based on the lessons in your certification emails. A score of 80%+
          helps qualify you for certification
          {quiz.slug === "final" ? " when combined with your weekly quizzes" : ""}.
        </p>

        <div className="mt-8">
          {lookupError === "missing" ? (
            <MissingTokenState quizTitle={quiz.title} />
          ) : lookupError === "invalid" ? (
            <InvalidTokenState />
          ) : lookupError === "db" ? (
            <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 text-sm text-[#5c4f3f] shadow-sm">
              Quiz tracking is temporarily unavailable. Please try again in a few minutes.
            </div>
          ) : enrollment && token ? (
            <CertificationQuizForm
              quiz={quiz}
              token={token}
              learnerName={enrollment.first_name}
              alreadyPassed={alreadyPassed}
            />
          ) : null}
        </div>

        <p className="mt-10 text-center text-xs text-[#6d7760]">
          <Link
            href="/new-home#certification"
            className="!text-[#5a6348] underline-offset-2 hover:underline"
          >
            Back to certification
          </Link>
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CertificationQuizForm } from "@/components/certification/certification-quiz-form";
import { getPublicQuiz, isQuizSlug, QUIZ_SLUGS } from "@/lib/certification/server";
import { pageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
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

export default async function CertificationQuizPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isQuizSlug(slug)) notFound();

  const quiz = getPublicQuiz(slug);

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
          <CertificationQuizForm quiz={quiz} />
        </div>

        <p className="mt-10 text-center text-xs text-[#6d7760]">
          <Link href="/new-home#certification" className="!text-[#5a6348] underline-offset-2 hover:underline">
            Back to certification
          </Link>
        </p>
      </div>
    </div>
  );
}

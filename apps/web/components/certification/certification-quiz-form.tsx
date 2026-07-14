"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { PublicQuiz } from "@/lib/certification/types";

type GradePayload = {
  slug: string;
  total: number;
  correct: number;
  percent: number;
  passed: boolean;
  passPercent: number;
  results: Record<string, boolean>;
};

type CertificationQuizFormProps = {
  quiz: PublicQuiz;
  token: string;
  learnerName?: string | null;
  alreadyPassed?: boolean;
};

export function CertificationQuizForm({
  quiz,
  token,
  learnerName,
  alreadyPassed = false,
}: CertificationQuizFormProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [grade, setGrade] = useState<GradePayload | null>(null);

  const answeredCount = useMemo(
    () => quiz.questions.filter((question) => Boolean(answers[question.id])).length,
    [answers, quiz.questions],
  );

  const allAnswered = answeredCount === quiz.questions.length;
  const passPercentLabel = Math.round(quiz.passPercent * 100);
  const greeting = learnerName?.trim() ? learnerName.trim() : null;

  const onSelect = (questionId: string, choiceId: string) => {
    if (grade) return;
    setAnswers((current) => ({ ...current, [questionId]: choiceId }));
  };

  const onSubmit = async () => {
    if (!allAnswered) {
      toast.error("Please answer every question before submitting.");
      return;
    }

    setIsSubmitting(true);
    trackEvent("certification_quiz_submit", { slug: quiz.slug });

    try {
      const response = await fetch("/api/certification/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: quiz.slug, token, answers }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        result?: GradePayload;
      };

      if (!response.ok || !data.success || !data.result) {
        throw new Error(data.error ?? "Could not score quiz.");
      }

      setGrade(data.result);
      trackEvent("certification_quiz_scored", {
        slug: quiz.slug,
        passed: data.result.passed,
        percent: Math.round(data.result.percent * 100),
      });

      if (data.result.passed) {
        toast.success("Nice work — you passed this quiz. Your progress is saved.");
      } else {
        toast.message("Not quite — review the misses and try again.");
      }
    } catch (error) {
      trackEvent("certification_quiz_failure", { slug: quiz.slug });
      toast.error(
        error instanceof Error ? error.message : "Could not score your quiz right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRetry = () => {
    setAnswers({});
    setGrade(null);
    trackEvent("certification_quiz_retry", { slug: quiz.slug });
  };

  if (grade) {
    const percentLabel = Math.round(grade.percent * 100);
    return (
      <div className="rounded-2xl border border-[#d0d5c4] bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Results</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-[#1a140f] sm:text-3xl">
          {grade.passed ? "You passed" : "Keep practicing"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
          You scored <strong className="text-[#1a140f]">{grade.correct}</strong> of{" "}
          <strong className="text-[#1a140f]">{grade.total}</strong> ({percentLabel}%). Passing is{" "}
          {passPercentLabel}% or higher.
        </p>
        {grade.passed ? (
          <p className="mt-2 text-sm text-[#5a6348]">
            This result is saved to your certification progress.
          </p>
        ) : null}

        <ul className="mt-6 space-y-3">
          {quiz.questions.map((question, index) => {
            const ok = grade.results[question.id];
            return (
              <li
                key={question.id}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm",
                  ok
                    ? "border-[#c5d0b8] bg-[#eef0e8] text-[#3d4535]"
                    : "border-[#e8d4a8] bg-[#fbf6ea] text-[#5c4f3f]",
                )}
              >
                <span className="font-semibold">
                  {ok ? "Correct" : "Missed"} — Q{index + 1}
                </span>
                <span className="mt-1 block leading-relaxed">{question.prompt}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {!grade.passed ? (
            <Button type="button" onClick={onRetry} className={cn(nhGoldButtonClass, "px-6 py-3")}>
              Retake quiz
            </Button>
          ) : null}
          <Link
            href="/new-home#certification"
            className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline hover:bg-[#efe4cf]"
          >
            Back to certification
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {alreadyPassed ? (
        <div className="rounded-2xl border border-[#c5d0b8] bg-[#eef0e8] p-5 text-sm text-[#3d4535]">
          {greeting ? `Nice work, ${greeting} — y` : "Y"}ou&apos;ve already passed this quiz. You can
          retake it for practice; your pass stays on record.
        </div>
      ) : greeting ? (
        <div className="rounded-2xl border border-[#d0d5c4] bg-white p-5 text-sm text-[#5c4f3f] shadow-sm">
          Welcome back, <strong className="text-[#1a140f]">{greeting}</strong>. Your answers will be
          saved to your certification progress.
        </div>
      ) : null}

      <div className="rounded-2xl border border-[#d0d5c4] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm text-[#5c4f3f]">
          Answer all {quiz.questionCount} questions. Passing score:{" "}
          <strong className="text-[#1a140f]">{passPercentLabel}%</strong>.
        </p>
        <p className="mt-1 text-xs text-[#6d7760]">
          Progress: {answeredCount} / {quiz.questionCount} answered
        </p>
      </div>

      <ol className="space-y-5">
        {quiz.questions.map((question, index) => (
          <li
            key={question.id}
            className="rounded-2xl border border-[#d0d5c4] bg-white p-5 shadow-sm sm:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6348]">
              Question {index + 1}
            </p>
            <p className="mt-2 text-base font-medium leading-relaxed text-[#1a140f] sm:text-lg">
              {question.prompt}
            </p>
            <fieldset className="mt-4 space-y-2">
              <legend className="sr-only">Answer choices for question {index + 1}</legend>
              {question.choices.map((choice) => {
                const selected = answers[question.id] === choice.id;
                return (
                  <label
                    key={choice.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition-colors sm:text-base",
                      selected
                        ? "border-[#5a6348] bg-[#eef0e8]"
                        : "border-[#e0d4b3] bg-[#f7f2e8]/40 hover:border-[#c4b59a]",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.id}
                      checked={selected}
                      onChange={() => onSelect(question.id, choice.id)}
                      className="mt-1"
                    />
                    <span className="leading-relaxed text-[#1a140f]">
                      <span className="font-semibold uppercase text-[#5a6348]">{choice.id}.</span>{" "}
                      {choice.label}
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="sticky bottom-0 border-t border-[#d0d5c4] bg-[#f7f2e8]/95 py-4 backdrop-blur">
        <Button
          type="button"
          disabled={isSubmitting || !allAnswered}
          onClick={onSubmit}
          className={cn(nhGoldButtonClass, "w-full px-6 py-3 text-base sm:w-auto")}
        >
          {isSubmitting ? "Scoring…" : "Submit quiz"}
        </Button>
        {!allAnswered ? (
          <p className="mt-2 text-xs text-[#6d7760]">Answer every question to enable submit.</p>
        ) : null}
      </div>
    </div>
  );
}

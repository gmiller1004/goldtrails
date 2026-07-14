import "server-only";

import type { QuizDefinition, QuizSlug } from "./types";

/** True/False choices use A/B so all quizzes share the same option labeling. */
const tf = () => [
  { id: "a", label: "True" },
  { id: "b", label: "False" },
];

/**
 * Full quiz bank with answer keys. Import only from server code / route handlers.
 * Client pages use `getPublicQuiz` which strips `correctChoiceId`.
 */
export const quizzes: Record<QuizSlug, QuizDefinition> = {
  "week-1": {
    slug: "week-1",
    title: "Week 1 Quiz",
    subtitle: "Detector Fundamentals & Ground Reality",
    week: 1,
    passPercent: 0.8,
    questions: [
      {
        id: "w1-q1",
        type: "true_false",
        prompt:
          "The ground itself (mineralization, hot rocks, etc.) is typically the largest “target” your detector will encounter.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w1-q2",
        type: "multiple_choice",
        prompt: "What is the most reliable way to check small-target performance in real conditions?",
        choices: [
          { id: "a", label: "Air testing high above the coil" },
          { id: "b", label: "Using a vial of fine gold flakes on a table" },
          {
            id: "c",
            label: "Swinging a single solid confidence piece with the coil on actual ground",
          },
          { id: "d", label: "Relying only on factory depth claims" },
        ],
        correctChoiceId: "c",
      },
      {
        id: "w1-q3",
        type: "true_false",
        prompt:
          "Higher frequency detectors are generally better suited for tiny shallow targets like small gold pickers and fine jewelry.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w1-q4",
        type: "multiple_choice",
        prompt: "When your detector becomes noisy or confusing, the best first step is usually:",
        choices: [
          { id: "a", label: "Crank all settings to maximum" },
          {
            id: "b",
            label: "Perform a factory reset, then set threshold, ground balance, and sensitivity",
          },
          { id: "c", label: "Ignore it and hunt faster" },
          { id: "d", label: "Buy new coils immediately" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w1-q5",
        type: "true_false",
        prompt:
          "Leaving your cell phone on nearby can reduce depth and create false signals due to electromagnetic interference.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w1-q6",
        type: "multiple_choice",
        prompt: "The ripple principle describes:",
        choices: [
          { id: "a", label: "Only advanced multi-frequency machines" },
          {
            id: "b",
            label:
              "The basic transmit signal into the ground, eddy currents in metal, and return signal to the coil",
          },
          { id: "c", label: "Only pulse induction (PI) detectors" },
          { id: "d", label: "Discrimination settings only" },
        ],
        correctChoiceId: "b",
      },
    ],
  },

  "week-2": {
    slug: "week-2",
    title: "Week 2 Quiz",
    subtitle: "Core Settings Mastery",
    week: 2,
    passPercent: 0.8,
    questions: [
      {
        id: "w2-q1",
        type: "true_false",
        prompt: "Sensitivity controls how strongly the detector transmits signals into the ground.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "w2-q2",
        type: "multiple_choice",
        prompt: "The correct process for setting sensitivity in your hunting ground is:",
        choices: [
          { id: "a", label: "Always run it at maximum" },
          {
            id: "b",
            label:
              "Start low, raise until chatter begins, then back off 1–2 steps for stable threshold",
          },
          { id: "c", label: "Copy settings from online videos" },
          { id: "d", label: "Ignore it after factory presets" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w2-q3",
        type: "true_false",
        prompt:
          "A proper threshold (faint steady hum) should be turned completely off to avoid distraction.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "w2-q4",
        type: "multiple_choice",
        prompt: "Ground balancing primarily does what?",
        choices: [
          { id: "a", label: "Makes hot rocks louder" },
          {
            id: "b",
            label: "Cancels the ground’s signal so real targets stand out clearly",
          },
          { id: "c", label: "Increases maximum depth on all machines equally" },
          { id: "d", label: "Replaces the need for coil control" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w2-q5",
        type: "true_false",
        prompt: "You should re-check ground balance after digging a target or when the ground type changes.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w2-q6",
        type: "multiple_choice",
        prompt: "Which supporting control helps reset faster between close targets in trashy areas?",
        choices: [
          { id: "a", label: "Iron bias (high)" },
          { id: "b", label: "Recovery speed (faster)" },
          { id: "c", label: "Threshold (off)" },
          { id: "d", label: "Sensitivity (maximum)" },
        ],
        correctChoiceId: "b",
      },
    ],
  },

  "week-3": {
    slug: "week-3",
    title: "Week 3 Quiz",
    subtitle: "Practical Field Skills",
    week: 3,
    passPercent: 0.8,
    questions: [
      {
        id: "w3-q1",
        type: "true_false",
        prompt:
          "Keeping the coil flat and sliding on the ground is one of the most important skills for maximum depth.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w3-q2",
        type: "multiple_choice",
        prompt: "Good coil control includes:",
        choices: [
          { id: "a", label: "Fast swings with no overlap" },
          { id: "b", label: "Slow speed, 50% overlap, coil level and on the dirt" },
          { id: "c", label: "Floating the coil 4–6 inches high" },
          { id: "d", label: "Looking only at the screen" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w3-q3",
        type: "true_false",
        prompt: "When you find one good target, you should immediately move on to cover more ground.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "w3-q4",
        type: "multiple_choice",
        prompt: "The recommended gridding pattern after a find is often:",
        choices: [
          { id: "a", label: "Random wandering" },
          {
            id: "b",
            label: "North-south then east-west passes with overlap, expanding as needed",
          },
          { id: "c", label: "Only spiral inward" },
          { id: "d", label: "Diagonal only" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w3-q5",
        type: "true_false",
        prompt:
          "For gold and relic hunting, all-metal mode (minimal or no discrimination) is usually preferred because natural gold can read unpredictably.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w3-q6",
        type: "multiple_choice",
        prompt: "The best response to a questionable but repeatable signal is:",
        choices: [
          { id: "a", label: "Ignore it if it doesn’t sound perfect" },
          { id: "b", label: "Dig it – especially if it repeats from multiple angles" },
          { id: "c", label: "Increase discrimination to filter it" },
          { id: "d", label: "Walk away immediately" },
        ],
        correctChoiceId: "b",
      },
    ],
  },

  "week-4": {
    slug: "week-4",
    title: "Week 4 Quiz",
    subtitle: "Recovery, Locations & Long-Term Success",
    week: 4,
    passPercent: 0.8,
    questions: [
      {
        id: "w4-q1",
        type: "true_false",
        prompt: "Filling and tamping every hole is optional on GPAA claims.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "w4-q2",
        type: "multiple_choice",
        prompt: "The two-scoop recovery method helps you:",
        choices: [
          { id: "a", label: "Isolate the target cleanly without large holes" },
          { id: "b", label: "Dig faster by ignoring pinpointing" },
          { id: "c", label: "Leave holes open" },
          { id: "d", label: "Skip logging finds" },
        ],
        correctChoiceId: "a",
      },
      {
        id: "w4-q3",
        type: "true_false",
        prompt:
          "GPAA/LDMA claims accessed via the Online Mining Guide provide exclusive legal areas with member reports for better planning.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w4-q4",
        type: "multiple_choice",
        prompt: "A smart daily maintenance habit after hunting is:",
        choices: [
          { id: "a", label: "Store with batteries installed long-term" },
          { id: "b", label: "Wipe down the shaft/coil and clean the coil cover" },
          { id: "c", label: "Leave it dirty in the truck" },
          { id: "d", label: "Skip coil covers" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "w4-q5",
        type: "true_false",
        prompt:
          "The 30-day plan recommends starting with backyard fundamentals before moving to real claims and gridding.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "w4-q6",
        type: "multiple_choice",
        prompt: "The “Zen” approach to better detecting emphasizes:",
        choices: [
          { id: "a", label: "High pressure to find something every time" },
          {
            id: "b",
            label: "Clear mind, focus on threshold and coil movement, no major distractions",
          },
          { id: "c", label: "Hunting only when tired" },
          { id: "d", label: "Ignoring ground changes" },
        ],
        correctChoiceId: "b",
      },
    ],
  },

  final: {
    slug: "final",
    title: "Comprehensive Final Quiz",
    subtitle: "GPAA Metal Detecting Certification",
    week: null,
    passPercent: 0.8,
    questions: [
      {
        id: "f-q1",
        type: "true_false",
        prompt:
          "The ground itself (mineralization, hot rocks, black sand, etc.) is typically the largest “target” your detector will encounter.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "f-q2",
        type: "multiple_choice",
        prompt: "The most reliable way to test small gold performance in real conditions is:",
        choices: [
          { id: "a", label: "Air testing high above the coil" },
          { id: "b", label: "Using a vial of fine gold flakes on a table" },
          {
            id: "c",
            label: "Swinging a single solid confidence piece with the coil on actual ground",
          },
          { id: "d", label: "Relying only on manufacturer depth ratings" },
        ],
        correctChoiceId: "c",
      },
      {
        id: "f-q3",
        type: "true_false",
        prompt:
          "Higher frequency detectors are generally better suited for very deep large relics in mild ground.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "f-q4",
        type: "multiple_choice",
        prompt: "When your detector feels noisy or confusing, the recommended first step is:",
        choices: [
          { id: "a", label: "Increase all settings to maximum" },
          {
            id: "b",
            label:
              "Perform a factory reset, then properly set threshold, ground balance, and sensitivity",
          },
          { id: "c", label: "Switch to a different mode without testing" },
          { id: "d", label: "Hunt faster to cover more ground" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "f-q5",
        type: "true_false",
        prompt: "A proper threshold should be turned completely off so you only hear loud signals.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "f-q6",
        type: "true_false",
        prompt: "Sensitivity primarily controls how strongly the signal is transmitted into the ground.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "f-q7",
        type: "multiple_choice",
        prompt: "The correct way to set sensitivity in your specific ground is:",
        choices: [
          { id: "a", label: "Always run it at maximum for best depth" },
          {
            id: "b",
            label:
              "Start low, raise until unstable, then back off 1–2 steps for a steady threshold",
          },
          { id: "c", label: "Copy settings from internet videos" },
          { id: "d", label: "Set it once and never adjust again" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "f-q8",
        type: "true_false",
        prompt:
          "Ground balancing makes the ground’s signal disappear so real metal targets stand out more clearly.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "f-q9",
        type: "multiple_choice",
        prompt: "Good coil control includes:",
        choices: [
          { id: "a", label: "Floating the coil several inches above the ground" },
          { id: "b", label: "Fast swings with minimal overlap" },
          {
            id: "c",
            label:
              "Keeping the coil flat, sliding on the dirt with slow swings and 50% overlap",
          },
          { id: "d", label: "Tipping the coil on its edge for better coverage" },
        ],
        correctChoiceId: "c",
      },
      {
        id: "f-q10",
        type: "true_false",
        prompt:
          "After finding one good target, you should immediately move on to a new area without gridding.",
        choices: tf(),
        correctChoiceId: "b",
      },
      {
        id: "f-q11",
        type: "multiple_choice",
        prompt: "For gold nugget and relic hunting, the preferred mode is usually:",
        choices: [
          { id: "a", label: "Maximum discrimination to quiet everything" },
          {
            id: "b",
            label: "All-metal mode (with minimal or careful discrimination)",
          },
          { id: "c", label: "Beach mode on all ground types" },
          { id: "d", label: "Factory coin shooting mode only" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "f-q12",
        type: "true_false",
        prompt:
          "If a signal is questionable but repeatable from multiple directions, it is usually best to dig it.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "f-q13",
        type: "multiple_choice",
        prompt: "Proper recovery technique includes:",
        choices: [
          { id: "a", label: "Leaving holes open for the next hunter" },
          {
            id: "b",
            label: "Pinpointing first, using the two-scoop method, and filling/tamping every hole",
          },
          { id: "c", label: "Digging large craters to be sure" },
          { id: "d", label: "Skipping the use of a magnet for iron junk" },
        ],
        correctChoiceId: "b",
      },
      {
        id: "f-q14",
        type: "true_false",
        prompt:
          "GPAA/LDMA claims and the Online Mining Guide are valuable member resources for legal access and recent hunt reports.",
        choices: tf(),
        correctChoiceId: "a",
      },
      {
        id: "f-q15",
        type: "multiple_choice",
        prompt: "The 30-day action plan recommends progressing through:",
        choices: [
          { id: "a", label: "Buying new equipment first, then hunting" },
          {
            id: "b",
            label:
              "Backyard fundamentals → test garden practice → real gridding → full hunts with logging and community",
          },
          { id: "c", label: "Only weekend hunts without preparation" },
          { id: "d", label: "Focusing solely on maximum sensitivity settings" },
        ],
        correctChoiceId: "b",
      },
    ],
  },
};

export const QUIZ_SLUGS = Object.keys(quizzes) as QuizSlug[];

export function isQuizSlug(value: string): value is QuizSlug {
  return value in quizzes;
}

export function getQuiz(slug: QuizSlug): QuizDefinition {
  return quizzes[slug];
}

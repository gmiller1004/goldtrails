import { eventVenues } from "@/lib/events/venues";

/** Public YouTube: What to Expect at a Gold Trails Event (Italian Bar). */
export const KEVIN_EVENTS_YOUTUBE_VIDEO_ID = "IX-8SYLmvC4";
export const KEVIN_EVENTS_YOUTUBE_URL = `https://youtu.be/${KEVIN_EVENTS_YOUTUBE_VIDEO_ID}`;

export const hubHeroPhoto = {
  src: "/italian-bar/detecting-class.jpg",
  alt: "Kevin Hoagland teaching a detecting class at Italian Bar",
} as const;

/** Location-agnostic reasons to attend, used on the /events hub. */
export const hubBenefits = [
  {
    title: "Learn from Kevin in person",
    description:
      "Live coaching from Kevin Hoagland — GPAA leader, Gold Trails host, and 55+ years in the field.",
  },
  {
    title: "Real ground, not a simulation",
    description:
      "Every event puts you on working gold ground — LDMA river camp in California, GPAA claims in Arizona.",
  },
  {
    title: "Beginner to advanced",
    description:
      "First time out or fine-tuning your coil — sessions meet you where you are and build skills you keep.",
  },
  {
    title: "Small groups",
    description: "Seats are capped so everyone gets hands-on time with coaching nearby.",
  },
  {
    title: "Classroom to dirt",
    description: "Concepts become muscle memory through drills you run in the field the same day.",
  },
  {
    title: "Leave with a handbook",
    description:
      "Every attendee gets a course handbook — a field textbook with room for notes — so the routines you learn go home with you.",
  },
] as const;

function membershipSummary(): string {
  const parts = eventVenues.map((venue) => {
    const label = `${venue.shortName} (${venue.stateName})`;
    if (venue.membership.kind === "required") {
      return `${label} requires an active GPAA membership because field sessions are on GPAA claims.`;
    }
    if (venue.membership.kind === "discount") {
      return `${label} is open to the public, with member pricing for GPAA and LDMA members.`;
    }
    return `${label} is open to everyone — no membership required.`;
  });
  return `It depends on the location. ${parts.join(" ")}`;
}

function locationsSummary(): string {
  const parts = eventVenues.map(
    (venue) => `the ${venue.programName} (${venue.shortName}, ${venue.stateName})`,
  );
  return `Gold Trails currently runs ${parts.join(" and ")}. Each location page covers the venue, schedule, lodging, and upcoming dates.`;
}

export const hubFaq = [
  { question: "Where are Gold Trails events held?", answer: locationsSummary() },
  { question: "Do I need GPAA or LDMA membership?", answer: membershipSummary() },
  {
    question: "How do I register?",
    answer:
      "Choose an upcoming session, select your event option, and complete checkout through our secure Shopify cart — the same flow as our shop.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Refunds are available when you request cancellation at least 7 days before the event start date. Requests inside that window help us cover committed costs and staffing.",
  },
  {
    question: "Will you add more locations?",
    answer:
      "Yes — Gold Trails is expanding. Join the notify list below and pick the states you're interested in so you hear about new dates first.",
  },
] as const;

export const venueSharedFaq = [hubFaq[2], hubFaq[3]] as const;

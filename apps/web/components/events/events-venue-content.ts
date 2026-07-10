export const KEVIN_EVENTS_VIDEO_URL =
  "https://cdn.shopify.com/videos/c/o/v/56a24afad22e47f0976e8c132d60f96b.mov";

export const italianBarPhotos = {
  hero: { src: "/italian-bar/italian-bar-2.jpg", alt: "Italian Bar camp on the Stanislaus River" },
  immersive: { src: "/italian-bar/camp-italian-bar.jpg", alt: "Gold Trails prospecting at Italian Bar camp" },
  gallery: [
    { src: "/italian-bar/italian-bar-1.jpg", alt: "Italian Bar camp along the Stanislaus River" },
    { src: "/italian-bar/italian-bar-3.jpg", alt: "Prospecting at Italian Bar" },
    { src: "/italian-bar/italian-bar-4.jpg", alt: "Italian Bar gold country" },
    { src: "/italian-bar/italian-bar-5.jpg", alt: "LDMA Italian Bar camp" },
  ],
  history: {
    src: "/italian-bar/george-massie-woody-italian-bar.png",
    alt: "George Massie at the original Italian Bar LDMA camp",
  },
} as const;

export const italianBarStats = [
  { value: "1977", label: "First LDMA camp" },
  { value: "160", label: "Patented acres" },
  { value: "River", label: "Stanislaus gold" },
  { value: "Mar–Oct", label: "Camp season" },
] as const;

export const eventBenefits = [
  {
    title: "Train in real gold country",
    description:
      "Work historic 1850s ground on the Stanislaus — panning, sluicing, highbanking, and metal detecting on the river and in camp.",
  },
  {
    title: "Hands-on with Kevin",
    description:
      "Live coaching across prospecting methods: reading water, running a sluice, highbanking setup, detector tones, and clean recovery.",
  },
  {
    title: "Beginner to advanced",
    description:
      "First time with a pan or fine-tuning your coil — sessions meet you where you are and build skills you can use on your own claims.",
  },
  {
    title: "Dry campsite included",
    description:
      "Stay on property at Italian Bar during the event. Arrive ready to learn and prospect without scrambling for lodging.",
  },
  {
    title: "Small-group field work",
    description:
      "Classroom concepts become river and dirt time — sampling, processing, detecting, and reading ground with coaching nearby.",
  },
  {
    title: "Leave with a playbook",
    description:
      "Build repeatable habits for research, sampling, and recovery so your next trip to the river or the patch starts stronger.",
  },
] as const;

export const nearbyPlaces = [
  { name: "Columbia", detail: "Restored 1851 gold rush town, ~6 miles south" },
  { name: "Sonora", detail: "Queen of the Southern Mines" },
  { name: "Yosemite", detail: "National park within day-trip range" },
] as const;

export type LodgingOption = {
  name: string;
  detail: string;
  href?: string;
};

export const nearbyLodging = {
  intro:
    "Italian Bar Road gets steep and narrow in the canyon — rigs over ~30 feet can be difficult. Many attendees stay on the dry campsites included with their event, but if you prefer full hookups or a hotel, Columbia and Sonora are a short drive from the turn-off.",
  columbia: {
    label: "Columbia",
    distance: "~6 miles from Italian Bar",
    campgrounds: [
      {
        name: "49er RV Ranch",
        detail: "Full-hookup RV park on Italian Bar Rd, closer to town and the historic park.",
        href: "https://49rv.com/",
      },
    ] satisfies LodgingOption[],
    hotels: [
      {
        name: "City Hotel & Fallon Hotel",
        detail: "Historic inns inside Columbia State Historic Park — unique gold rush lodging.",
        href: "https://www.parks.ca.gov/?page_id=552",
      },
      {
        name: "Columbia area inns & cottages",
        detail: "Additional small hotels and vacation rentals around the restored 1851 town.",
        href: "https://www.google.com/maps/search/hotels+near+Columbia+CA+95310",
      },
    ] satisfies LodgingOption[],
  },
  sonora: {
    label: "Sonora",
    distance: "~12 miles from Italian Bar",
    campgrounds: [
      {
        name: "Mother Lode Fairgrounds",
        detail: "Year-round RV camping with full hookups, showers, and Wi‑Fi — downtown Sonora.",
        href: "https://motherlodefair.org/facilities/rv-camping/",
      },
    ] satisfies LodgingOption[],
    hotels: [
      {
        name: "Sonora Gold Lodge",
        detail: "Motel near downtown and the fairgrounds — easy base for a daily drive to camp.",
        href: "https://www.google.com/maps/search/Sonora+Gold+Lodge+Sonora+CA",
      },
      {
        name: "Hotel Lumberjack",
        detail: "Downtown Sonora hotel with modern rooms and seasonal pool.",
        href: "https://www.hotellumberjack.com/",
      },
      {
        name: "Sonora area hotels",
        detail: "Additional chain and independent options along Hwy 108 / downtown.",
        href: "https://www.google.com/maps/search/hotels+Sonora+CA+95370",
      },
    ] satisfies LodgingOption[],
  },
} as const;

export const eventsFaq = [
  {
    question: "Where are Gold Trails events held?",
    answer:
      "All current Gold Trails hands-on training events are held at LDMA's Italian Bar camp near Columbia, California — 24997 Italian Bar Rd, Columbia, CA 95310. It's the association's first camp, on historic gold rush ground along the Stanislaus River.",
  },
  {
    question: "What prospecting methods are covered?",
    answer:
      "Sessions vary by date, but Gold Trails training often includes gold panning, sluicing, highbanking, and metal detecting — plus the field routines that tie them together. Check each event listing for the focus of that session.",
  },
  {
    question: "Is camping included?",
    answer:
      "Many events include dry campsite access on property at Italian Bar. Check the event option on each listing for what's included with your registration.",
  },
  {
    question: "What should I bring?",
    answer:
      "Comfortable field clothes, camp essentials if you're staying on site, and any gear you already own — pan, sluice, highbanker, or detector. Event details list session-specific recommendations; demo gear may be available for some activities.",
  },
  {
    question: "Do I need GPAA or LDMA membership?",
    answer:
      "No. While Italian Bar is a private LDMA campground, Gold Trails training events are open to the public — you do not need GPAA or LDMA membership to register.",
  },
  {
    question: "How do I register?",
    answer:
      "Choose an upcoming session below, select your event option, and complete checkout through our secure Shopify cart — the same flow as our shop.",
  },
] as const;

export const ITALIAN_BAR_ADDRESS = "24997 Italian Bar Rd, Columbia, CA 95310";
export const ITALIAN_BAR_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=24997+Italian+Bar+Rd,+Columbia,+CA+95310";
export const LDMA_ITALIAN_BAR_URL = "https://myldma.com/campgrounds/italian-bar-california";

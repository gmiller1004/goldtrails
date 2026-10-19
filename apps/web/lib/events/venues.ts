/**
 * Gold Trails event venues. Shopify owns sessions (dates, price, inventory); this registry owns
 * the venue story, logistics, and page content. Link a Shopify event product to a venue with the
 * `custom.venue` metafield (value = venue `slug`).
 */

export type VenuePhoto = { src: string; alt: string };

export type VenueLink = { label: string; href: string };

export type LodgingOption = {
  name: string;
  detail: string;
  href?: string;
};

export type LodgingArea = {
  label: string;
  distance?: string;
  groups: Array<{ label: string; options: LodgingOption[] }>;
};

export type VenueLocation = {
  label: string;
  name: string;
  address?: string;
  mapsUrl?: string;
  detail?: string;
  link?: VenueLink;
};

export type VenueScheduleBlock = {
  label: string;
  title: string;
  detail: string;
};

export type VenueScheduleDay = {
  label: string;
  note?: string;
  blocks: VenueScheduleBlock[];
};

export type VenueMembership = {
  /** open: anyone can register · discount: members get lower pricing · required: active GPAA membership needed. */
  kind: "open" | "discount" | "required";
  title: string;
  body: string;
  links: VenueLink[];
};

export type EventVenue = {
  slug: string;
  stateSlug: string;
  stateName: string;
  stateCode: string;
  /** Display name, e.g. "LDMA Italian Bar". */
  name: string;
  /** Short label for chips and cards, e.g. "Italian Bar". */
  shortName: string;
  /** City, ST label for chips. */
  locationLabel: string;
  timeZone: string;
  /** Lowercased substrings matched against Shopify `custom.location` when `custom.venue` is unset. */
  locationMatchers: string[];
  programName: string;
  formatLabel: string;
  summary: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    caption: string;
    chips: string[];
  };
  /** One-line context used on session detail pages. */
  sessionIntro: string;
  photos: {
    hero: VenuePhoto;
    immersive: VenuePhoto;
    gallery: VenuePhoto[];
    card: VenuePhoto;
  };
  stats: Array<{ value: string; label: string }>;
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    link?: VenueLink;
  };
  highlights?: {
    cards: Array<{ eyebrow: string; title: string; body: string }>;
    image?: VenuePhoto;
  };
  schedule?: {
    eyebrow: string;
    title: string;
    intro: string;
    days: VenueScheduleDay[];
    footnote?: string;
  };
  benefits: Array<{ title: string; description: string }>;
  immersive: { title: string; body: string };
  knowBeforeYouGo: Array<{ label: string; body: string; link?: VenueLink }>;
  lodging: {
    title: string;
    intro: string;
    areas: LodgingArea[];
    footnote: string;
  };
  locations: VenueLocation[];
  partnerLinks: VenueLink[];
  nearby: Array<{ name: string; detail: string }>;
  membership: VenueMembership;
  /** Short badge on session cards, e.g. "Dry Campsite Included". */
  cardBadge?: string;
  /** Extra chips on session detail pages. */
  sessionChips: string[];
  /** Gear attendees must bring, shown next to registration and on session cards. */
  gearRequirement?: { short: string; detail: string; link?: VenueLink };
  faq: Array<{ question: string; answer: string }>;
};

export const GPAA_JOIN_URL = "https://goldprospectors.org/join";
export const LDMA_MEMBERSHIP_URL = "https://myldma.com/memberships";

const italianBar: EventVenue = {
  slug: "italian-bar",
  stateSlug: "california",
  stateName: "California",
  stateCode: "CA",
  name: "LDMA Italian Bar",
  shortName: "Italian Bar",
  locationLabel: "Columbia, CA",
  timeZone: "America/Los_Angeles",
  locationMatchers: ["italian bar", "columbia", "motherlode", "mother lode"],
  programName: "Gold Trails Hands-On Training",
  formatLabel: "2 days · detecting + wet prospecting & geology",
  summary:
    "Two days at LDMA's original river camp on the Stanislaus — metal detecting plus wet prospecting and geology instruction, with a dry campsite and one group dinner included.",
  hero: {
    eyebrow: "Gold Trails Field Training · California",
    title: "Train at Italian Bar with Kevin Hoagland",
    subtitle:
      "Two days at LDMA's original river camp — metal detecting, panning and sluicing, and the geology that ties them together, on historic gold rush ground.",
    caption: "South Fork Stanislaus River · Mother Lode gold country",
    chips: ["Columbia, California", "LDMA Italian Bar", "Detect · Pan · Sluice", "Dry campsite + dinner included"],
  },
  sessionIntro:
    "Two days of metal detecting and wet prospecting with Kevin Hoagland at LDMA's Italian Bar — historic Mother Lode ground on the Stanislaus River near Columbia, California.",
  photos: {
    hero: { src: "/italian-bar/italian-bar-2.jpg", alt: "Italian Bar camp on the Stanislaus River" },
    immersive: { src: "/italian-bar/camp-italian-bar.jpg", alt: "Gold Trails prospecting at Italian Bar camp" },
    card: { src: "/italian-bar/italian-bar-1.jpg", alt: "Italian Bar camp along the Stanislaus River" },
    gallery: [
      { src: "/italian-bar/italian-bar-1.jpg", alt: "Italian Bar camp along the Stanislaus River" },
      { src: "/italian-bar/detecting-class.jpg", alt: "Detecting class outside the Italian Bar clubhouse" },
      { src: "/italian-bar/geology-walk.jpg", alt: "Geology instruction on the hillside at Italian Bar" },
      { src: "/italian-bar/cut-bank.jpg", alt: "Reading an exposed bank of gold-bearing gravel" },
    ],
  },
  stats: [
    { value: "1977", label: "First LDMA camp" },
    { value: "160", label: "Patented acres" },
    { value: "River", label: "Stanislaus gold" },
    { value: "Mar–Oct", label: "Camp season" },
  ],
  story: {
    eyebrow: "The venue",
    title: "Italian Bar — where LDMA began",
    paragraphs: [
      "The very first LDMA camp, built from the ground up in the 1970s on an 1850s gold rush site along the South Fork of the Stanislaus River. For decades, Italian Bar has been a destination for prospecting, camaraderie, and learning at the river.",
      "Gold Trails events use this real claim ground — not a classroom simulation. You'll swing a detector, pan and sluice the Stanislaus, and learn the geology that tells you where gold settles — with river access, camp amenities, and field time built in.",
    ],
    link: { label: "Explore Italian Bar on LDMA →", href: "https://myldma.com/campgrounds/italian-bar-california" },
  },
  highlights: {
    cards: [
      {
        eyebrow: "Then · 1850s",
        title: "River bar gold rush",
        body: "Thousands of prospectors worked Italian Bar and nearby diggings. Nervie's Store and the historic bar on the Stanislaus drew miners to one of the Mother Lode's richest stretches.",
      },
      {
        eyebrow: "Now · LDMA era",
        title: "Living prospecting camp",
        body: "160 patented acres with clubhouse, showers, campsites, and river access. Panning, sluicing, highbanking, detecting, and hands-on education — including Gold Trails sessions with Kevin Hoagland.",
      },
    ],
    image: {
      src: "/italian-bar/george-massie-woody-italian-bar.png",
      alt: "George Massie at the original Italian Bar LDMA camp",
    },
  },
  benefits: [
    {
      title: "Detecting + wet prospecting",
      description:
        "Two disciplines in one event: metal detecting on camp and claim ground, plus panning and sluicing on the Stanislaus.",
    },
    {
      title: "Geology that finds gold",
      description:
        "Learn how gold moves and settles in a river system so you know where to swing a coil and where to dig a sample.",
    },
    {
      title: "Hands-on with Kevin",
      description:
        "Live coaching across methods: reading water, running a sluice, detector tones, and clean recovery.",
    },
    {
      title: "Dry campsite included",
      description:
        "Stay on property at Italian Bar during the event. Arrive ready to learn and prospect without scrambling for lodging.",
    },
    {
      title: "Dinner with the group",
      description: "One group dinner is included — a chance to swap stories with Kevin and fellow prospectors.",
    },
    {
      title: "Beginner to advanced",
      description:
        "First time with a pan or fine-tuning your coil — sessions meet you where you are and build skills you can use on your own claims.",
    },
  ],
  immersive: {
    title: "This is not a passive seminar",
    body: "You'll be at the river and in the dirt — running pans and sluices, swinging a coil, reading the ground, and recovering gold with coaching nearby. Classroom concepts become muscle memory through drills you can take home.",
  },
  knowBeforeYouGo: [
    {
      label: "What's included",
      body: "Two days of detecting and wet prospecting instruction, a dry campsite on property, and one group dinner.",
    },
    { label: "Camp season", body: "Italian Bar is typically open March 15 through October 31." },
    {
      label: "Road access",
      body: "The canyon road is steep and narrow — rigs up to about 30 feet are recommended. Gravel for the last few miles into camp.",
    },
    { label: "On-site amenities", body: "Clubhouse, showers, restrooms, dump station, and community fire pit." },
    {
      label: "Prospecting",
      body: "River panning and sluicing; highbanking; designated areas for recirculating units and seasonal dry washing; metal detecting on camp and claim ground.",
    },
  ],
  lodging: {
    title: "Nearby campgrounds & hotels",
    intro:
      "Italian Bar Road gets steep and narrow in the canyon — rigs over ~30 feet can be difficult. Many attendees stay on the dry campsites included with their event, but if you prefer full hookups or a hotel, Columbia and Sonora are a short drive from the turn-off.",
    areas: [
      {
        label: "Columbia",
        distance: "~6 miles from Italian Bar",
        groups: [
          {
            label: "Campgrounds",
            options: [
              {
                name: "49er RV Ranch",
                detail: "Full-hookup RV park on Italian Bar Rd, closer to town and the historic park.",
                href: "https://49rv.com/",
              },
            ],
          },
          {
            label: "Hotels",
            options: [
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
            ],
          },
        ],
      },
      {
        label: "Sonora",
        distance: "~12 miles from Italian Bar",
        groups: [
          {
            label: "Campgrounds",
            options: [
              {
                name: "Mother Lode Fairgrounds",
                detail: "Year-round RV camping with full hookups, showers, and Wi‑Fi — downtown Sonora.",
                href: "https://motherlodefair.org/facilities/rv-camping/",
              },
            ],
          },
          {
            label: "Hotels",
            options: [
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
            ],
          },
        ],
      },
    ],
    footnote:
      "Availability and rates change — contact properties directly to book. Registration includes a dry campsite at Italian Bar.",
  },
  locations: [
    {
      label: "Location",
      name: "Italian Bar, California",
      address: "24997 Italian Bar Rd, Columbia, CA 95310",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=24997+Italian+Bar+Rd,+Columbia,+CA+95310",
    },
  ],
  partnerLinks: [{ label: "LDMA camp info", href: "https://myldma.com/campgrounds/italian-bar-california" }],
  nearby: [
    { name: "Columbia", detail: "Restored 1851 gold rush town, ~6 miles south" },
    { name: "Sonora", detail: "Queen of the Southern Mines" },
    { name: "Yosemite", detail: "National park within day-trip range" },
  ],
  membership: {
    kind: "open",
    title: "No membership required",
    body: "Italian Bar sessions are open to everyone at the same price. Want to keep prospecting after the event? GPAA and LDMA members get access to claims and camps nationwide.",
    links: [
      { label: "Join GPAA", href: GPAA_JOIN_URL },
      { label: "Join LDMA", href: LDMA_MEMBERSHIP_URL },
    ],
  },
  cardBadge: "Campsite + Dinner Included",
  sessionChips: ["Dry campsite included", "Dinner included"],
  faq: [
    {
      question: "Where is Italian Bar?",
      answer:
        "LDMA's Italian Bar camp is near Columbia, California — 24997 Italian Bar Rd, Columbia, CA 95310. It's the association's first camp, on historic gold rush ground along the Stanislaus River.",
    },
    {
      question: "What does the event cover?",
      answer:
        "Italian Bar sessions combine metal detecting with wet prospecting — panning and sluicing on the Stanislaus — plus the geology instruction that ties them together.",
    },
    {
      question: "What's included?",
      answer:
        "Two days of training with Kevin, a dry campsite on property at Italian Bar, and one group dinner.",
    },
    {
      question: "How much does it cost and how big is the group?",
      answer: "Registration is $400 per person, and each session is capped at 60 attendees.",
    },
    {
      question: "What should I bring?",
      answer:
        "Comfortable field clothes, camp essentials for your dry campsite, and any gear you already own — detector, pan, classifier, or sluice. Packing notes are sent with your registration confirmation.",
    },
    {
      question: "Do I need GPAA or LDMA membership?",
      answer:
        "No. While Italian Bar is a private LDMA campground, Gold Trails training events there are open to the public — you do not need GPAA or LDMA membership to register.",
    },
  ],
};

const MORRISTOWN_CLASSROOM_ADDRESS = "41037 W Grand Ave, Morristown, AZ 85342";
const MARICOPA_GROUP_URL =
  "https://www.goldprospectors.org/properties/d88bbada-d518-43e7-afef-ddc56bb68ee1";
const HOTEL_1899_URL = "https://1899historichotel.com/";

const morristown: EventVenue = {
  slug: "morristown",
  stateSlug: "arizona",
  stateName: "Arizona",
  stateCode: "AZ",
  name: "Morristown, Arizona",
  shortName: "Morristown",
  locationLabel: "Morristown, AZ",
  timeZone: "America/Phoenix",
  locationMatchers: ["morristown", "maricopa", "wickenburg", "arizona", ", az"],
  programName: "Metal Detecting Hands-On Masterclass",
  formatLabel: "2 days · classroom + GPAA claims · detecting",
  summary:
    "Two days of metal detecting with Kevin — mornings in the classroom at the 1899 Historic Hotel, afternoons on the Maricopa Group GPAA claims, plus an optional half day to hunt on your own.",
  hero: {
    eyebrow: "Metal Detecting Hands-On Masterclass · Arizona",
    title: "Metal detecting masterclass in Morristown, Arizona",
    subtitle:
      "Two days with Kevin Hoagland: mornings in the classroom at the historic 1899 Hotel, afternoons swinging a coil on the Maricopa Group GPAA claims — 15 minutes away.",
    caption: "Sonoran Desert gold country · Arizona",
    chips: ["Morristown, Arizona", "Classroom + claims", "Lunch included", "GPAA members", "Bring a gold detector"],
  },
  sessionIntro:
    "A two-day Metal Detecting Hands-On Masterclass with Kevin Hoagland — classroom mornings at the 1899 Historic Hotel in Morristown, afternoons on the Maricopa Group GPAA claims.",
  photos: {
    hero: {
      src: "/events/morristown/hero.jpg",
      alt: "Kevin Hoagland and detectorists among the saguaros in the Arizona desert",
    },
    immersive: { src: "/events/morristown/field.jpg", alt: "Recovering a target on red Arizona desert ground" },
    card: { src: "/events/morristown/card.jpg", alt: "Kevin Hoagland and detectorists in the Arizona desert" },
    gallery: [
      { src: "/events/morristown/gallery-1.jpg", alt: "Reading the ground on a desert hillside" },
      { src: "/events/morristown/gallery-2.jpg", alt: "Field coaching with Kevin Hoagland" },
      { src: "/events/morristown/gallery-3.jpg", alt: "Detectorist in the Sonoran Desert" },
      { src: "/events/morristown/gallery-4.jpg", alt: "Detectorists circled up for coaching" },
    ],
  },
  stats: [
    { value: "2 + ½", label: "Days of training" },
    { value: "30", label: "Seats per session" },
    { value: "120 ac", label: "GPAA claim ground" },
    { value: "15 min", label: "Classroom to claims" },
  ],
  story: {
    eyebrow: "The venue",
    title: "Classroom at the 1899 Historic Hotel",
    paragraphs: [
      "Mornings are held at the 1899 Historic Hotel in Morristown — a National Register landmark that once hosted travelers on their way to Castle Hot Springs by stagecoach, and later served as the town's general store, post office, and saloon.",
      "Afternoons move to the Maricopa Group — roughly 120 acres of GPAA claims about 15 minutes from the classroom. You'll take what you learned that morning straight to mineralized desert ground with Kevin coaching nearby.",
    ],
    link: { label: "See the Maricopa Group in the GPAA Property Guide →", href: MARICOPA_GROUP_URL },
  },
  highlights: {
    cards: [
      {
        eyebrow: "Mornings · Classroom",
        title: "Detector mastery, step by step",
        body: "Settings, threshold, ground balance, target tones, coil control, and the geology that tells you where gold is likely to be — taught so it sticks.",
      },
      {
        eyebrow: "Afternoons · On the claims",
        title: "Real ground, real targets",
        body: "Put the morning's lessons to work on the Maricopa Group GPAA claims — Yahoo #2, Yahoo #4, Golden Dreams, and King #1 — with hands-on coaching.",
      },
    ],
    image: { src: "/events/morristown/highlight.jpg", alt: "Attendee holding up a gold nugget found in the Arizona desert" },
  },
  schedule: {
    eyebrow: "Your two days",
    title: "Classroom, lunch, then the claims",
    intro:
      "Each day follows the same rhythm so skills build on each other — learn it in the morning, prove it in the dirt that afternoon.",
    days: [
      {
        label: "Days 1 & 2",
        blocks: [
          {
            label: "Morning",
            title: "Classroom at the 1899 Historic Hotel",
            detail:
              "Detector setup and settings, ground balance in hot ground, reading tones, and practical geology for detecting.",
          },
          { label: "Midday", title: "Lunch included", detail: "Lunch is provided both days." },
          {
            label: "Afternoon",
            title: "Field session on the Maricopa Group claims",
            detail: "About 15 minutes from the classroom. Swing, dig, and recover targets with Kevin coaching nearby.",
          },
        ],
      },
      {
        label: "Optional half day",
        note: "Included",
        blocks: [
          {
            label: "Morning",
            title: "Prospect on your own",
            detail: "Hunt the claims at your own pace the day after the event, with Kevin available to help.",
          },
        ],
      },
    ],
    footnote: "Exact start times and meeting details are sent with your registration confirmation.",
  },
  benefits: [
    {
      title: "All detecting, all weekend",
      description:
        "This is a metal detecting masterclass — settings, ground balance, tones, coil control, and recovery, with just enough geology to know where to swing.",
    },
    {
      title: "Hands-on with Kevin",
      description:
        "Learn from Kevin Hoagland in the classroom, then get coached on real ground the same afternoon.",
    },
    {
      title: "Real GPAA claim ground",
      description:
        "Practice on the Maricopa Group claims — mineralized Arizona desert ground where good habits pay off.",
    },
    {
      title: "Small group, capped at 30",
      description: "Seats are limited so everyone gets real coaching time in the field, not just a seat in a lecture.",
    },
    {
      title: "Lunch included",
      description: "Lunch is provided both days so you can stay focused on learning, not hunting for a drive-thru.",
    },
    {
      title: "Bonus half day on the claims",
      description:
        "Stay for an optional half day to prospect on your own with Kevin available for help — included with registration.",
    },
  ],
  immersive: {
    title: "Learn it in the morning. Prove it that afternoon.",
    body: "Every classroom lesson goes straight to the dirt. You'll dial in ground balance on hot desert soil, learn what your detector is telling you, and recover targets with Kevin coaching nearby — then come back the next day and do it better.",
  },
  knowBeforeYouGo: [
    {
      label: "GPAA membership required",
      body: "You must be an active GPAA member to attend, since the field sessions are on GPAA claims. Not a member yet? Join before you register.",
    },
    {
      label: "Season",
      body: "Sessions run in Arizona's cooler months — still, expect strong sun in the afternoons. Bring water, a hat, and sun protection.",
    },
    {
      label: "Getting to the claims",
      body: "The Maricopa Group claims are about 15 minutes from the classroom. Directions are shared with registered attendees.",
    },
    {
      label: "Gold detector required",
      body: "Demo detectors are not available — bring your own gold detector, such as a Garrett GoldMaster 24k, Fisher Gold Bug 2, or Minelab Gold Monster 1000 or 2000.",
      link: { label: "Shop gold detectors →", href: "/shop" },
    },
    {
      label: "What else to bring",
      body: "Headphones, a pinpointer, and a digging tool, plus sturdy boots, gloves, water, and field clothes.",
    },
  ],
  lodging: {
    title: "Where to stay",
    intro:
      "The 1899 Historic Hotel has RV sites right at the classroom, booked directly with the venue. Wickenburg — about 15 minutes west — has hotels and full-hookup RV parks.",
    areas: [
      {
        label: "At the venue",
        distance: "1899 Historic Hotel, Morristown",
        groups: [
          {
            label: "RV sites",
            options: [
              {
                name: "1899 Historic Hotel RV sites",
                detail:
                  "$30/night, booked directly with the venue (480-493-9329). Big-rig friendly with water, showers, restrooms, and a dump station — no electric hookups, generators OK. The hotel does not rent rooms.",
                href: HOTEL_1899_URL,
              },
            ],
          },
        ],
      },
      {
        label: "Wickenburg",
        distance: "~15 minutes west",
        groups: [
          {
            label: "RV parks",
            options: [
              {
                name: "Desert Cypress RV Park",
                detail: "Full-hookup RV park on Jack Burden Rd, close to town.",
                href: "http://www.desertcypress.com",
              },
              {
                name: "Valle Vista RV Park",
                detail: "RV park on N Tegner St near downtown Wickenburg.",
                href: "http://www.vallevistarvpark.com",
              },
              {
                name: "Horspitality RV Resort",
                detail: "RV resort on US-60/89 just outside town.",
                href: "https://www.google.com/maps/search/Horspitality+RV+Resort+Wickenburg+AZ",
              },
            ],
          },
          {
            label: "Hotels",
            options: [
              {
                name: "Los Viajeros Inn",
                detail: "Old West–themed inn with pool and breakfast.",
                href: "https://losviajerosinn.com",
              },
              {
                name: "Best Western Rancho Grande",
                detail: "Downtown hotel on Wickenburg Way.",
                href: "https://www.google.com/maps/search/Best+Western+Rancho+Grande+Wickenburg+AZ",
              },
              {
                name: "More Wickenburg lodging",
                detail: "The Town of Wickenburg's full list of hotels, guest ranches, and RV parks.",
                href: "https://wickenburgaz.gov/1293/Lodging",
              },
            ],
          },
        ],
      },
    ],
    footnote: "Availability and rates change — contact properties directly to book. Lodging is not included with registration.",
  },
  locations: [
    {
      label: "Classroom (mornings)",
      name: "The 1899 Historic Hotel",
      address: MORRISTOWN_CLASSROOM_ADDRESS,
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=41037+W+Grand+Ave,+Morristown,+AZ+85342",
    },
    {
      label: "Field sessions (afternoons)",
      name: "Maricopa Group GPAA claims",
      detail: "About 15 minutes from the classroom. Directions are shared with registered attendees.",
      link: { label: "GPAA Property Guide", href: MARICOPA_GROUP_URL },
    },
  ],
  partnerLinks: [{ label: "1899 Historic Hotel", href: HOTEL_1899_URL }],
  nearby: [
    { name: "Wickenburg", detail: "Western town with restaurants and supplies, ~15 minutes west" },
    { name: "Phoenix", detail: "About 40 minutes southeast" },
    { name: "Vulture Mine", detail: "Arizona's most famous historic gold mine, near Wickenburg" },
  ],
  membership: {
    kind: "required",
    title: "GPAA membership required",
    body: "Field sessions are held on GPAA claims, so an active GPAA membership is required to attend. Not a member yet? Learn about membership and join, then come back to register.",
    links: [{ label: "Learn about GPAA membership", href: GPAA_JOIN_URL }],
  },
  cardBadge: "Lunch Included",
  sessionChips: ["Classroom + claims", "Lunch included", "GPAA members", "Bring a gold detector"],
  gearRequirement: {
    short: "Bring your own gold detector",
    detail:
      "Demo detectors are not available. Bring a gold detector such as a Garrett GoldMaster 24k, Fisher Gold Bug 2, or Minelab Gold Monster 1000 or 2000.",
    link: { label: "Shop gold detectors →", href: "/shop" },
  },
  faq: [
    {
      question: "Where is the Arizona masterclass held?",
      answer:
        "Mornings are in the classroom at the 1899 Historic Hotel, 41037 W Grand Ave, Morristown, AZ 85342. Afternoons are on the Maricopa Group GPAA claims, about 15 minutes away.",
    },
    {
      question: "Do I need to be a GPAA member?",
      answer:
        "Yes. Because the field sessions are on GPAA claims, you must be an active GPAA member to attend. You can join at goldprospectors.org/join before registering.",
    },
    {
      question: "Do I need my own metal detector?",
      answer:
        "Yes. Demo detectors are not available, so every attendee needs a gold detector — for example a Garrett GoldMaster 24k, Fisher Gold Bug 2, or Minelab Gold Monster 1000 or 2000. If you need one, the Gold Trails shop carries these models.",
    },
    {
      question: "What does the event cover?",
      answer:
        "It's a metal detecting masterclass: detector setup and settings, ground balance, reading tones, coil control, and target recovery — plus the geology you need to know where to detect.",
    },
    {
      question: "What's included?",
      answer:
        "Two days of classroom and field training with Kevin, lunch both days, and an optional half day the day after to prospect on your own with Kevin available for help.",
    },
    {
      question: "How much does it cost and how big is the group?",
      answer: "Registration is $600 per person, and each session is capped at 30 attendees.",
    },
    {
      question: "Where can I stay?",
      answer:
        "The 1899 Historic Hotel has RV sites for $30/night, booked directly with the venue. Hotels and full-hookup RV parks are about 15 minutes away in Wickenburg.",
    },
  ],
};

export const eventVenues: EventVenue[] = [morristown, italianBar];

export const DEFAULT_VENUE_SLUG = italianBar.slug;

export function getVenueBySlug(slug: string | null | undefined): EventVenue | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  return eventVenues.find((venue) => venue.slug === normalized) ?? null;
}

export function getVenue(stateSlug: string, venueSlug: string): EventVenue | null {
  const venue = getVenueBySlug(venueSlug);
  return venue && venue.stateSlug === stateSlug ? venue : null;
}

export function getVenuesInState(stateSlug: string): EventVenue[] {
  return eventVenues.filter((venue) => venue.stateSlug === stateSlug);
}

export type EventState = { slug: string; name: string; code: string };

export function getEventStates(): EventState[] {
  const states = new Map<string, EventState>();
  for (const venue of eventVenues) {
    if (!states.has(venue.stateSlug)) {
      states.set(venue.stateSlug, { slug: venue.stateSlug, name: venue.stateName, code: venue.stateCode });
    }
  }
  return [...states.values()];
}

export function venuePath(venue: Pick<EventVenue, "stateSlug" | "slug">): string {
  return `/events/${venue.stateSlug}/${venue.slug}`;
}

/** Serializable venue summary for client-side session cards. */
export type EventCardVenue = {
  slug: string;
  stateSlug: string;
  stateName: string;
  shortName: string;
  cardBadge?: string;
  membershipRequired: boolean;
  gearNote?: string;
};

export function toCardVenue(venue: EventVenue): EventCardVenue {
  return {
    slug: venue.slug,
    stateSlug: venue.stateSlug,
    stateName: venue.stateName,
    shortName: venue.shortName,
    cardBadge: venue.cardBadge,
    membershipRequired: venue.membership.kind === "required",
    gearNote: venue.gearRequirement?.short,
  };
}

/** Venue for a Shopify event: `custom.venue` metafield → `venue-<slug>` tag → location text → default. */
export function resolveEventVenue(event: {
  eventVenue?: string | null;
  tags?: string[];
  eventLocation?: string | null;
}): EventVenue {
  const fromMetafield = getVenueBySlug(event.eventVenue);
  if (fromMetafield) return fromMetafield;

  for (const tag of event.tags ?? []) {
    const match = /^venue[-:](.+)$/i.exec(tag.trim());
    const fromTag = getVenueBySlug(match?.[1]);
    if (fromTag) return fromTag;
  }

  const location = event.eventLocation?.toLowerCase() ?? "";
  if (location) {
    const fromLocation = eventVenues.find((venue) =>
      venue.locationMatchers.some((matcher) => location.includes(matcher)),
    );
    if (fromLocation) return fromLocation;
  }

  return getVenueBySlug(DEFAULT_VENUE_SLUG)!;
}

/**
 * Klaviyo REST API helpers for lead capture.
 * Requires a private API key (server-only) — never expose via NEXT_PUBLIC_*.
 *
 * @see https://developers.klaviyo.com/en/reference/create_or_update_profile
 * @see https://developers.klaviyo.com/en/reference/subscribe_profiles
 */

const KLAVIYO_API_BASE = "https://a.klaviyo.com";
/** Stable revision; bump when intentionally adopting new API behavior. */
const KLAVIYO_REVISION = "2024-10-15";

export const KLAVIYO_EVENTS_NOTIFY_TAG = "gold-trails-events-notify";
export const KLAVIYO_CERTIFICATION_TAG = "metal-detecting-certification";

export type LeadAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path?: string;
  referrer?: string;
  captured_at?: string;
};

export type MasterclassAttribution = LeadAttribution;

export type MasterclassKlaviyoSubscribeInput = {
  email: string;
  firstName: string;
  lastName: string;
  attribution?: MasterclassAttribution;
};

export type EventsNotifyKlaviyoSubscribeInput = {
  email: string;
  firstName: string;
  lastName: string;
  attribution?: LeadAttribution;
};

export type CertificationKlaviyoSubscribeInput = {
  email: string;
  firstName: string;
  lastName: string;
  /** Opaque token stored on the profile for quiz magic links. */
  certificationToken: string;
  attribution?: LeadAttribution;
};

type KlaviyoConfig = {
  apiKey: string;
  listId: string;
};

type KlaviyoResult = { ok: true } | { ok: false; message: string; status: number };

export function getKlaviyoConfig(): KlaviyoConfig | null {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();
  if (!apiKey || !listId) return null;
  return { apiKey, listId };
}

export function getKlaviyoEventsConfig(): KlaviyoConfig | null {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_EVENTS_LIST_ID?.trim();
  if (!apiKey || !listId) return null;
  return { apiKey, listId };
}

export function getKlaviyoCertificationConfig(): KlaviyoConfig | null {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_CERTIFICATION_LIST_ID?.trim();
  if (!apiKey || !listId) return null;
  return { apiKey, listId };
}

async function klaviyoRequest(apiKey: string, path: string, init: RequestInit): Promise<Response> {
  return fetch(`${KLAVIYO_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: KLAVIYO_REVISION,
      accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      ...(init.headers ?? {}),
    },
  });
}

async function readKlaviyoError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as {
      errors?: Array<{ detail?: string; title?: string }>;
    };
    const first = data.errors?.[0];
    return first?.detail ?? first?.title ?? "Klaviyo request failed.";
  } catch {
    return "Klaviyo request failed.";
  }
}

function applyAttributionProperties(
  properties: Record<string, string | boolean>,
  attribution: LeadAttribution | undefined,
  prefix: "masterclass" | "events" | "certification",
): void {
  if (!attribution) return;

  const pairs: Array<[keyof LeadAttribution, string]> = [
    ["utm_source", "utm_source"],
    ["utm_medium", "utm_medium"],
    ["utm_campaign", "utm_campaign"],
    ["utm_term", "utm_term"],
    ["utm_content", "utm_content"],
    ["landing_path", `${prefix}_landing_path`],
    ["referrer", `${prefix}_referrer`],
    ["captured_at", `${prefix}_attribution_captured_at`],
  ];

  for (const [src, dest] of pairs) {
    const value = attribution[src];
    if (value) properties[dest] = value;
  }
}

function buildMasterclassProfileProperties(
  attribution?: MasterclassAttribution,
): Record<string, string | boolean> {
  const properties: Record<string, string | boolean> = {
    ebook_masterclass: true,
    masterclass_signup_source: "goldtrails_website",
  };
  applyAttributionProperties(properties, attribution, "masterclass");
  return properties;
}

function buildEventsNotifyProfileProperties(
  attribution?: LeadAttribution,
): Record<string, string | boolean> {
  const properties: Record<string, string | boolean> = {
    gold_trails_events_notify: true,
    events_signup_source: "goldtrails_events_page",
    events_signup_at: new Date().toISOString(),
  };
  applyAttributionProperties(properties, attribution, "events");
  return properties;
}

function buildCertificationProfileProperties(
  certificationToken: string,
  attribution?: LeadAttribution,
): Record<string, string | boolean> {
  const properties: Record<string, string | boolean> = {
    metal_detecting_certification: true,
    certification_enrolled: true,
    certification_token: certificationToken,
    certification_signup_source: "goldtrails_new_home",
    certification_enrolled_at: new Date().toISOString(),
  };
  applyAttributionProperties(properties, attribution, "certification");
  return properties;
}

/** Upsert profile fields before list subscribe so flow emails have first_name. */
async function createOrUpdateProfile(
  config: KlaviyoConfig,
  input: { email: string; firstName: string; lastName: string },
  properties: Record<string, string | boolean>,
): Promise<{ ok: true; profileId?: string } | { ok: false; message: string; status: number }> {
  const response = await klaviyoRequest(config.apiKey, "/api/profile-import", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: input.email,
          first_name: input.firstName,
          last_name: input.lastName,
          properties,
        },
      },
    }),
  });

  if (response.ok) {
    try {
      const data = (await response.json()) as { data?: { id?: string } };
      return { ok: true, profileId: data.data?.id };
    } catch {
      return { ok: true };
    }
  }

  const message = await readKlaviyoError(response);
  return { ok: false, message, status: response.status };
}

/** Subscribe to email marketing and add to a Klaviyo list (triggers list-based flows). */
async function subscribeProfileToList(
  config: KlaviyoConfig,
  email: string,
  customSource: string,
): Promise<KlaviyoResult> {
  const response = await klaviyoRequest(config.apiKey, "/api/profile-subscription-bulk-create-jobs", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: customSource,
          historical_import: false,
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: config.listId,
            },
          },
        },
      },
    }),
  });

  // Klaviyo accepts the job asynchronously.
  if (response.status === 202 || response.ok) return { ok: true };

  const message = await readKlaviyoError(response);
  return { ok: false, message, status: response.status };
}

async function findTagIdByName(apiKey: string, name: string): Promise<string | null> {
  const filter = encodeURIComponent(`equals(name,"${name}")`);
  const response = await klaviyoRequest(apiKey, `/api/tags?filter=${filter}`, { method: "GET" });
  if (!response.ok) return null;

  try {
    const data = (await response.json()) as { data?: Array<{ id?: string }> };
    return data.data?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

async function createTag(apiKey: string, name: string): Promise<string | null> {
  const response = await klaviyoRequest(apiKey, "/api/tags", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "tag",
        attributes: { name },
      },
    }),
  });

  if (!response.ok) return null;

  try {
    const data = (await response.json()) as { data?: { id?: string } };
    return data.data?.id ?? null;
  } catch {
    return null;
  }
}

async function ensureTagId(apiKey: string, name: string): Promise<string | null> {
  const existing = await findTagIdByName(apiKey, name);
  if (existing) return existing;
  return createTag(apiKey, name);
}

async function addProfileToTag(
  apiKey: string,
  tagId: string,
  profileId: string,
): Promise<KlaviyoResult> {
  const response = await klaviyoRequest(apiKey, `/api/tags/${tagId}/relationships/profiles`, {
    method: "POST",
    body: JSON.stringify({
      data: [{ type: "profile", id: profileId }],
    }),
  });

  if (response.ok || response.status === 204) return { ok: true };

  const message = await readKlaviyoError(response);
  return { ok: false, message, status: response.status };
}

async function applyProfileTags(
  apiKey: string,
  profileId: string | undefined,
  tagNames: string[],
): Promise<void> {
  if (!profileId || !tagNames.length) return;

  for (const tagName of tagNames) {
    const tagId = await ensureTagId(apiKey, tagName);
    if (!tagId) {
      console.warn(`[klaviyo] Could not resolve tag "${tagName}" — check tags:write scope.`);
      continue;
    }

    const result = await addProfileToTag(apiKey, tagId, profileId);
    if (!result.ok) {
      console.warn(`[klaviyo] Could not tag profile with "${tagName}":`, result.message);
    }
  }
}

async function subscribeLeadToKlaviyo(options: {
  config: KlaviyoConfig;
  email: string;
  firstName: string;
  lastName: string;
  properties: Record<string, string | boolean>;
  customSource: string;
  tags?: string[];
}): Promise<KlaviyoResult> {
  const profileResult = await createOrUpdateProfile(
    options.config,
    {
      email: options.email,
      firstName: options.firstName,
      lastName: options.lastName,
    },
    options.properties,
  );
  if (!profileResult.ok) return profileResult;

  const subscribeResult = await subscribeProfileToList(
    options.config,
    options.email,
    options.customSource,
  );
  if (!subscribeResult.ok) return subscribeResult;

  if (options.tags?.length) {
    await applyProfileTags(options.config.apiKey, profileResult.profileId, options.tags);
  }

  return { ok: true };
}

export async function subscribeMasterclassToKlaviyo(
  input: MasterclassKlaviyoSubscribeInput,
): Promise<KlaviyoResult> {
  const config = getKlaviyoConfig();
  if (!config) {
    return {
      ok: false,
      message: "Klaviyo is not configured.",
      status: 500,
    };
  }

  return subscribeLeadToKlaviyo({
    config,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    properties: buildMasterclassProfileProperties(input.attribution),
    customSource: "Gold Trails Masterclass download form",
  });
}

export async function subscribeEventsNotifyToKlaviyo(
  input: EventsNotifyKlaviyoSubscribeInput,
): Promise<KlaviyoResult> {
  const config = getKlaviyoEventsConfig();
  if (!config) {
    return {
      ok: false,
      message: "Klaviyo events list is not configured.",
      status: 500,
    };
  }

  return subscribeLeadToKlaviyo({
    config,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    properties: buildEventsNotifyProfileProperties(input.attribution),
    customSource: "Gold Trails events notify form",
    tags: [KLAVIYO_EVENTS_NOTIFY_TAG],
  });
}

export async function subscribeCertificationToKlaviyo(
  input: CertificationKlaviyoSubscribeInput,
): Promise<KlaviyoResult> {
  const config = getKlaviyoCertificationConfig();
  if (!config) {
    return {
      ok: false,
      message: "Klaviyo certification list is not configured.",
      status: 500,
    };
  }

  return subscribeLeadToKlaviyo({
    config,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    properties: buildCertificationProfileProperties(input.certificationToken, input.attribution),
    customSource: "Gold Trails certification signup form",
    tags: [KLAVIYO_CERTIFICATION_TAG],
  });
}

function quizSlugToPropertyKey(slug: string): string {
  return slug.replace(/-/g, "_"); // week-1 → week_1, final → final
}

/**
 * Mirror quiz attempt status onto the Klaviyo profile.
 * Pass flags are sticky (once true, a later failed retake does not clear them).
 */
export async function syncCertificationQuizProgressToKlaviyo(input: {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  quizSlug: string;
  percent: number;
  passed: boolean;
  /** All quiz slugs this learner has ever passed (including this attempt if passed). */
  passedSlugs: string[];
}): Promise<KlaviyoResult> {
  const config = getKlaviyoCertificationConfig();
  if (!config) {
    return {
      ok: false,
      message: "Klaviyo certification list is not configured.",
      status: 500,
    };
  }

  const key = quizSlugToPropertyKey(input.quizSlug);
  const scorePercent = Math.round(input.percent * 100);
  const now = new Date().toISOString();

  const properties: Record<string, string | boolean | number> = {
    [`quiz_${key}_last_score_percent`]: scorePercent,
    [`quiz_${key}_last_attempt_at`]: now,
  };

  if (input.passed) {
    properties[`quiz_${key}_passed`] = true;
    properties[`quiz_${key}_score_percent`] = scorePercent;
    properties[`quiz_${key}_passed_at`] = now;
  }

  const weeklyRequired = ["week-1", "week-2", "week-3", "week-4"];
  const allWeeklyPassed = weeklyRequired.every((slug) => input.passedSlugs.includes(slug));
  const finalPassed = input.passedSlugs.includes("final");

  if (allWeeklyPassed) {
    properties.certification_weekly_quizzes_passed = true;
  }
  if (allWeeklyPassed && finalPassed) {
    properties.certification_quizzes_complete = true;
    properties.certification_eligible = true;
  }

  const response = await klaviyoRequest(config.apiKey, "/api/profile-import", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: input.email,
          ...(input.firstName ? { first_name: input.firstName } : {}),
          ...(input.lastName ? { last_name: input.lastName } : {}),
          properties,
        },
      },
    }),
  });

  if (response.ok) return { ok: true };

  const message = await readKlaviyoError(response);
  return { ok: false, message, status: response.status };
}

/**
 * Klaviyo REST API helpers for masterclass lead capture.
 * Requires a private API key (server-only) — never expose via NEXT_PUBLIC_*.
 *
 * @see https://developers.klaviyo.com/en/reference/create_or_update_profile
 * @see https://developers.klaviyo.com/en/reference/subscribe_profiles
 */

const KLAVIYO_API_BASE = "https://a.klaviyo.com";
/** Stable revision; bump when intentionally adopting new API behavior. */
const KLAVIYO_REVISION = "2024-10-15";

export type MasterclassAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_path?: string;
  referrer?: string;
  captured_at?: string;
};

export type MasterclassKlaviyoSubscribeInput = {
  email: string;
  firstName: string;
  lastName: string;
  attribution?: MasterclassAttribution;
};

type KlaviyoConfig = {
  apiKey: string;
  listId: string;
};

export function getKlaviyoConfig(): KlaviyoConfig | null {
  const apiKey = process.env.KLAVIYO_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();
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

function buildProfileProperties(attribution?: MasterclassAttribution): Record<string, string | boolean> {
  const properties: Record<string, string | boolean> = {
    ebook_masterclass: true,
    masterclass_signup_source: "goldtrails_website",
  };

  if (!attribution) return properties;

  const pairs: Array<[keyof MasterclassAttribution, string]> = [
    ["utm_source", "utm_source"],
    ["utm_medium", "utm_medium"],
    ["utm_campaign", "utm_campaign"],
    ["utm_term", "utm_term"],
    ["utm_content", "utm_content"],
    ["landing_path", "masterclass_landing_path"],
    ["referrer", "masterclass_referrer"],
    ["captured_at", "masterclass_attribution_captured_at"],
  ];

  for (const [src, dest] of pairs) {
    const value = attribution[src];
    if (value) properties[dest] = value;
  }

  return properties;
}

/** Upsert profile fields before list subscribe so flow emails have first_name. */
async function createOrUpdateProfile(
  config: KlaviyoConfig,
  input: MasterclassKlaviyoSubscribeInput,
): Promise<{ ok: true } | { ok: false; message: string; status: number }> {
  const response = await klaviyoRequest(config.apiKey, "/api/profile-import", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: {
          email: input.email,
          first_name: input.firstName,
          last_name: input.lastName,
          properties: buildProfileProperties(input.attribution),
        },
      },
    }),
  });

  if (response.ok) return { ok: true };

  const message = await readKlaviyoError(response);
  return { ok: false, message, status: response.status };
}

/** Subscribe to email marketing and add to the masterclass list (triggers the nurture flow). */
async function subscribeProfileToList(
  config: KlaviyoConfig,
  email: string,
): Promise<{ ok: true } | { ok: false; message: string; status: number }> {
  const response = await klaviyoRequest(config.apiKey, "/api/profile-subscription-bulk-create-jobs", {
    method: "POST",
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          custom_source: "Gold Trails Masterclass download form",
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

export async function subscribeMasterclassToKlaviyo(
  input: MasterclassKlaviyoSubscribeInput,
): Promise<{ ok: true } | { ok: false; message: string; status: number }> {
  const config = getKlaviyoConfig();
  if (!config) {
    return {
      ok: false,
      message: "Klaviyo is not configured.",
      status: 500,
    };
  }

  const profileResult = await createOrUpdateProfile(config, input);
  if (!profileResult.ok) return profileResult;

  return subscribeProfileToList(config, input.email);
}

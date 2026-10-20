import { NextResponse } from "next/server";
import { approveEventReviewByToken } from "@/lib/event-reviews";
import { absoluteUrl } from "@/lib/site";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token?.trim()) {
    return NextResponse.redirect(absoluteUrl("/review/events?error=missing"));
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.redirect(absoluteUrl("/review/events?error=server"));
  }

  try {
    const ok = await approveEventReviewByToken(token.trim());
    if (!ok) {
      return NextResponse.redirect(absoluteUrl("/review/events?error=invalid"));
    }
    return NextResponse.redirect(absoluteUrl("/review/events?approved=1"));
  } catch (error) {
    console.error("[event-reviews] approve failed:", error);
    return NextResponse.redirect(absoluteUrl("/review/events?error=server"));
  }
}

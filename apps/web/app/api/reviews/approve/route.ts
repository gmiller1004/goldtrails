import { NextResponse } from "next/server";
import { approveMasterclassReviewByToken } from "@/lib/masterclass-reviews";
import { absoluteUrl } from "@/lib/site";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token?.trim()) {
    return NextResponse.redirect(absoluteUrl("/review/masterclass?error=missing"));
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.redirect(absoluteUrl("/review/masterclass?error=server"));
  }

  try {
    const ok = await approveMasterclassReviewByToken(token.trim());
    if (!ok) {
      return NextResponse.redirect(absoluteUrl("/review/masterclass?error=invalid"));
    }
    return NextResponse.redirect(absoluteUrl("/review/masterclass?approved=1"));
  } catch (error) {
    console.error("[reviews] approve failed:", error);
    return NextResponse.redirect(absoluteUrl("/review/masterclass?error=server"));
  }
}

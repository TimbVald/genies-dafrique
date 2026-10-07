import { NextRequest, NextResponse } from "next/server";
import { approveAllPending } from "@/lib/storage/testimonials-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── POST Handler ─────────────────────────────────────────────────
   Admin endpoint to approve all pending testimonials
   ⚠️  REMOVE IN PRODUCTION - This is for testing only
   ────────────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Simple security check - require a secret header
    const adminSecret = request.headers.get("x-admin-secret");
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    approveAllPending();

    return NextResponse.json(
      {
        success: true,
        message: "All pending testimonials have been approved",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Testimonials Admin] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}

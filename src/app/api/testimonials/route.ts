import { NextRequest, NextResponse } from "next/server";
import type { TestimonialsListResponse } from "@/types/testimonial-submission";
import { getApprovedTestimonials } from "@/lib/storage/testimonials-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── GET Handler ─────────────────────────────────────────────────
   Récupère les témoignages approuvés pour affichage public
   ────────────────────────────────────────────────────────────────── */
export async function GET(request: NextRequest): Promise<NextResponse<TestimonialsListResponse>> {
  try {
    // Get approved testimonials only
    const approvedTestimonials = getApprovedTestimonials();

    // Sort by creation date (newest first)
    const sortedTestimonials = approvedTestimonials.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(
      {
        success: true,
        testimonials: sortedTestimonials,
      },
      {
        status: 200,
        headers: {
          // Cache CDN/navigateur 60 s, revalidation silencieuse jusqu'à 5 min
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("[Testimonials API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        testimonials: [],
        error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}

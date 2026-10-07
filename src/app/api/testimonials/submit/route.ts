import { NextRequest, NextResponse } from "next/server";
import type { TestimonialSubmission, TestimonialSubmissionResponse, Locale } from "@/types/testimonial-submission";
import { addTestimonial, getAllTestimonials } from "@/lib/storage/testimonials-storage";
import { rateLimitMap, lastSubmissionByIp } from "@/lib/storage/rate-limit-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Rate Limiting Configuration ─────────────────────────────────── */
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 heure
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 soumissions par heure par IP

/* ── Spam Protection Configuration ───────────────────────────────── */
const SUBMISSION_COOLDOWN = 5 * 60 * 1000; // 5 minutes entre soumissions

/* ── Rate Limit Check ─────────────────────────────────────────────── */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

/* ── Cooldown Check ───────────────────────────────────────────────── */
function checkCooldown(ip: string): boolean {
  const now = Date.now();
  const lastSubmission = lastSubmissionByIp.get(ip);

  if (!lastSubmission || now - lastSubmission > SUBMISSION_COOLDOWN) {
    return true;
  }

  return false;
}

/* ── Get Client IP ───────────────────────────────────────────────── */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/* ── Validation ───────────────────────────────────────────────────── */
function validateSubmission(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid data format" };
  }

  const { name, rating, comment, locale } = data as Record<string, unknown>;

  // Name validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }
  if (name.trim().length > 100) {
    return { valid: false, error: "Name must be less than 100 characters" };
  }

  // Rating validation
  if (typeof rating !== "number" || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    return { valid: false, error: "Rating must be an integer between 1 and 5" };
  }

  // Comment validation
  if (!comment || typeof comment !== "string" || comment.trim().length < 10) {
    return { valid: false, error: "Comment must be at least 10 characters" };
  }
  if (comment.trim().length > 1000) {
    return { valid: false, error: "Comment must be less than 1000 characters" };
  }

  // Locale validation
  const validLocales: Locale[] = ["fr", "en", "ew"];
  if (!locale || typeof locale !== "string" || !validLocales.includes(locale as Locale)) {
    return { valid: false, error: "Invalid locale" };
  }

  // Spam detection: check for repeated content
  const normalizedComment = comment.trim().toLowerCase();
  const recentSubmissions = getAllTestimonials().slice(-50); // Check last 50 submissions
  for (const sub of recentSubmissions) {
    if (sub.comment.trim().toLowerCase() === normalizedComment) {
      return { valid: false, error: "Duplicate submission detected" };
    }
  }

  return { valid: true };
}

/* ── POST Handler ───────────────────────────────────────────────── */
export async function POST(request: NextRequest): Promise<NextResponse<TestimonialSubmissionResponse>> {
  try {
    // Get client IP
    const ip = getClientIp(request);

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
          error: "RATE_LIMIT_EXCEEDED",
        },
        { status: 429 }
      );
    }

    // Cooldown check
    if (!checkCooldown(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait a few minutes before submitting another review.",
          error: "COOLDOWN_ACTIVE",
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate submission
    const validation = validateSubmission(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error || "Invalid submission",
          error: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const { name, rating, comment, locale } = body as {
      name: string;
      rating: number;
      comment: string;
      locale: Locale;
    };

    // Create submission
    const submission: TestimonialSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      rating,
      comment: comment.trim(),
      locale,
      status: "pending", // All submissions start as pending
      createdAt: new Date().toISOString(),
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || undefined,
    };

    // Store submission
    addTestimonial(submission);
    lastSubmissionByIp.set(ip, Date.now());

    // Log submission (for monitoring)
    console.log(
      `[Testimonial] New submission from ${ip}: ${submission.name.substring(0, 3)}*** (${submission.rating}/5)`
    );

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your review! It will be published after moderation.",
        submission: {
          ...submission,
          ipAddress: "***", // Hide IP in response
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Testimonial API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your submission",
        error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isResendConfigured } from "@/lib/email/resend";
import { generateWelcomeEmailHtml } from "@/lib/email/templates/newsletter-welcome";

// Simple in-memory storage for demo / current session
// In production, this can be synced to a DB or Resend Audience Contacts
const subscriptions = new Set<string>();

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Check rate limit for an IP address
 */
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

/**
 * Get client IP address from request
 */
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, language = "fr" } = body;

    // Validate email presence
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Normalize email (trim and lowercase)
    const normalizedEmail = email.trim().toLowerCase();

    // Validate email format
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Normalize language: fallback to 'fr' if 'ew' or other locale is passed
    const emailLocale: "fr" | "en" = language === "en" ? "en" : "fr";

    // Check if already subscribed
    if (subscriptions.has(normalizedEmail)) {
      return NextResponse.json(
        {
          message: "Email already subscribed",
          alreadySubscribed: true,
        },
        { status: 200 }
      );
    }

    // Store the subscription
    subscriptions.add(normalizedEmail);

    // Log subscription
    console.log(
      `[Newsletter] Nouvelle inscription: ${normalizedEmail.substring(0, 3)}***@${
        normalizedEmail.split("@")[1]
      }`
    );

    let emailSent = false;

    // Send welcome email via Resend if configured
    if (isResendConfigured()) {
      try {
        const emailHtml = generateWelcomeEmailHtml({
          email: normalizedEmail,
          locale: emailLocale,
        });

        const emailSubject =
          emailLocale === "fr"
            ? "Bienvenue chez Les Génies d'Afrique"
            : "Welcome to Les Génies d'Afrique";

        const emailResult = await sendEmail({
          to: normalizedEmail,
          subject: emailSubject,
          html: emailHtml,
        });

        if (emailResult.success) {
          emailSent = true;
          console.log(`[Newsletter] Email de bienvenue envoyé avec succès à ${normalizedEmail}`);
        } else {
          console.warn(`[Newsletter] Resend info: ${emailResult.error}`);
        }
      } catch (err) {
        console.warn("[Newsletter] Erreur lors de l'envoi d'email Resend:", err);
      }
    } else {
      console.warn("[Newsletter] Resend non configuré ou clé absente.");
    }

    return NextResponse.json(
      {
        message: "Subscription successful",
        email: normalizedEmail,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

// Simple in-memory storage for demo purposes
// In production, this should be replaced with a proper database
const subscriptions = new Set<string>();

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Check if already subscribed (optional - can be removed if duplicates are allowed)
    if (subscriptions.has(normalizedEmail)) {
      return NextResponse.json(
        { 
          message: "Email already subscribed",
          alreadySubscribed: true 
        },
        { status: 200 }
      );
    }

    // Store the subscription
    subscriptions.add(normalizedEmail);

    // Log for debugging (remove in production)
    console.log(`Newsletter subscription: ${normalizedEmail}`);

    return NextResponse.json(
      { 
        message: "Subscription successful",
        email: normalizedEmail 
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

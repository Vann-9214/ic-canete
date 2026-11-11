import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
      },
      { status: 400 }
    );
  }

  // 1. Zod Validation
  const validationResult = contactSchema.safeParse(body);
  if (!validationResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of validationResult.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const validatedData = validationResult.data;

  // 2. Honeypot check (FR-022)
  if (validatedData.website && validatedData.website.trim().length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
      },
      { status: 400 }
    );
  }

  // 3. Rate limiting (FR-022, contracts/contact-api.md §2.3)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many messages sent recently. Please wait a few minutes and try again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": rateLimit.retryAfterSeconds.toString(),
        },
      }
    );
  }

  // 4. Resend credentials check (FR-023)
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

  if (!apiKey || !recipientEmail) {
    console.error(
      "Missing required contact environment variables: RESEND_API_KEY or CONTACT_RECIPIENT_EMAIL"
    );
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
      },
      { status: 500 }
    );
  }

  // 5. Send email via Resend
  try {
    const resend = new Resend(apiKey);
    const fromAddress =
      process.env.CONTACT_FROM_EMAIL ?? "ICCañete Portfolio <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [recipientEmail],
      replyTo: validatedData.email,
      subject: `[Portfolio Inquiry] Message from ${validatedData.name}`,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
    });

    if (error) {
      console.error("Resend API response error:", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Message sent! Thank you for reaching out—I'll get back to you soon.",
    });
  } catch (err) {
    console.error("Unhandled error dispatching contact email:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
      },
      { status: 500 }
    );
  }
}

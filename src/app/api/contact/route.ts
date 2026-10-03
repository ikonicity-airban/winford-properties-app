import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Simple in-memory rate limiting for demo purposes (would use Redis in production)
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export async function POST(req: Request) {
  try {
    // 1. Rate limiting (simple IP-based)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    
    const limit = rateLimit.get(ip);
    if (limit) {
      if (now - limit.timestamp < windowMs) {
        if (limit.count >= 5) { // Max 5 requests per minute
          return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }
        limit.count++;
      } else {
        rateLimit.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse and validate input
    const body = await req.json();
    const result = contactSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ 
        error: "Validation failed", 
        details: result.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const data = result.data;

    // 3. Send email using Resend (or console.log if no env var)
    // Note: requires RESEND_API_KEY in .env
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      // Uncomment when Resend is set up
      /*
      const resend = new (await import("resend")).Resend(resendApiKey);
      await resend.emails.send({
        from: 'Winford Properties <onboarding@resend.dev>',
        to: ['info@winfordproperties.com'],
        subject: `New Contact: ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
      });
      */
      console.log("Would send email via Resend:", data);
    } else {
      console.log("No RESEND_API_KEY set. Contact form submission:", data);
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

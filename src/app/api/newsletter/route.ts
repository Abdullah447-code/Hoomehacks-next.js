import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import { Subscriber } from "@/lib/models";
import { createUnsubscribeToken } from "@/lib/newsletter";
import { getSiteUrl } from "@/lib/site-url";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!emailPattern.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
      process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 503 },
      );
    }

    await connectDB();
    await Subscriber.findOneAndUpdate(
      { email: normalizedEmail },
      {
        email: normalizedEmail,
        subscribed: true,
        subscribedAt: new Date(),
        $unset: { unsubscribedAt: 1 },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    const unsubscribeToken = createUnsubscribeToken(normalizedEmail);
    const siteUrl = getSiteUrl();
    const unsubscribeUrl = `${siteUrl}/unsubscribe?token=${encodeURIComponent(unsubscribeToken)}`;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_PORT === "465",
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: normalizedEmail,
      subject: "Welcome to HomeHacks!",
      text: `Thanks for subscribing to HomeHacks!\n\nYou are now on the list for practical cleaning, kitchen, DIY, and organization ideas that make everyday home life easier.\n\nDiscover the latest hacks: ${siteUrl}\n\nUnsubscribe anytime: ${unsubscribeUrl}\n\nSee you soon,\nThe HomeHacks team`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: auto;">
          <h1 style="color: #166534;">Welcome to HomeHacks!</h1>
          <p>Thanks for subscribing. You are now on the list for practical ideas that make everyday home life easier.</p>
          <p>Each week, we will share useful cleaning, kitchen, DIY, and organization hacks that save time, money, and effort.</p>
          <p><a href="${siteUrl}" style="color: #15803d; font-weight: bold;">Explore HomeHacks</a></p>
          <p style="font-size: 12px; color: #6b7280;"><a href="${unsubscribeUrl}" style="color: #15803d;">Unsubscribe from HomeHacks emails</a></p>
          <p>See you soon,<br />The HomeHacks team</p>
        </div>
      `,
    });

    return NextResponse.json({
      message: "Thanks for subscribing! Check your inbox.",
      unsubscribeUrl,
    });
  } catch (error) {
    console.error("Newsletter email failed", error);
    return NextResponse.json(
      { error: "We could not send the email right now. Please try again." },
      { status: 500 },
    );
  }
}

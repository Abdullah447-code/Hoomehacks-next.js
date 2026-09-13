import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    const senderName = typeof name === "string" ? name.trim() : "";
    const senderEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";
    const senderMessage = typeof message === "string" ? message.trim() : "";

    if (!senderName || !emailPattern.test(senderEmail) || !senderMessage) {
      return NextResponse.json(
        { error: "Please complete all fields with a valid email." },
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

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_PORT === "465",
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });

    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: SMTP_USER,
      replyTo: senderEmail,
      subject: `HomeHacks contact message from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\n${senderMessage}`,
    });

    return NextResponse.json({
      message: "Thanks for contacting HomeHacks. We will reply soon.",
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json(
      { error: "We could not send your message right now. Please try again." },
      { status: 500 },
    );
  }
}

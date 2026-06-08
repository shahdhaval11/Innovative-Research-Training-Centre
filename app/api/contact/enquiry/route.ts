import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/lib/models/Enquiry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, service, message } = body;

    if (!name || !email || !phone || !subject || !service || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await connectDB();
    await Enquiry.create({ name, email, phone, subject, service, message });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NanoNova Research" <${process.env.SMTP_USER}>`,
      to: "nanonovaresearch@gmail.com",
      subject: `New Enquiry: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden;">
          <div style="background:#003049;padding:24px 32px;">
            <h2 style="color:#F4A261;margin:0;font-size:20px;">New Enquiry Received</h2>
            <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:13px;">NanoNova Research Training Centre</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#666;width:130px;vertical-align:top;font-weight:600;">Full Name</td><td style="padding:10px 0;color:#003049;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#666;vertical-align:top;font-weight:600;">Email</td><td style="padding:10px 0;color:#003049;">${email}</td></tr>
              <tr><td style="padding:10px 0;color:#666;vertical-align:top;font-weight:600;">Phone</td><td style="padding:10px 0;color:#003049;">${phone}</td></tr>
              <tr><td style="padding:10px 0;color:#666;vertical-align:top;font-weight:600;">Subject</td><td style="padding:10px 0;color:#003049;">${subject}</td></tr>
              <tr><td style="padding:10px 0;color:#666;vertical-align:top;font-weight:600;">Service</td><td style="padding:10px 0;color:#003049;">${service}</td></tr>
              <tr><td style="padding:10px 0;color:#666;vertical-align:top;font-weight:600;">Message</td><td style="padding:10px 0;color:#003049;white-space:pre-wrap;">${message}</td></tr>
            </table>
          </div>
          <div style="background:#f7f9fb;padding:16px 32px;text-align:center;">
            <p style="color:#999;font-size:12px;margin:0;">Sent from NanoNova Research Training Centre website</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Enquiry API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

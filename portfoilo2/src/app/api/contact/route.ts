import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        console.log("Transmission Initiated for:", name);

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 }
            );
        }

        // Check if ANY delivery method is configured
        if (!process.env.DISCORD_WEBHOOK_URL && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_PASS.includes('your_gmail'))) {
            console.warn("WARNING: No transmission channels configured in .env. Logging to console instead.");
            console.log("FORM DATA:", { name, email, message });

            // We return 200 to the user so the UI looks successful, 
            // but we log it locally so YOU don't lose the data while testing.
            return NextResponse.json(
                { message: "Dev Mode: Data logged to terminal. Configure .env for real delivery." },
                { status: 200 }
            );
        }

        // 1. Send via Discord Webhook
        if (process.env.DISCORD_WEBHOOK_URL) {
            try {
                await fetch(process.env.DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        embeds: [{
                            title: "🚀 New Portfolio Message",
                            color: 0x915EFF,
                            fields: [
                                { name: "Name", value: name, inline: true },
                                { name: "Email", value: email, inline: true },
                                { name: "Message", value: message }
                            ],
                            timestamp: new Date().toISOString()
                        }]
                    })
                });
            } catch (e) {
                console.error("Discord delivery failed:", e);
            }
        }

        // 2. Send via Email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && !process.env.EMAIL_PASS.includes('your_gmail')) {
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                await transporter.sendMail({
                    from: email,
                    to: process.env.EMAIL_USER,
                    subject: `Portfolio Contact from ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #915EFF; border-radius: 10px;">
                            <h2 style="color: #915EFF;">New Portfolio Message</h2>
                            <p><strong>From:</strong> ${name} (${email})</p>
                            <p><strong>Message:</strong></p>
                            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 10px;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    `,
                });
            } catch (e) {
                console.error("Email delivery failed:", e);
                throw new Error("SMTP Authentication failed. Check your App Password.");
            }
        }

        return NextResponse.json(
            { message: "Data Transmitted Successfully!" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("CRITICAL TRANSMISSION ERROR:", error);
        return NextResponse.json(
            { error: error.message || "Transmission failed." },
            { status: 500 }
        );
    }
}

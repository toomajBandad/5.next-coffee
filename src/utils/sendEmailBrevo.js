// lib/sendWelcomeEmail.js

const sendWelcomeEmail = async ({ email, username }) => {
  if (!email || typeof email !== "string") {
    console.error("❌ Invalid or missing email:", email);
    return;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Coffee Market",
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email }],
        subject: "Welcome to Coffee Market!",
        htmlContent: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Hi ${username || "there"},</h2>
            <p>Welcome to <strong>Nexr Coffee Market</strong>! We're thrilled to have you.</p>
            <p>Explore our finest blends, track your orders, and enjoy exclusive perks.</p>
            <p>Let us know if you ever need help—we're just a sip away ☕</p>
            <br/>
            <p style="font-size: 0.9em; color: #888;">
              This email was sent by Coffee Market, ${process.env.SENDER_EMAIL}
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();
    console.log("✅ Welcome email sent:", data);
  } catch (error) {
    console.error("❌ Brevo welcome email error:", error.message);
  }
};

export { sendWelcomeEmail };
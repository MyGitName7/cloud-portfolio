// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from "next";

// ===== Simple per-IP rate limit (demo) =====
const WINDOW_MS = 60_000; // 1 minute
const MAX_HITS = 5;
const ipHits = new Map<string, { count: number; resetAt: number }>();

function allowHit(ip: string) {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now > rec.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_HITS) return false;
  rec.count += 1;
  return true;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// ===== Main handler =====
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST only
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Basic rate limit by IP
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";
  if (!allowHit(ip)) {
    return res.status(429).json({ error: "Too Many Requests" });
  }

  // Expect JSON
  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(400).json({ error: "Invalid content type" });
  }

  const body = (req.body ?? {}) as Record<string, string>;
  const { name = "", email = "", message = "", company = "" } = body;

  // Honeypot: "company" must be empty
  if (typeof company === "string" && company.trim() !== "") {
    // Silently accept but drop
    return res.status(204).end();
  }

  // Validate inputs
  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanMessage = String(message).trim();

  if (!cleanName || cleanName.length > 100) {
    return res.status(422).json({ error: "Name is required and must be ≤ 100 chars" });
  }
  if (!isEmail(cleanEmail) || cleanEmail.length > 200) {
    return res.status(422).json({ error: "Valid email is required" });
  }
  if (!cleanMessage || cleanMessage.length > 2000) {
    return res.status(422).json({ error: "Message is required and must be ≤ 2000 chars" });
  }

  // ===== Optional: send via AWS SES (configured via .env.local) =====
  const SES_REGION = process.env.AWS_REGION || process.env.SES_REGION;
  const SES_FROM = process.env.SES_FROM; // verified sender
  const SES_TO = process.env.SES_TO;     // your inbox (can be same as FROM in sandbox)

  if (SES_REGION && SES_FROM && SES_TO && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    try {
      // Lazy-load AWS SDK only when configured
      // @ts-ignore - dynamic import without types
      const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");

      const client = new SESv2Client({ region: SES_REGION });

      const subject = `Portfolio contact from ${cleanName}`;
      const text = [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `IP: ${ip}`,
        "",
        "Message:",
        cleanMessage,
      ].join("\n");

      const cmd = new SendEmailCommand({
        FromEmailAddress: SES_FROM,
        Destination: { ToAddresses: [SES_TO] },
        Content: {
          Simple: {
            Subject: { Data: subject },
            Body: { Text: { Data: text } },
          },
        },
        ReplyToAddresses: [cleanEmail],
      });

      await client.send(cmd);
      return res.status(200).json({ ok: true, delivered: true });
    } catch (err: any) {
      console.warn("SES send failed:", err?.message || err);
      // Still return ok so bots can’t probe; you’ll see the warning in logs
      return res.status(200).json({ ok: true, delivered: false });
    }
  }

  // Fallback: accept without sending (until SES is configured)
  console.log("Contact accepted (no SES configured or keys missing):", {
    ip,
    nameLen: cleanName.length,
    emailLen: cleanEmail.length,
    msgLen: cleanMessage.length,
  });
  return res.status(200).json({ ok: true, delivered: false });
}

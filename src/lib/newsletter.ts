import jwt from "jsonwebtoken";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function createUnsubscribeToken(email: string) {
  return jwt.sign({ type: "newsletter-unsubscribe", email }, getJwtSecret(), {
    expiresIn: "365d",
  });
}

export function getEmailFromUnsubscribeToken(token: string) {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as {
      type?: string;
      email?: string;
    };
    if (payload.type !== "newsletter-unsubscribe" || !payload.email)
      return null;
    return payload.email;
  } catch {
    return null;
  }
}

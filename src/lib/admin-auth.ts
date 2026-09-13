import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";
const SESSION_LENGTH = 60 * 60 * 24;

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function createAdminToken() {
  return jwt.sign({ role: "admin" }, getJwtSecret(), {
    expiresIn: SESSION_LENGTH,
  });
}

export function hasAdminSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const payload = jwt.verify(token, getJwtSecret()) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_LENGTH,
  },
};

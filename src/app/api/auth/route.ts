import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {
  adminCookie,
  createAdminToken,
  hasAdminSession,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (
      typeof password !== "string" ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ message: "Logged in successfully" });
    response.cookies.set(
      adminCookie.name,
      createAdminToken(),
      adminCookie.options,
    );
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to log in" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: hasAdminSession(request) });
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete(adminCookie.name);
  return response;
}

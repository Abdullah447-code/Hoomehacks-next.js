import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models";
import { seedPosts } from "@/lib/seed-data";
import { hasAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    if (!hasAdminSession(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    await Post.deleteMany({});
    await Post.insertMany(seedPosts);
    return NextResponse.json({
      message: `Seeded ${seedPosts.length} posts successfully!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

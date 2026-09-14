import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models";
import { seedPosts } from "@/lib/seed-data";

export async function POST() {
  try {
    await connectDB();
    await Post.deleteMany({});
    await Post.insertMany(seedPosts);
    return NextResponse.json({ message: `Seeded ${seedPosts.length} posts successfully!` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
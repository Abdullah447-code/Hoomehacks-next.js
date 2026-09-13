import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  imageUrl?: string;
  emoji: string;
  readTime: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriber extends Document {
  email: string;
  subscribed: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Cleaning", "Kitchen", "DIY", "Organization", "Energy", "Garden"],
    },
    author: { type: String, default: "HomeHacks Team" },
    imageUrl: { type: String },
    emoji: { type: String, default: "🏠" },
    readTime: { type: String, default: "3 min read" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    subscribed: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true },
);

export const Subscriber =
  mongoose.models.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);

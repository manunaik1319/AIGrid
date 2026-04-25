/**
 * Unified tools service.
 * - In production (or when MONGODB_URI is set): uses MongoDB
 * - In development without MONGODB_URI: falls back to JSON file store
 */

import { StoreTool, readTools, writeTools, createTool as jsonCreate, updateTool as jsonUpdate, deleteTool as jsonDelete } from "./tools-store";

const USE_MONGO = !!process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("disabled");

async function getMongoTools(): Promise<StoreTool[]> {
  const { connectDB } = await import("./mongodb");
  const { default: Tool } = await import("./models/Tool");
  await connectDB();
  const docs = await Tool.find({}).sort({ createdAt: -1 }).lean();
  return docs.map(mongoToStore);
}

async function mongoCreate(data: Omit<StoreTool, "id" | "dateAdded">): Promise<StoreTool> {
  const { connectDB } = await import("./mongodb");
  const { default: Tool } = await import("./models/Tool");
  await connectDB();
  const doc = await Tool.create({ ...data, isNewTool: (data as any).isNewTool ?? false });
  return mongoToStore(doc.toObject());
}

async function mongoUpdate(id: string, data: Partial<StoreTool>): Promise<StoreTool | null> {
  const { connectDB } = await import("./mongodb");
  const { default: Tool } = await import("./models/Tool");
  await connectDB();
  const doc = await Tool.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!doc) return null;
  return mongoToStore(doc);
}

async function mongoDelete(id: string): Promise<boolean> {
  const { connectDB } = await import("./mongodb");
  const { default: Tool } = await import("./models/Tool");
  await connectDB();
  const result = await Tool.findByIdAndDelete(id);
  return !!result;
}

function mongoToStore(doc: any): StoreTool {
  return {
    id: doc._id?.toString() ?? doc.id,
    name: doc.name,
    slug: doc.slug,
    tagline: doc.tagline ?? "",
    category: doc.category,
    pricingModel: doc.pricingModel ?? "Free",
    rating: doc.rating ?? 0,
    reviewCount: doc.reviewCount ?? 0,
    websiteUrl: doc.websiteUrl ?? "",
    logoUrl: doc.logoUrl ?? "",
    features: doc.features ?? [],
    platform: doc.platform ?? [],
    dateAdded: doc.dateAdded ?? new Date().toISOString().split("T")[0],
    isTrending: doc.isTrending ?? false,
    isNewTool: doc.isNewTool ?? false,
    icon: doc.icon ?? "🤖",
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function getAllTools(): Promise<StoreTool[]> {
  if (USE_MONGO) return getMongoTools();
  return readTools();
}

export async function addTool(data: Omit<StoreTool, "id" | "dateAdded">): Promise<StoreTool> {
  if (USE_MONGO) return mongoCreate(data);
  return jsonCreate(data);
}

export async function editTool(id: string, data: Partial<StoreTool>): Promise<StoreTool | null> {
  if (USE_MONGO) return mongoUpdate(id, data);
  return jsonUpdate(id, data);
}

export async function removeTool(id: string): Promise<boolean> {
  if (USE_MONGO) return mongoDelete(id);
  return jsonDelete(id);
}

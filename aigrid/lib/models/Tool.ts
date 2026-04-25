import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITool extends Document {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  pricingModel: string;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
  logoUrl: string;
  features: string[];
  platform: string[];
  dateAdded: string;
  isTrending: boolean;
  isNewTool: boolean;
  icon: string;
}

const ToolSchema = new Schema<ITool>(
  {
    name:         { type: String, required: true },
    slug:         { type: String, required: true, unique: true },
    tagline:      { type: String, default: "" },
    category:     { type: String, required: true },
    pricingModel: { type: String, default: "Free" },
    rating:       { type: Number, default: 0 },
    reviewCount:  { type: Number, default: 0 },
    websiteUrl:   { type: String, default: "" },
    logoUrl:      { type: String, default: "" },
    features:     { type: [String], default: [] },
    platform:     { type: [String], default: [] },
    dateAdded:    { type: String, default: () => new Date().toISOString().split("T")[0] },
    isTrending:   { type: Boolean, default: false },
    isNewTool:    { type: Boolean, default: false },
    icon:         { type: String, default: "🤖" },
  },
  { timestamps: true }
);

const Tool: Model<ITool> =
  mongoose.models.Tool ?? mongoose.model<ITool>("Tool", ToolSchema);

export default Tool;

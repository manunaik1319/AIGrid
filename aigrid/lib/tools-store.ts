import fs from "fs";
import path from "path";

export interface StoreTool {
  id: string;
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

const DATA_FILE = path.join(process.cwd(), "data", "tools.json");

export function readTools(): StoreTool[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StoreTool[];
  } catch {
    return [];
  }
}

export function writeTools(tools: StoreTool[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tools, null, 2), "utf-8");
}

export function getToolById(id: string): StoreTool | undefined {
  return readTools().find((t) => t.id === id);
}

export function createTool(data: Omit<StoreTool, "id" | "dateAdded">): StoreTool {
  const tools = readTools();
  const newTool: StoreTool = {
    ...data,
    id: String(Date.now()),
    dateAdded: new Date().toISOString().split("T")[0],
  };
  writeTools([...tools, newTool]);
  return newTool;
}

export function updateTool(id: string, data: Partial<StoreTool>): StoreTool | null {
  const tools = readTools();
  const idx = tools.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tools[idx] = { ...tools[idx], ...data, id };
  writeTools(tools);
  return tools[idx];
}

export function deleteTool(id: string): boolean {
  const tools = readTools();
  const filtered = tools.filter((t) => t.id !== id);
  if (filtered.length === tools.length) return false;
  writeTools(filtered);
  return true;
}

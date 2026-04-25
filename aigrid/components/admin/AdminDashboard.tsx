"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FiGrid, FiTool, FiBarChart2, FiLogOut, FiPlus, FiEdit2,
  FiTrash2, FiStar, FiExternalLink, FiX, FiSave, FiSearch,
  FiTrendingUp, FiDollarSign, FiUsers,
} from "react-icons/fi";

interface Tool {
  _id: string;
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
  isTrending: boolean;
  isNewTool: boolean;
  icon: string;
}

const CATEGORIES = [
  "text-writing","image-generation","code-dev","audio-music",
  "video-generation","productivity","research","marketing","data-analytics",
];
const PRICING = ["Free","Freemium","Paid"];

const EMPTY_TOOL: Omit<Tool, "_id"> = {
  name:"", slug:"", tagline:"", category:"text-writing",
  pricingModel:"Freemium", rating:4.0, reviewCount:0,
  websiteUrl:"", logoUrl:"", features:[], platform:[],
  isTrending:false, isNewTool:false, icon:"🤖",
};

type Tab = "overview" | "tools";

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EAED]">
          <h2 className="font-bold text-[#1A1A2E] text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#1A1A2E] transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function ToolForm({ initial, onSave, onCancel, saving }: {
  initial: Omit<Tool, "_id"> & { _id?: string };
  onSave: (data: any) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const inputCls = "w-full border border-[#C8CDD5] rounded-xl px-3 py-2.5 text-sm text-[#1A1A2E] focus:outline-none focus:border-[#7DD3F0] focus:ring-2 focus:ring-[#7DD3F0]/20 transition";
  const labelCls = "block text-xs font-semibold text-[#6B7280] mb-1.5";

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Name *</label>
          <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} required />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} required placeholder="e.g. chatgpt" />
        </div>
      </div>

      <div>
        <label className={labelCls}>Tagline</label>
        <input className={inputCls} value={form.tagline} onChange={e => set("tagline", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category *</label>
          <select className={inputCls} value={form.category} onChange={e => set("category", e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Pricing *</label>
          <select className={inputCls} value={form.pricingModel} onChange={e => set("pricingModel", e.target.value)}>
            {PRICING.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Rating (0–5)</label>
          <input type="number" min="0" max="5" step="0.1" className={inputCls} value={form.rating} onChange={e => set("rating", parseFloat(e.target.value))} />
        </div>
        <div>
          <label className={labelCls}>Review Count</label>
          <input type="number" min="0" className={inputCls} value={form.reviewCount} onChange={e => set("reviewCount", parseInt(e.target.value))} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Website URL</label>
        <input type="url" className={inputCls} value={form.websiteUrl} onChange={e => set("websiteUrl", e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label className={labelCls}>Logo URL</label>
        <input className={inputCls} value={form.logoUrl} onChange={e => set("logoUrl", e.target.value)} placeholder="https://..." />
      </div>

      <div>
        <label className={labelCls}>Icon (emoji)</label>
        <input className={inputCls} value={form.icon} onChange={e => set("icon", e.target.value)} placeholder="🤖" />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isTrending} onChange={e => set("isTrending", e.target.checked)} className="w-4 h-4 rounded border-[#C8CDD5] text-[#7DD3F0] focus:ring-[#7DD3F0]" />
          <span className="text-sm font-medium text-[#1A1A2E]">Show in Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.isNewTool} onChange={e => set("isNewTool", e.target.checked)} className="w-4 h-4 rounded border-[#C8CDD5] text-[#7DD3F0] focus:ring-[#7DD3F0]" />
          <span className="text-sm font-medium text-[#1A1A2E]">Show in New This Week</span>
        </label>
      </div>

      <div className="flex gap-3 pt-2 border-t border-[#E8EAED]">
        <button type="submit" disabled={saving}
          className="flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#2D2D44] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50">
          <FiSave className="w-4 h-4" />
          {saving ? "Saving…" : "Save Tool"}
        </button>
        <button type="button" onClick={onCancel}
          className="text-sm font-semibold text-[#6B7280] hover:text-[#1A1A2E] px-5 py-2.5 rounded-xl border border-[#E8EAED] hover:border-[#C8CDD5] transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

export function AdminDashboard({ username }: { username: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Modal state
  const [showAdd, setShowAdd] = useState(false);
  const [editTool, setEditTool] = useState<Tool | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/tools");
    const data = await res.json();
    setTools(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTools(); }, [fetchTools]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleAdd = async (data: any) => {
    setSaving(true);
    await fetch("/api/admin/tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setShowAdd(false);
    fetchTools();
  };

  const handleEdit = async (data: any) => {
    if (!editTool) return;
    setSaving(true);
    await fetch(`/api/admin/tools/${editTool._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setEditTool(null);
    fetchTools();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/tools/${deleteId}`, { method: "DELETE" });
    setDeleting(false);
    setDeleteId(null);
    fetchTools();
  };

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: tools.length,
    trending: tools.filter(t => t.isTrending).length,
    newTools: tools.filter(t => t.isNewTool).length,
    free: tools.filter(t => t.pricingModel === "Free").length,
  };

  const PRICING_COLORS: Record<string, string> = {
    Free: "bg-emerald-50 text-emerald-700",
    Freemium: "bg-[#FFFBEA] text-[#7A5200]",
    Paid: "bg-[#F4F6F8] text-[#6B7280]",
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1A1A2E] flex flex-col flex-shrink-0 min-h-screen">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F5C842] rounded-lg flex items-center justify-center font-bold text-[#1A1A2E] text-sm">AI</div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">Grid Admin</p>
              <p className="text-white/40 text-[10px]">@{username}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {([
            { id: "overview", label: "Overview",  Icon: FiBarChart2 },
            { id: "tools",    label: "All Tools", Icon: FiTool },
          ] as { id: Tab; label: string; Icon: any }[]).map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left ${
                tab === id ? "bg-[#F5C842] text-[#1A1A2E]" : "text-white/60 hover:text-white hover:bg-white/5"
              }`}>
              <Icon className="w-4 h-4 flex-shrink-0" />{label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={handleLogout} disabled={loggingOut}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full">
            <FiLogOut className="w-4 h-4" />
            {loggingOut ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1A1A2E]">Dashboard Overview</h1>
                <p className="text-[#6B7280] text-sm mt-1">Live data from MongoDB — edits reflect on the website instantly.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Tools",   value: stats.total,    Icon: FiTool,       color: "bg-[#F5C842]/20 text-[#7A5200]" },
                  { label: "Trending",      value: stats.trending, Icon: FiTrendingUp, color: "bg-[#EBF8FE] text-[#1A6B8A]" },
                  { label: "New This Week", value: stats.newTools, Icon: FiGrid,       color: "bg-[#FFFBEA] text-[#7A5200]" },
                  { label: "Free Tools",    value: stats.free,     Icon: FiDollarSign, color: "bg-emerald-50 text-emerald-700" },
                ].map(({ label, value, Icon, color }) => (
                  <div key={label} className="bg-white border border-[#E8EAED] rounded-2xl p-5">
                    <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-[#1A1A2E]">{value}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-[#E8EAED] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-[#1A1A2E]">Recent Tools</h2>
                  <button onClick={() => setTab("tools")} className="text-xs font-semibold text-[#7DD3F0] hover:text-[#4BB8E0]">Manage all →</button>
                </div>
                <div className="flex flex-col gap-2">
                  {tools.slice(0, 8).map(t => (
                    <div key={t._id} className="flex items-center justify-between py-2 border-b border-[#F4F6F8] last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{t.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-[#1A1A2E]">{t.name}</p>
                          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">{t.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {t.isTrending && <span className="text-[9px] font-bold bg-[#EBF8FE] text-[#1A6B8A] px-2 py-0.5 rounded-full">Trending</span>}
                        {t.isNewTool && <span className="text-[9px] font-bold bg-[#FFFBEA] text-[#7A5200] px-2 py-0.5 rounded-full">New</span>}
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${PRICING_COLORS[t.pricingModel] ?? ""}`}>{t.pricingModel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── TOOLS ── */}
          {tab === "tools" && (
            <>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#1A1A2E]">All Tools</h1>
                  <p className="text-[#6B7280] text-sm mt-1">{tools.length} tools in database</p>
                </div>
                <button onClick={() => setShowAdd(true)}
                  className="inline-flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#2D2D44] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  <FiPlus className="w-4 h-4" /> Add Tool
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or category…"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#C8CDD5] rounded-xl text-sm focus:outline-none focus:border-[#7DD3F0] focus:ring-2 focus:ring-[#7DD3F0]/20 bg-white transition"
                />
              </div>

              {loading ? (
                <div className="text-center py-20 text-[#9CA3AF]">Loading…</div>
              ) : (
                <div className="bg-white border border-[#E8EAED] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E8EAED] bg-[#F4F6F8]">
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Tool</th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Category</th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Pricing</th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Rating</th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Flags</th>
                          <th className="text-left px-5 py-3 text-xs font-bold text-[#6B7280] uppercase tracking-wide">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((tool, i) => (
                          <tr key={tool._id} className={`border-b border-[#E8EAED] hover:bg-[#FFFBEA]/50 transition-colors ${i % 2 === 0 ? "" : "bg-[#F4F6F8]/30"}`}>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-[#F4F6F8] border border-[#E8EAED] flex items-center justify-center overflow-hidden flex-shrink-0">
                                  {tool.logoUrl
                                    ? <img src={tool.logoUrl} alt={tool.name} className="w-6 h-6 object-contain" onError={e => { e.currentTarget.style.display="none"; }} />
                                    : <span className="text-sm">{tool.icon}</span>}
                                </div>
                                <div>
                                  <p className="font-semibold text-[#1A1A2E]">{tool.name}</p>
                                  <p className="text-[10px] text-[#9CA3AF] truncate max-w-[160px]">{tool.tagline}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <span className="text-xs text-[#6B7280] bg-[#F4F6F8] px-2 py-1 rounded-lg">{tool.category}</span>
                            </td>
                            <td className="px-5 py-3">
                              <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${PRICING_COLORS[tool.pricingModel] ?? "bg-[#F4F6F8] text-[#6B7280]"}`}>
                                {tool.pricingModel}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1">
                                <FiStar className="w-3 h-3 text-[#F5C842] fill-current" />
                                <span className="font-semibold text-[#1A1A2E]">{tool.rating}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex gap-1">
                                {tool.isTrending && <span className="text-[9px] font-bold bg-[#EBF8FE] text-[#1A6B8A] px-1.5 py-0.5 rounded-full">Trending</span>}
                                {tool.isNewTool && <span className="text-[9px] font-bold bg-[#FFFBEA] text-[#7A5200] px-1.5 py-0.5 rounded-full">New</span>}
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer"
                                  className="text-[#9CA3AF] hover:text-[#7DD3F0] transition-colors">
                                  <FiExternalLink className="w-4 h-4" />
                                </a>
                                <button onClick={() => setEditTool(tool)}
                                  className="text-[#9CA3AF] hover:text-[#1A1A2E] transition-colors">
                                  <FiEdit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => setDeleteId(tool._id)}
                                  className="text-[#9CA3AF] hover:text-red-500 transition-colors">
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Add Modal */}
      {showAdd && (
        <Modal title="Add New Tool" onClose={() => setShowAdd(false)}>
          <ToolForm initial={EMPTY_TOOL} onSave={handleAdd} onCancel={() => setShowAdd(false)} saving={saving} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTool && (
        <Modal title={`Edit — ${editTool.name}`} onClose={() => setEditTool(null)}>
          <ToolForm initial={editTool} onSave={handleEdit} onCancel={() => setEditTool(null)} saving={saving} />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-bold text-[#1A1A2E] text-lg mb-2">Delete this tool?</h3>
            <p className="text-[#6B7280] text-sm mb-6">This will remove it from the website immediately. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-[#E8EAED] rounded-xl text-sm font-semibold text-[#6B7280] hover:border-[#C8CDD5] transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50">
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

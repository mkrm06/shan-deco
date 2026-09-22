import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Calendar, Settings, LogOut, Plus, Pencil, Trash2, ChevronDown, ChevronUp, Search, AlertTriangle, Check, X, Eye, EyeOff } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts, packages as initialPackages } from "@/data";

const R = "#D51F32";
const ADMIN_EMAIL = "admin@shandecorations.lk";
const ADMIN_PASSWORD = "Shan@2025";

// ─── Admin Auth Store ─────────────────────────────────────────────────────────
interface AdminAuthState {
  isAdminLoggedIn: boolean;
  login: (email: string, pw: string) => boolean;
  logout: () => void;
}

const useAdminAuth = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdminLoggedIn: false,
      login: (email, pw) => {
        if (email.trim().toLowerCase() === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
          set({ isAdminLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdminLoggedIn: false }),
    }),
    { name: "shan-admin-auth" }
  )
);

// ─── Admin Product Store ──────────────────────────────────────────────────────
export type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  offer?: string;
  isRental: boolean;
  image: string;
  slug: string;
  featured: boolean;
};

export type AdminPackage = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  popular: boolean;
  image: string;
  slug: string;
  guestCapacity: string;
};

interface AdminStoreState {
  products: AdminProduct[];
  packages: AdminPackage[];
  updateProduct: (id: number, data: Partial<AdminProduct>) => void;
  deleteProduct: (id: number) => void;
  addProduct: (p: AdminProduct) => void;
  updatePackage: (id: number, data: Partial<AdminPackage>) => void;
}

const useAdminStore = create<AdminStoreState>()(
  persist(
    (set) => ({
      products: initialProducts.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        oldPrice: p.oldPrice != null ? p.oldPrice : undefined,
        stock: p.stock ?? 50,
        offer: p.offer ?? undefined,
        isRental: p.isRental ?? false,
        image: p.image,
        slug: p.slug,
        featured: p.featured ?? false,
      })),
      packages: initialPackages.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        available: true,
        popular: p.popular ?? false,
        image: p.image,
        slug: p.slug,
        guestCapacity: String(p.guestCapacity),
      })),
      updateProduct: (id, data) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)) })),
      deleteProduct: (id) =>
        set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      addProduct: (p) =>
        set((s) => ({ products: [...s.products, p] })),
      updatePackage: (id, data) =>
        set((s) => ({ packages: s.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...data } : pkg)) })),
    }),
    { name: "shan-admin-store" }
  )
);

// ─── Admin Login ──────────────────────────────────────────────────────────────
function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, pw);
      if (!ok) setError("Invalid email or password.");
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#171719" }}>
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-display text-3xl font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>Shan<em style={{ color: R }}>.</em></span>
          </Link>
          <p className="text-white/50 text-sm mt-2">Admin Control Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <h1 className="font-display text-2xl font-semibold text-white mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Admin Sign In</h1>

          {error && (
            <div className="flex items-center gap-2 bg-[#C94A4A]/15 border border-[#C94A4A]/30 rounded-xl px-4 py-3 mb-5">
              <AlertTriangle size={14} className="text-[#C94A4A] flex-shrink-0" />
              <span className="text-[#C94A4A] text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">Email Address</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="admin@shandecorations.lk" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-[#D51F32] transition-colors" required />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => { setPw(e.target.value); setError(""); }} placeholder="Enter admin password" className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/30 text-sm outline-none focus:border-[#D51F32] transition-colors" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-70" style={{ background: R }}>
            {loading ? "Signing in…" : "Sign In to Admin"}
          </button>

          <p className="text-center text-white/30 text-xs mt-4">
            Demo: admin@shandecorations.lk / Shan@2025
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
type Tab = "overview" | "products" | "packages" | "orders" | "bookings" | "settings";

function Sidebar({ tab, setTab, onLogout }: { tab: Tab; setTab: (t: Tab) => void; onLogout: () => void }) {
  const navItems: { label: string; id: Tab; icon: React.ReactNode }[] = [
    { label: "Overview", id: "overview", icon: <LayoutDashboard size={16} /> },
    { label: "Products & Stock", id: "products", icon: <Package size={16} /> },
    { label: "Event Packages", id: "packages", icon: <ShoppingBag size={16} /> },
    { label: "Orders", id: "orders", icon: <ShoppingBag size={16} /> },
    { label: "Bookings", id: "bookings", icon: <Calendar size={16} /> },
    { label: "Settings", id: "settings", icon: <Settings size={16} /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-white/10 flex flex-col min-h-screen sticky top-0" style={{ background: "#171719" }}>
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="block">
          <span className="font-display text-2xl font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>Shan<em style={{ color: R }}>.</em></span>
        </Link>
        <p className="text-white/40 text-xs mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${tab === item.id ? "text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`} style={tab === item.id ? { background: R } : {}}>
            {item.icon} {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function Overview({ products, packages }: { products: AdminProduct[]; packages: AdminPackage[] }) {
  const lowStock = products.filter((p) => p.stock <= 5);
  const outOfStock = products.filter((p) => p.stock <= 0);
  const rentals = products.filter((p) => p.isRental);

  const stats = [
    { label: "Total Products", value: products.length, color: "#3D8B62" },
    { label: "Rental Items", value: rentals.length, color: R },
    { label: "Low Stock Alerts", value: lowStock.length, color: "#D69E2E" },
    { label: "Event Packages", value: packages.length, color: "#6C63FF" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>Dashboard Overview</h2>
        <p className="text-[#6B6765] text-sm">Welcome back, Admin.</p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-[rgba(28,18,18,0.06)] shadow-sm">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-[#6B6765]">{s.label}</div>
          </div>
        ))}
      </div>

      {lowStock.length > 0 && (
        <div className="bg-[#FEF3C7] border border-[#D69E2E]/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-[#92400E]" />
            <h3 className="font-semibold text-[#92400E]">Low Stock Alerts ({lowStock.length})</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-white/60 rounded-xl px-4 py-2.5">
                <span className="text-sm font-semibold text-[#171719]">{p.name}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stock <= 0 ? "bg-[#C94A4A] text-white" : "bg-[#D69E2E] text-white"}`}>{p.stock <= 0 ? "OUT" : `${p.stock} left`}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[rgba(28,18,18,0.06)] p-6">
        <h3 className="font-semibold text-[#171719] mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[{ icon: "📦", text: "New order #SD-ORD-4521 placed", time: "2 min ago" }, { icon: "📅", text: "Booking for Mehandhi Function confirmed", time: "15 min ago" }, { icon: "💬", text: "New quotation request received", time: "1 hr ago" }, { icon: "⚠️", text: "Baby Crib Prop low stock alert (2 left)", time: "3 hrs ago" }].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-[rgba(28,18,18,0.06)] last:border-0">
              <span className="text-lg">{a.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-[#171719]">{a.text}</p>
              </div>
              <span className="text-xs text-[#6B6765] flex-shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Products Management ──────────────────────────────────────────────────────
function ProductsManagement() {
  const { products, updateProduct, deleteProduct } = useAdminStore();
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<AdminProduct>>({});
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "stock" | "price">("name");

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "stock") return a.stock - b.stock;
      if (sortBy === "price") return a.price - b.price;
      return a.name.localeCompare(b.name);
    });

  const startEdit = (p: AdminProduct) => {
    setEditId(p.id);
    setEditData({ price: p.price, stock: p.stock, offer: p.offer, isRental: p.isRental, featured: p.featured });
  };

  const saveEdit = () => {
    if (editId !== null) updateProduct(editId, editData);
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Products & Stock</h2>
          <p className="text-[#6B6765] text-sm mt-1">{products.length} products · {products.filter((p) => p.stock <= 0).length} out of stock</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6765]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none">
          <option value="name">Sort: Name</option>
          <option value="stock">Sort: Stock (Low→High)</option>
          <option value="price">Sort: Price</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-[rgba(28,18,18,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(28,18,18,0.06)] bg-[#FAF9F7]">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Product</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Price (LKR)</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Stock</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Type</th>
              <th className="text-left px-4 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">Offer Code</th>
              <th className="px-4 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(28,18,18,0.05)]">
            {filtered.map((p) =>
              editId === p.id ? (
                <tr key={p.id} className="bg-[#F4F1EE]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold text-[#171719] text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B6765] text-xs">{p.category}</td>
                  <td className="px-4 py-3">
                    <input type="number" value={editData.price ?? p.price} onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })} className="w-28 px-3 py-1.5 rounded-lg border border-[rgba(28,18,18,0.15)] text-sm outline-none" />
                  </td>
                  <td className="px-4 py-3">
                    <input type="number" value={editData.stock ?? p.stock} onChange={(e) => setEditData({ ...editData, stock: Number(e.target.value) })} className="w-20 px-3 py-1.5 rounded-lg border border-[rgba(28,18,18,0.15)] text-sm outline-none" min="0" />
                  </td>
                  <td className="px-4 py-3">
                    <select value={editData.isRental ? "rental" : "purchase"} onChange={(e) => setEditData({ ...editData, isRental: e.target.value === "rental" })} className="px-3 py-1.5 rounded-lg border border-[rgba(28,18,18,0.15)] text-sm outline-none">
                      <option value="purchase">Purchase</option>
                      <option value="rental">Rental</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input value={editData.offer ?? p.offer ?? ""} onChange={(e) => setEditData({ ...editData, offer: e.target.value || undefined })} placeholder="e.g. BABY15" className="w-28 px-3 py-1.5 rounded-lg border border-[rgba(28,18,18,0.15)] text-sm outline-none uppercase" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="p-1.5 rounded-lg text-white text-xs" style={{ background: "#3D8B62" }}><Check size={13} /></button>
                      <button onClick={() => setEditId(null)} className="p-1.5 rounded-lg bg-[#F4F1EE] text-[#C94A4A]"><X size={13} /></button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={p.id} className="hover:bg-[#FAF9F7] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-semibold text-[#171719] text-sm">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B6765]">{p.category}</td>
                  <td className="px-4 py-3 text-sm font-semibold" style={{ color: R }}>LKR {p.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.stock <= 0 ? "bg-[#C94A4A]/15 text-[#C94A4A]" : p.stock <= 5 ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#D1FAE5] text-[#065F46]"}`}>{p.stock <= 0 ? "Out of Stock" : `${p.stock} in stock`}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.isRental ? "bg-[#171719] text-white" : "bg-[#F4F1EE] text-[#6B6765]"}`}>{p.isRental ? "RENTAL" : "BUY"}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-[#6B6765]">{p.offer || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg hover:bg-[#F4F1EE] text-[#6B6765] hover:text-[#171719] transition-colors"><Pencil size={13} /></button>
                      {confirmDelete === p.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => { deleteProduct(p.id); setConfirmDelete(null); }} className="p-1.5 rounded-lg text-white text-xs" style={{ background: "#C94A4A" }}><Check size={13} /></button>
                          <button onClick={() => setConfirmDelete(null)} className="p-1.5 rounded-lg bg-[#F4F1EE] text-[#6B6765]"><X size={13} /></button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(p.id)} className="p-1.5 rounded-lg hover:bg-[#F4F1EE] text-[#C94A4A] transition-colors"><Trash2 size={13} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Packages Management ──────────────────────────────────────────────────────
function PackagesManagement() {
  const { packages, updatePackage } = useAdminStore();
  const [search, setSearch] = useState("");

  const filtered = packages.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Event Packages</h2>
        <p className="text-[#6B6765] text-sm mt-1">{packages.length} packages · {packages.filter((p) => !p.available).length} unavailable</p>
      </div>

      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6765]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-2xl overflow-hidden border shadow-sm transition-all ${!pkg.available ? "opacity-60 border-[#C94A4A]/30" : "border-[rgba(28,18,18,0.06)]"}`}>
            <div className="relative aspect-video overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-1 rounded-full text-white text-[10px] font-bold bg-[#171719]/70">{pkg.category}</span>
                {pkg.popular && <span className="px-2 py-1 rounded-full text-white text-[10px] font-bold" style={{ background: R }}>POPULAR</span>}
              </div>
              {!pkg.available && (
                <div className="absolute inset-0 bg-[#171719]/50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-[#C94A4A] px-4 py-2 rounded-full">UNAVAILABLE</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{pkg.name}</h3>
              <p className="text-xs text-[#6B6765] mb-3">{pkg.guestCapacity} guests</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="text-[10px] text-[#6B6765] font-semibold uppercase tracking-wider block mb-1">Price (LKR)</label>
                  <input
                    type="number"
                    defaultValue={pkg.price}
                    onBlur={(e) => updatePackage(pkg.id, { price: Number(e.target.value) })}
                    className="w-32 px-3 py-1.5 rounded-lg border border-[rgba(28,18,18,0.12)] text-sm font-semibold outline-none"
                    style={{ color: R }}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#6B6765] font-semibold uppercase tracking-wider block mb-1">Popular</label>
                  <button onClick={() => updatePackage(pkg.id, { popular: !pkg.popular })} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${pkg.popular ? "text-white" : "bg-[#F4F1EE] text-[#6B6765]"}`} style={pkg.popular ? { background: R } : {}}>
                    {pkg.popular ? "Yes" : "No"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => updatePackage(pkg.id, { available: !pkg.available })}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${pkg.available ? "border-2 border-[#C94A4A] text-[#C94A4A] hover:bg-[#C94A4A]/5" : "text-white"}`}
                style={!pkg.available ? { background: "#3D8B62" } : {}}
              >
                {pkg.available ? "Mark as Unavailable" : "Mark as Available"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Orders Tab (placeholder) ─────────────────────────────────────────────────
function OrdersTab() {
  const orders = [
    { id: "SD-ORD-4521", customer: "Amara Perera", items: "Baby Crib Prop x2", total: 14400, status: "pending", date: "16 Sep 2026" },
    { id: "SD-ORD-4520", customer: "Fathima Rifka", items: "Mehandhi Floor Cushion Set", total: 9500, status: "processing", date: "15 Sep 2026" },
    { id: "SD-ORD-4519", customer: "Thilini Silva", items: "Balloon Arch Kit x1", total: 3800, status: "delivered", date: "14 Sep 2026" },
  ];

  const statusColor = (s: string) => s === "delivered" ? "#3D8B62" : s === "processing" ? "#D69E2E" : R;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Orders</h2>
      <div className="bg-white rounded-2xl border border-[rgba(28,18,18,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(28,18,18,0.06)] bg-[#FAF9F7]">
              {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(28,18,18,0.05)]">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-[#FAF9F7] transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-[#6B6765]">{o.id}</td>
                <td className="px-5 py-4 font-semibold text-[#171719]">{o.customer}</td>
                <td className="px-5 py-4 text-[#6B6765] text-xs">{o.items}</td>
                <td className="px-5 py-4 font-bold text-sm" style={{ color: R }}>LKR {o.total.toLocaleString()}</td>
                <td className="px-5 py-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: statusColor(o.status) }}>{o.status}</span>
                </td>
                <td className="px-5 py-4 text-xs text-[#6B6765]">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Bookings Tab (placeholder) ───────────────────────────────────────────────
function BookingsTab() {
  const bookings = [
    { id: "SD-BK-201", customer: "Ruwani Perera", event: "Mehandhi Function", date: "22 Sep 2026", venue: "Colombo", status: "confirmed" },
    { id: "SD-BK-200", customer: "Mohamed Ismail", event: "Nikhah Ceremony", date: "28 Sep 2026", venue: "Kandy", status: "pending" },
    { id: "SD-BK-199", customer: "Thilini Silva", event: "Birthday (Girl)", date: "5 Oct 2026", venue: "Gampaha", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Event Bookings</h2>
      <div className="bg-white rounded-2xl border border-[rgba(28,18,18,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(28,18,18,0.06)] bg-[#FAF9F7]">
              {["Booking ID", "Customer", "Event Type", "Event Date", "Venue", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B6765] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(28,18,18,0.05)]">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-[#FAF9F7] transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-[#6B6765]">{b.id}</td>
                <td className="px-5 py-4 font-semibold text-[#171719]">{b.customer}</td>
                <td className="px-5 py-4 text-[#6B6765]">{b.event}</td>
                <td className="px-5 py-4 text-sm font-semibold text-[#171719]">{b.date}</td>
                <td className="px-5 py-4 text-xs text-[#6B6765]">{b.venue}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full text-white`} style={{ background: b.status === "confirmed" ? "#3D8B62" : R }}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function SettingsTab() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="font-display text-3xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Settings</h2>
      <div className="bg-white rounded-2xl border border-[rgba(28,18,18,0.06)] p-6 space-y-5">
        <h3 className="font-semibold text-[#171719]">Business Information</h3>
        {[["Business Name", "Shan Decorations"], ["Email", "info@shandecorations.lk"], ["Phone", "+94 77 123 4567"], ["Location", "Colombo, Sri Lanka"]].map(([label, val]) => (
          <div key={label}>
            <label className="text-xs font-semibold text-[#6B6765] uppercase tracking-wider block mb-1.5">{label}</label>
            <input defaultValue={val} className="w-full px-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none" />
          </div>
        ))}
        <button className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold" style={{ background: R }}>Save Changes</button>
      </div>
    </div>
  );
}

// ─── Admin Panel Shell ────────────────────────────────────────────────────────
function AdminPanel() {
  const { isAdminLoggedIn, logout } = useAdminAuth();
  const { products, packages } = useAdminStore();
  const [tab, setTab] = useState<Tab>("overview");

  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-[#FAF9F7]">
      <Sidebar tab={tab} setTab={setTab} onLogout={logout} />
      <main className="flex-1 p-8 overflow-auto">
        {tab === "overview" && <Overview products={products} packages={packages} />}
        {tab === "products" && <ProductsManagement />}
        {tab === "packages" && <PackagesManagement />}
        {tab === "orders" && <OrdersTab />}
        {tab === "bookings" && <BookingsTab />}
        {tab === "settings" && <SettingsTab />}
      </main>
    </div>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export function AdminLoginPage() {
  const { isAdminLoggedIn } = useAdminAuth();
  if (isAdminLoggedIn) return <Navigate to="/admin" replace />;
  return <AdminLogin />;
}

export default AdminPanel;

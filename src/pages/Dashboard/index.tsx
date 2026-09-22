import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, FileText, ShoppingBag, Heart, CreditCard, Bell, User, LogOut, ChevronRight, Download, MessageCircle } from "lucide-react";
import { useAuthStore, useUIStore, useNotificationStore, useWishlistStore } from "@/store";
import { bookings, quotations, orders } from "@/data";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "My Quotations", href: "/dashboard/quotations", icon: FileText },
  { label: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Confirmed: "bg-[#3D8B62]/10 text-[#3D8B62]",
    Completed: "bg-[#3D8B62]/10 text-[#3D8B62]",
    Pending: "bg-[#D69E2E]/10 text-[#D69E2E]",
    "Pending Review": "bg-[#D69E2E]/10 text-[#D69E2E]",
    Draft: "bg-[#6B6765]/10 text-[#6B6765]",
    Cancelled: "bg-[#C94A4A]/10 text-[#C94A4A]",
    Delivered: "bg-[#3D8B62]/10 text-[#3D8B62]",
    Dispatched: "bg-blue-100 text-blue-700",
    Processing: "bg-[#D69E2E]/10 text-[#D69E2E]",
    Paid: "bg-[#3D8B62]/10 text-[#3D8B62]",
    Unpaid: "bg-[#C94A4A]/10 text-[#C94A4A]",
  };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${map[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>;
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { addToast } = useUIStore();
  const notifications = useNotificationStore((s) => s.notifications);
  const unread = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    addToast("Logged out successfully.", "info");
    navigate("/");
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-16">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[rgba(28,26,24,0.06)]">
              {/* User info */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[rgba(28,26,24,0.08)]">
                <div className="w-12 h-12 rounded-full bg-[#D51F32]/20 flex items-center justify-center text-[#D51F32] font-bold text-lg">
                  {user?.name?.[0] || "U"}
                </div>
                <div>
                  <div className="font-semibold text-[#171719] text-sm">{user?.name || "Customer"}</div>
                  <div className="text-xs text-[#6B6765]">{user?.email}</div>
                </div>
              </div>

              <nav className="space-y-1">
                {navItems.map(({ label, href, icon: Icon }) => {
                  const active = location.pathname === href;
                  return (
                    <Link key={href} to={href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? "bg-[#D51F32] text-white" : "text-[#625E5C] hover:bg-[#F4F1EE]"}`}>
                      <Icon size={16} />
                      {label}
                      {label === "Notifications" && unread > 0 && (
                        <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white text-[#D51F32]" : "bg-[#C94A4A] text-white"}`}>{unread}</span>
                      )}
                    </Link>
                  );
                })}
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#C94A4A] hover:bg-[#F4F1EE] w-full text-left transition-all">
                  <LogOut size={16} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Dashboard</h1>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Upcoming Events", value: "1", color: "#D51F32", icon: Calendar },
          { label: "Pending Bookings", value: "1", color: "#D69E2E", icon: Calendar },
          { label: "Active Quotations", value: "2", color: "#3D8B62", icon: FileText },
          { label: "Recent Orders", value: "4", color: "#625E5C", icon: ShoppingBag },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-[rgba(28,26,24,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <Icon size={18} style={{ color }} />
              <span className="text-2xl font-display font-bold" style={{ color, fontFamily: "Poppins, sans-serif" }}>{value}</span>
            </div>
            <div className="text-xs text-[#6B6765] font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)] mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Recent Bookings</h3>
          <Link to="/dashboard/bookings" className="text-xs text-[#D51F32] font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
        </div>
        <div className="space-y-3">
          {bookings.slice(0, 2).map((b) => (
            <div key={b.id} className="flex items-center justify-between p-4 bg-[#F4F1EE] rounded-2xl">
              <div>
                <div className="font-semibold text-[#171719] text-sm">{b.eventType} Decoration</div>
                <div className="text-xs text-[#6B6765]">{new Date(b.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} • {b.venue}</div>
              </div>
              <StatusBadge status={b.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Recent Orders</h3>
          <Link to="/dashboard/orders" className="text-xs text-[#D51F32] font-medium flex items-center gap-1">View All <ChevronRight size={12} /></Link>
        </div>
        <div className="space-y-3">
          {orders.slice(0, 2).map((o) => (
            <div key={o.id} className="flex items-center justify-between p-4 bg-[#F4F1EE] rounded-2xl">
              <div>
                <div className="font-semibold text-[#171719] text-sm">{o.id}</div>
                <div className="text-xs text-[#6B6765]">{o.products.slice(0, 1).join(", ")}{o.products.length > 1 ? ` +${o.products.length - 1}` : ""}</div>
              </div>
              <div className="text-right">
                <StatusBadge status={o.orderStatus} />
                <div className="text-xs text-[#6B6765] mt-1">LKR {o.total.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bookings() {
  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-[#6B6765] mb-1">{b.id}</p>
                <h3 className="font-display text-xl text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>{b.eventType} Decoration</h3>
                <p className="text-sm text-[#6B6765] mt-0.5">{new Date(b.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} • {b.venue}</p>
              </div>
              <StatusBadge status={b.status} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[["Package", b.package], ["Total", `LKR ${b.total.toLocaleString()}`], ["Advance Paid", `LKR ${b.advance.toLocaleString()}`], ["Balance Due", `LKR ${b.balance.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} className="bg-[#F4F1EE] rounded-xl p-3">
                  <p className="text-[10px] text-[#6B6765] uppercase tracking-wider">{k}</p>
                  <p className="text-sm font-semibold text-[#171719] mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 rounded-lg border border-[rgba(28,26,24,0.12)] text-xs font-semibold text-[#171719] hover:bg-[#F4F1EE] flex items-center gap-1.5"><Download size={12} /> Download</button>
              <a href="https://wa.me/94771234567" className="px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5"><MessageCircle size={12} /> Contact Team</a>
              {b.status === "Pending" && <button className="px-4 py-2 rounded-lg border border-[#C94A4A] text-[#C94A4A] text-xs font-semibold hover:bg-[#C94A4A]/5">Cancel Request</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Quotations() {
  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Quotations</h1>
      <div className="space-y-4">
        {quotations.map((q) => (
          <div key={q.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)]">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs text-[#6B6765] mb-1">{q.id}</p>
                <h3 className="font-display text-xl text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>{q.event}</h3>
                <p className="text-sm text-[#6B6765] mt-0.5">{new Date(q.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <StatusBadge status={q.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[["Quoted Amount", `LKR ${q.amount.toLocaleString()}`], ["Advance", `LKR ${q.advance.toLocaleString()}`], ["Balance", `LKR ${q.balance.toLocaleString()}`]].map(([k, v]) => (
                <div key={k} className="bg-[#F4F1EE] rounded-xl p-3">
                  <p className="text-[10px] text-[#6B6765] uppercase tracking-wider">{k}</p>
                  <p className="text-sm font-semibold text-[#171719] mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-[rgba(28,26,24,0.12)] text-xs font-semibold text-[#171719] hover:bg-[#F4F1EE] flex items-center gap-1.5"><Download size={12} /> Download PDF</button>
              {q.status !== "Draft" && <button className="px-4 py-2 rounded-lg bg-[#D51F32] text-white text-xs font-semibold">Accept Quotation</button>}
              <a href="https://wa.me/94771234567" className="px-4 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5"><MessageCircle size={12} /> Contact Team</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Orders() {
  const orderTimeline = ["Placed", "Confirmed", "Processing", "Ready", "Dispatched", "Delivered"];

  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => {
          const stageIdx = orderTimeline.indexOf(o.orderStatus);
          return (
            <div key={o.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)]">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-[#6B6765] mb-1">{o.id}</p>
                  <p className="text-sm text-[#6B6765]">Ordered {new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="text-sm font-medium text-[#171719] mt-1">{o.products.join(", ")}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={o.orderStatus} />
                  <p className="text-sm font-bold text-[#171719] mt-2">LKR {o.total.toLocaleString()}</p>
                  <StatusBadge status={o.paymentStatus} />
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-0 mb-2 overflow-x-auto pb-1">
                {orderTimeline.map((stage, i) => (
                  <div key={stage} className="flex items-center flex-1 min-w-0">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0 ${i <= stageIdx ? "bg-[#D51F32] text-white" : "bg-[#F4F1EE] text-[#6B6765]"}`}>
                      {i <= stageIdx ? "✓" : i + 1}
                    </div>
                    {i < orderTimeline.length - 1 && <div className={`flex-1 h-0.5 ${i < stageIdx ? "bg-[#D51F32]" : "bg-[#E4CFA3]"}`} />}
                  </div>
                ))}
              </div>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {orderTimeline.map((stage, i) => (
                  <div key={stage} className={`text-[9px] flex-1 text-center min-w-[60px] ${i <= stageIdx ? "text-[#D51F32] font-semibold" : "text-[#6B6765]"}`}>{stage}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Payments() {
  const paymentData = [
    { id: "SD-PAY-001", booking: "SD-BK-10024", amount: 30000, method: "Bank Transfer", date: "2026-09-01", status: "Paid" },
    { id: "SD-PAY-002", booking: "SD-ORD-30012", amount: 7700, method: "Online", date: "2026-08-22", status: "Paid" },
    { id: "SD-PAY-003", booking: "SD-ORD-30008", amount: 8600, method: "Online", date: "2026-09-01", status: "Paid" },
    { id: "SD-PAY-004", booking: "SD-ORD-30005", amount: 8500, method: "Cash on Delivery", date: "2026-09-04", status: "Pending" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>Payments</h1>
      <div className="bg-white rounded-3xl shadow-sm border border-[rgba(28,26,24,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F4F1EE]">
              <tr>
                {["Payment ID", "Reference", "Amount", "Method", "Date", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[10px] font-bold text-[#6B6765] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(28,26,24,0.06)]">
              {paymentData.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF9F7]">
                  <td className="px-5 py-4 font-mono text-xs text-[#171719]">{p.id}</td>
                  <td className="px-5 py-4 text-xs text-[#6B6765]">{p.booking}</td>
                  <td className="px-5 py-4 font-bold text-[#171719]">LKR {p.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-[#625E5C]">{p.method}</td>
                  <td className="px-5 py-4 text-xs text-[#6B6765]">{new Date(p.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-5 py-4"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-4"><button className="text-xs text-[#D51F32] font-medium flex items-center gap-1"><Download size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Wishlist() {
  const { items, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  if (items.length === 0) return (
    <div className="text-center py-20">
      <Heart size={48} className="text-[#E4CFA3] mx-auto mb-4" />
      <h2 className="font-display text-3xl text-[#171719] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Your Wishlist Is Empty</h2>
      <p className="text-[#6B6765] text-sm mb-6">Save your favorite items for later.</p>
      <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm">Explore Shop</Link>
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Wishlist</h1>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[rgba(28,26,24,0.06)]">
            <div className="aspect-square overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-[10px] text-[#D51F32] font-bold tracking-wider uppercase">{item.category}</p>
              <h3 className="font-semibold text-[#171719] text-sm mt-0.5">{item.name}</h3>
              <p className="text-[#D51F32] font-bold text-sm mt-1">LKR {item.price.toLocaleString()}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => { addItem({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category }); addToast("Added to cart."); }} className="flex-1 py-2 rounded-lg bg-[#171719] text-white text-xs font-semibold hover:bg-[#D51F32] transition-colors">Add to Cart</button>
                <button onClick={() => { toggleItem(item); addToast("Removed from wishlist.", "info"); }} className="px-3 py-2 rounded-lg border border-[#C94A4A]/20 text-[#C94A4A] text-xs hover:bg-[#C94A4A]/5">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useCartStore } from "@/store";

function NotificationsPage() {
  const { notifications, markRead, markAllRead, deleteNotification } = useNotificationStore();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-[#171719] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>Notifications</h1>
        <button onClick={markAllRead} className="text-xs text-[#D51F32] font-semibold">Mark All Read</button>
      </div>
      <div className="space-y-3">
        {notifications.map((n) => {
          const iconMap: Record<string, string> = { booking: "📅", quotation: "📄", payment: "💳", offer: "🎁", order: "📦", system: "ℹ️" };
          return (
            <div key={n.id} className={`bg-white rounded-2xl p-5 shadow-sm border flex items-start gap-4 transition-all ${n.read ? "border-[rgba(28,26,24,0.06)]" : "border-[#D51F32]/30 bg-[#D51F32]/5"}`}>
              <div className="text-xl flex-shrink-0">{iconMap[n.type] || "🔔"}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-[#171719] text-sm">{n.title}</h4>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-[#D51F32]" />}
                </div>
                <p className="text-xs text-[#6B6765] mt-0.5">{n.message}</p>
                <p className="text-[10px] text-[#6B6765] mt-1">{n.time}</p>
              </div>
              <div className="flex gap-2">
                {!n.read && <button onClick={() => markRead(n.id)} className="text-xs text-[#D51F32] font-medium">Read</button>}
                <button onClick={() => deleteNotification(n.id)} className="text-xs text-[#C94A4A]">Delete</button>
              </div>
            </div>
          );
        })}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <Bell size={40} className="text-[#E4CFA3] mx-auto mb-3" />
            <p className="text-[#6B6765]">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Profile() {
  const { user } = useAuthStore();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", whatsapp: "", address: "", city: "" });
  const { addToast } = useUIStore();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("Profile updated successfully.");
  };

  return (
    <div>
      <h1 className="font-display text-4xl text-[#171719] font-medium mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>My Profile</h1>
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(28,26,24,0.06)]">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[rgba(28,26,24,0.08)]">
          <div className="w-20 h-20 rounded-full bg-[#D51F32]/20 flex items-center justify-center text-[#D51F32] font-bold text-2xl font-display" style={{ fontFamily: "Poppins, sans-serif" }}>
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h2 className="font-semibold text-[#171719]">{user?.name}</h2>
            <p className="text-sm text-[#6B6765]">{user?.email}</p>
            <button className="text-xs text-[#D51F32] font-medium mt-1">Change Photo</button>
          </div>
        </div>

        <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
          {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"], ["whatsapp", "WhatsApp Number", "tel"], ["address", "Address", "text"], ["city", "City", "text"]].map(([k, label, type]) => (
            <div key={k}>
              <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
              <input type={type} value={form[k as keyof typeof form]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
            </div>
          ))}
          <div className="sm:col-span-2 flex gap-3">
            <button type="submit" className="px-6 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Update Profile</button>
            <button type="button" className="px-6 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] font-semibold text-sm hover:bg-[#F4F1EE] transition-colors">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Route-based content
export default function Dashboard() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const renderContent = () => {
    if (location.pathname === "/dashboard/bookings") return <Bookings />;
    if (location.pathname === "/dashboard/quotations") return <Quotations />;
    if (location.pathname === "/dashboard/orders") return <Orders />;
    if (location.pathname === "/dashboard/payments") return <Payments />;
    if (location.pathname === "/dashboard/wishlist") return <Wishlist />;
    if (location.pathname === "/dashboard/notifications") return <NotificationsPage />;
    if (location.pathname === "/dashboard/profile") return <Profile />;
    return <Overview />;
  };

  return <DashboardLayout>{renderContent()}</DashboardLayout>;
}

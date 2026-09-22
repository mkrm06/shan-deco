import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ArrowRight, Check, Heart, Star } from "lucide-react";
import { products, productCategories, shopOffers } from "@/data";
import { useCartStore, useWishlistStore, useUIStore } from "@/store";

const R = "#D51F32";

// ─── Shop Page ────────────────────────────────────────────────────────────────
export function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [showRentals, setShowRentals] = useState<"all" | "purchase" | "rental">("all");

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addToast } = useUIStore();

  let filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && p.category !== category) return false;
    if (showRentals === "rental" && !p.isRental) return false;
    if (showRentals === "purchase" && p.isRental) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "name") return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handlePromo = () => {
    const key = promo.trim().toUpperCase();
    if (shopOffers[key]) {
      setPromoMsg({ text: `Code "${key}" gives ${shopOffers[key].discount}% off at checkout!`, ok: true });
    } else {
      setPromoMsg({ text: "Invalid promo code.", ok: false });
    }
  };

  const stockBadge = (stock: number | undefined) => {
    if (stock === undefined) return null;
    if (stock <= 0) return <span className="text-[9px] font-semibold text-white bg-[#C94A4A] px-1.5 py-0.5 rounded-full">Out of Stock</span>;
    if (stock <= 5) return <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">Only {stock} left</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] pt-20">
      {/* Promo banner */}
      <div className="py-3 text-center text-xs font-semibold tracking-wider text-white" style={{ background: R }}>
        🎉 Use <strong>SHOP30</strong> for 30% off · <strong>BABY15</strong> for baby props · <strong>WEDDING20</strong> for wedding rentals · <strong>MEHANDI10</strong> for Mehandhi props
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <h1 className="font-display text-4xl md:text-5xl font-medium text-[#171719] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Decoration Essentials</h1>
        <p className="text-[#6B6765] text-sm mb-8">Props, accessories, and rental items for every celebration.</p>

        {/* Promo code bar */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex border border-[rgba(28,18,18,0.12)] rounded-xl overflow-hidden">
            <input value={promo} onChange={(e) => setPromo(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handlePromo()} placeholder="Promo code" className="px-4 py-2.5 text-sm outline-none bg-white w-40" />
            <button onClick={handlePromo} className="px-4 py-2.5 text-xs font-semibold text-white" style={{ background: R }}>Apply</button>
          </div>
          {promoMsg && <p className={`text-xs font-semibold ${promoMsg.ok ? "text-[#3D8B62]" : "text-[#C94A4A]"}`}>{promoMsg.text}</p>}
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap items-start sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6765]" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none bg-white" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2.5 rounded-xl border border-[rgba(28,18,18,0.12)] text-sm outline-none bg-white text-[#171719]">
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
          <div className="flex rounded-xl border border-[rgba(28,18,18,0.12)] overflow-hidden text-xs font-semibold">
            {(["all", "purchase", "rental"] as const).map((t) => (
              <button key={t} onClick={() => setShowRentals(t)} className={`px-4 py-2.5 transition-colors ${showRentals === t ? "text-white" : "bg-white text-[#6B6765] hover:bg-[#F4F1EE]"}`} style={showRentals === t ? { background: "#171719" } : {}}>
                {t === "all" ? "All Items" : t === "rental" ? "Rentals Only" : "Buy Only"}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {["All", ...productCategories].map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${category === cat ? "text-white shadow" : "bg-[#F4F1EE] text-[#6B6765] hover:bg-[#F7DADD]"}`} style={category === cat ? { background: R } : {}}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-[#6B6765] mb-6">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[#6B6765]">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const outOfStock = (product.stock ?? 99) <= 0;
              return (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-[rgba(28,18,18,0.06)]">
                  <div className="relative aspect-square overflow-hidden">
                    <Link to={`/shop/${product.slug}`}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.offer && <span className="px-2 py-0.5 rounded-full text-white text-[9px] font-bold" style={{ background: R }}>USE {product.offer}</span>}
                      {!product.offer && product.oldPrice && <span className="px-2 py-0.5 rounded-full text-white text-[9px] font-bold bg-[#C94A4A]">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>}
                    </div>
                    {product.isRental && <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#171719] text-white text-[9px] font-bold">RENTAL</span>}
                    {outOfStock && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#C94A4A]">Out of Stock</span>
                      </div>
                    )}
                    <button onClick={() => { toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast(inWishlist ? "Removed from wishlist." : "Added to wishlist.", "info"); }} className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${inWishlist ? "text-white" : "bg-white/80 text-[#6B6765] hover:bg-white"}`} style={inWishlist ? { background: R } : {}}>
                      <Heart size={13} fill={inWishlist ? "#fff" : "none"} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] font-semibold tracking-wider uppercase mb-1" style={{ color: R }}>{product.category}</p>
                    <Link to={`/shop/${product.slug}`} className="text-sm font-semibold text-[#171719] leading-snug hover:text-[#D51F32] transition-colors line-clamp-2 block mb-2">{product.name}</Link>
                    <div className="mb-2">{stockBadge(product.stock)}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-sm" style={{ color: R }}>LKR {product.price.toLocaleString()}</span>
                      {product.oldPrice && <span className="text-[#6B6765] text-xs line-through">LKR {product.oldPrice.toLocaleString()}</span>}
                    </div>
                    <button disabled={outOfStock} onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast(`${product.isRental ? "Reserved" : "Added"}: ${product.name}`); }} className="w-full py-2 rounded-lg text-white text-xs font-semibold transition-opacity disabled:opacity-40" style={{ background: "#171719" }}>
                      {outOfStock ? "Unavailable" : product.isRental ? "Reserve" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────
export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "delivery" | "reviews">("description");
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addToast } = useUIStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <Link to="/shop" className="text-sm font-semibold" style={{ color: R }}>Back to Shop</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const outOfStock = (product.stock ?? 99) <= 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF9F7] pt-20">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#6B6765] hover:text-[#171719] mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Shop
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#F4F1EE]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.offer && <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-xs font-bold" style={{ background: R }}>USE CODE: {product.offer}</div>}
            {product.isRental && <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#171719] text-white text-xs font-bold">RENTAL ITEM</div>}
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: R }}>{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-medium text-[#171719] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">{[1,2,3,4,5].map((s) => <Star key={s} size={14} fill={R} style={{ color: R }} />)}</div>
              <span className="text-xs text-[#6B6765]">5.0 · 12 reviews</span>
            </div>

            {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
              <p className="text-xs font-semibold mb-3 px-3 py-1.5 bg-[#FEF3C7] text-[#92400E] rounded-lg w-fit">Only {product.stock} left in stock!</p>
            )}

            <div className="flex items-baseline gap-3 my-4">
              <span className="text-3xl font-bold" style={{ color: R }}>LKR {product.price.toLocaleString()}</span>
              {product.oldPrice && <span className="text-[#6B6765] line-through text-lg">LKR {product.oldPrice.toLocaleString()}</span>}
            </div>

            {product.offer && shopOffers[product.offer] && (
              <div className="bg-[#F4F1EE] border border-[rgba(196,18,48,0.2)] rounded-xl p-3 mb-4 text-sm">
                <strong style={{ color: R }}>Special Offer:</strong> Use code <strong>{product.offer}</strong> at checkout for {shopOffers[product.offer].discount}% off!
              </div>
            )}

            {!product.isRental && (
              <div className="flex items-center gap-3 mb-5">
                <label className="text-sm font-semibold text-[#171719]">Qty</label>
                <div className="flex border border-[rgba(28,18,18,0.12)] rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2.5 text-sm font-bold text-[#6B6765] hover:bg-[#F4F1EE]">−</button>
                  <span className="px-5 py-2.5 text-sm font-semibold bg-white border-x border-[rgba(28,18,18,0.08)]">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock ?? 99, qty + 1))} className="px-4 py-2.5 text-sm font-bold text-[#6B6765] hover:bg-[#F4F1EE]">+</button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button disabled={outOfStock} onClick={() => { for (let i = 0; i < qty; i++) addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast(`Added ${qty}x ${product.name} to cart.`); }} className="flex-1 py-3.5 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40" style={{ background: "#171719" }}>
                {outOfStock ? "Out of Stock" : product.isRental ? "Reserve Now" : "Add to Cart"}
              </button>
              <button onClick={() => { toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast(inWishlist ? "Removed from wishlist." : "Saved to wishlist.", "info"); }} className="px-4 py-3.5 rounded-xl border-2 transition-all" style={{ borderColor: inWishlist ? R : "rgba(28,18,18,0.12)", background: inWishlist ? "#F4F1EE" : "white" }}>
                <Heart size={16} fill={inWishlist ? R : "none"} style={{ color: inWishlist ? R : "#6B6765" }} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[["Free Delivery", "On orders over LKR 10,000"], ["Secure Returns", "7-day return policy"], [product.isRental ? "Rental Deposit" : "Quality Assured", product.isRental ? "Deposit required on pickup" : "Premium materials guaranteed"], ["Fast Processing", "1–2 days dispatch"]].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F4F1EE]">
                  <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: R }} />
                  <div>
                    <p className="text-xs font-semibold text-[#171719]">{title}</p>
                    <p className="text-[10px] text-[#6B6765]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[rgba(28,18,18,0.1)] mb-6">
          <div className="flex gap-6">
            {(["description", "delivery", "reviews"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm font-semibold capitalize border-b-2 transition-all ${tab === t ? "border-[#D51F32] text-[#D51F32]" : "border-transparent text-[#6B6765] hover:text-[#171719]"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="mb-16 text-sm text-[#6B6765] leading-relaxed max-w-2xl">
          {tab === "description" && <p>{"description" in product && product.description ? String(product.description) : "Premium quality decoration item, carefully crafted for your special occasion."}</p>}
          {tab === "delivery" && <div className="space-y-3"><p><strong className="text-[#171719]">Standard Delivery:</strong> 3–5 business days across Sri Lanka.</p><p><strong className="text-[#171719]">Express:</strong> 1–2 business days (additional charge).</p><p><strong className="text-[#171719]">Free Delivery:</strong> Orders over LKR 10,000.</p>{product.isRental && <p><strong className="text-[#171719]">Rental Returns:</strong> Items must be returned within agreed rental period. Security deposit required.</p>}</div>}
          {tab === "reviews" && <div><div className="flex items-center gap-3 mb-6"><div className="text-5xl font-bold text-[#171719]">5.0</div><div><div className="flex mb-1">{[1,2,3,4,5].map((s) => <Star key={s} size={16} fill={R} style={{ color: R }} />)}</div><p className="text-xs text-[#6B6765]">Based on 12 reviews</p></div></div><div className="space-y-4">{[{ name: "Amara P.", text: "Absolutely beautiful! Used for my daughter's birthday.", date: "Oct 2025" }, { name: "Fathima R.", text: "Perfect for our Mehandhi ceremony. Will order again.", date: "Sep 2025" }].map((r) => (<div key={r.name} className="p-4 bg-[#F4F1EE] rounded-xl"><div className="flex justify-between mb-2"><strong className="text-sm text-[#171719]">{r.name}</strong><span className="text-xs text-[#6B6765]">{r.date}</span></div><p className="text-xs">{r.text}</p></div>))}</div></div>}
        </div>

        {related.length > 0 && (
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link key={p.id} to={`/shop/${p.slug}`} className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all border border-[rgba(28,18,18,0.06)]">
                  <div className="aspect-square overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-4"><p className="text-sm font-semibold text-[#171719] mb-1 leading-snug">{p.name}</p><span className="text-sm font-bold" style={{ color: R }}>LKR {p.price.toLocaleString()}</span></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { services, packages, products } from "@/data";

export default function SearchModal() {
  const { searchOpen, toggleSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();
  const results = q.length > 1 ? [
    ...services.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 3).map((s) => ({ label: s.name, sub: "Service", href: `/services/${s.slug}` })),
    ...packages.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3).map((p) => ({ label: p.name, sub: "Package", href: `/packages/${p.slug}` })),
    ...products.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 3).map((p) => ({ label: p.name, sub: p.category, href: `/product/${p.slug}` })),
  ] : [];

  const go = (href: string) => { navigate(href); toggleSearch(); setQuery(""); };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" onClick={toggleSearch}>
      <div className="absolute inset-0 bg-[#171719]/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center px-5 py-4 border-b border-[rgba(28,26,24,0.08)]">
          <Search size={18} className="text-[#D51F32] flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, packages, products..."
            className="flex-1 ml-3 text-[#171719] placeholder-[#6B6765] text-sm outline-none bg-transparent font-body"
          />
          <button onClick={toggleSearch}><X size={18} className="text-[#6B6765] hover:text-[#171719]" /></button>
        </div>

        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map((r, i) => (
              <li key={i}>
                <button onClick={() => go(r.href)} className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#F4F1EE] transition-colors text-left">
                  <span className="text-sm text-[#171719] font-medium">{r.label}</span>
                  <span className="text-xs text-[#D51F32] font-medium">{r.sub}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.length > 1 ? (
          <p className="px-5 py-8 text-center text-[#6B6765] text-sm">No results for "{query}"</p>
        ) : (
          <div className="px-5 py-6">
            <p className="text-xs text-[#6B6765] uppercase tracking-wider mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Wedding Decoration", "Birthday Package", "Balloons", "Engagement", "Fairy Lights"].map((term) => (
                <button key={term} onClick={() => setQuery(term)} className="px-3 py-1.5 rounded-full bg-[#F4F1EE] text-[#625E5C] text-xs font-medium hover:bg-[#E4CFA3] transition-colors">{term}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

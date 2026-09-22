import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { packages } from "@/data";

const eventTypes = ["All", "Wedding", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Corporate"];
const sortOptions = [{ label: "Popular", value: "popular" }, { label: "Price: Low to High", value: "asc" }, { label: "Price: High to Low", value: "desc" }];

function PackagesList() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("popular");

  let list = filter === "All" ? packages : packages.filter((p) => p.category === filter);
  if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Packages</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Event Packages
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {eventTypes.map((et) => (
            <button key={et} onClick={() => setFilter(et)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === et ? "bg-[#171719] text-white" : "bg-[#F4F1EE] text-[#625E5C] hover:bg-[#E4CFA3]"}`}>
              {et}
            </button>
          ))}
        </div>
        <div className="flex justify-end mb-8">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-2 rounded-lg border border-[rgba(28,26,24,0.1)] text-sm text-[#171719] bg-white focus:outline-none">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {pkg.popular && <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D51F32] text-white text-[10px] font-bold tracking-wider">POPULAR</span>}
                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${pkg.status === "available" ? "bg-[#3D8B62] text-white" : "bg-[#D69E2E] text-white"}`}>
                  {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                </span>
              </div>
              <div className="p-6">
                <p className="text-[10px] text-[#D51F32] font-semibold tracking-wider uppercase mb-1">{pkg.category}</p>
                <h2 className="font-display text-xl font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{pkg.name}</h2>
                <p className="text-xs text-[#6B6765] mb-3">{pkg.guestCapacity} guests • {pkg.theme} • {pkg.indoor ? "Indoor" : "Outdoor"}</p>
                <div className="text-[#D51F32] font-bold mb-4">
                  {pkg.startingPrice ? "From " : ""}LKR {pkg.price.toLocaleString()}
                </div>
                <ul className="grid grid-cols-2 gap-1.5 mb-5">
                  {pkg.features.slice(0, 6).map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-[#625E5C]">
                      <Check size={10} className="text-[#D51F32] flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <Link to={`/packages/${pkg.slug}`} className="flex-1 py-2.5 text-center rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] text-sm font-semibold hover:bg-[#F4F1EE] transition-colors">
                    View Details
                  </Link>
                  <Link to="/booking" className="flex-1 py-2.5 text-center rounded-xl bg-[#D51F32] text-white text-sm font-semibold hover:bg-[#B81628] transition-colors">
                    Book Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageDetail() {
  const { slug } = useParams();
  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center">
        <h2 className="font-display text-3xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Package Not Found</h2>
        <Link to="/packages" className="text-[#D51F32] font-medium">Browse All Packages</Link>
      </div>
    </div>
  );

  const related = packages.filter((p) => p.category === pkg.category && p.id !== pkg.id).slice(0, 3);

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-16">
      <div className="relative h-[50vh] min-h-[360px]">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-[1400px] mx-auto">
          <p className="text-[#D51F32] text-xs font-semibold tracking-wider uppercase mb-2">{pkg.category} Package</p>
          <h1 className="font-display text-5xl text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>{pkg.name}</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[["Guest Capacity", `Up to ${pkg.guestCapacity}`], ["Event Type", pkg.category], ["Venue Type", pkg.indoor ? "Indoor" : "Outdoor"]].map(([k, v]) => (
                <div key={k} className="bg-[#F4F1EE] rounded-2xl p-4">
                  <p className="text-xs text-[#6B6765] mb-1">{k}</p>
                  <p className="font-semibold text-[#171719]">{v}</p>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Package Includes</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#625E5C]">
                  <Check size={14} className="text-[#D51F32] flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            {related.length > 0 && (
              <>
                <h3 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Related Packages</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r.id} to={`/packages/${r.slug}`} className="group rounded-2xl overflow-hidden bg-[#F4F1EE] hover:shadow-md transition-all">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-[#171719]">{r.name}</p>
                        <p className="text-xs text-[#D51F32] mt-0.5">LKR {r.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-[rgba(28,26,24,0.08)] rounded-3xl p-6 shadow-sm">
              <div className="text-2xl font-display font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                From LKR {pkg.price.toLocaleString()}
              </div>
              <p className="text-xs text-[#6B6765] mb-5">Customizable • Final price on consultation</p>
              <div className="space-y-3">
                <Link to="/booking" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">
                  Book This Package <ArrowRight size={16} />
                </Link>
                <Link to="/request-quote" className="flex items-center justify-center w-full py-3.5 rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] font-semibold hover:bg-[#F4F1EE] transition-colors">
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Packages() {
  const { slug } = useParams();
  return slug ? <PackageDetail /> : <PackagesList />;
}

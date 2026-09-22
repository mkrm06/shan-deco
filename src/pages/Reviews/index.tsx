import { useState } from "react";
import { Star } from "lucide-react";
import { testimonials } from "@/data";

const filters = ["All", "Wedding", "Birthday", "Engagement", "Corporate"];

export default function Reviews() {
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? testimonials : testimonials.filter((t) => t.event === filter);

  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: testimonials.filter((t) => t.rating >= r).length,
    pct: Math.round((testimonials.filter((t) => t.rating === r).length / testimonials.length) * 100),
  }));

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Client Feedback</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Customer Reviews</h1>
        </div>

        {/* Overall rating */}
        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center mb-14 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="font-display text-8xl font-medium text-[#D51F32]" style={{ fontFamily: "Poppins, sans-serif" }}>4.9</div>
            <div className="flex justify-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="#D51F32" className="text-[#D51F32]" />)}
            </div>
            <p className="text-sm text-[#6B6765] mt-2">{testimonials.length} reviews</p>
          </div>
          <div className="space-y-2">
            {ratingDist.map((r) => (
              <div key={r.rating} className="flex items-center gap-3">
                <div className="flex gap-0.5 flex-shrink-0">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={10} fill="#D51F32" className="text-[#D51F32]" />)}
                </div>
                <div className="flex-1 bg-[#F4F1EE] rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-[#D51F32] rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-xs text-[#6B6765] w-8 text-right">{r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f ? "bg-[#171719] text-white" : "bg-[#F4F1EE] text-[#625E5C] hover:bg-[#E4CFA3]"}`}>{f}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {list.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)] hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={14} fill="#D51F32" className="text-[#D51F32]" />)}
              </div>
              <p className="text-sm text-[#625E5C] leading-relaxed italic mb-4">"{review.review}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(28,26,24,0.06)]">
                <img src={review.photo} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-[#171719] text-sm">{review.name}</p>
                  <p className="text-xs text-[#D51F32]">{review.event} Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

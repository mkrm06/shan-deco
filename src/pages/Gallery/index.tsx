import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryProjects } from "@/data";

const filters = ["All", "Wedding", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Corporate", "Custom"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? galleryProjects : galleryProjects.filter((p) => p.category === active);
  const lbIndex = lightbox !== null ? filtered.findIndex((p) => p.id === lightbox) : -1;

  const prev = () => {
    if (lbIndex > 0) setLightbox(filtered[lbIndex - 1].id);
    else setLightbox(filtered[filtered.length - 1].id);
  };
  const next = () => {
    if (lbIndex < filtered.length - 1) setLightbox(filtered[lbIndex + 1].id);
    else setLightbox(filtered[0].id);
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Our Gallery
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${active === f ? "bg-[#171719] text-white" : "bg-[#F4F1EE] text-[#625E5C] hover:bg-[#E4CFA3]"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((proj, i) => (
            <div
              key={proj.id}
              className="group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer relative"
              onClick={() => setLightbox(proj.id)}
            >
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ aspectRatio: i % 5 === 0 ? "3/4" : "4/3" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-semibold">{proj.name}</p>
                <p className="text-white/70 text-xs">{proj.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && lbIndex >= 0 && (
        <div className="fixed inset-0 z-[100] bg-[#171719]/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/70 hover:text-white">
              <X size={28} />
            </button>
            <img src={filtered[lbIndex].image} alt={filtered[lbIndex].name} className="w-full max-h-[70vh] object-contain rounded-2xl" />
            <div className="mt-4 text-center">
              <h3 className="text-white font-display text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>{filtered[lbIndex].name}</h3>
              <p className="text-white/60 text-sm mt-1">{filtered[lbIndex].theme} • {filtered[lbIndex].location}</p>
            </div>
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

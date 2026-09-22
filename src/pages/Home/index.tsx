import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { services, packages, testimonials, galleryProjects, birthdaySubcategories } from "@/data";
import { useCartStore, useWishlistStore, useUIStore, } from "@/store";
import { products } from "@/data";

const R = "#D51F32"; // brand red

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#171719]">
      <div className="absolute inset-0">
        <img src={services[0].image} alt="Premium wedding stage decoration" className="w-full h-full object-cover opacity-35" style={{ transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px) scale(1.05)`, transition: "transform 0.8s ease-out" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171719]/95 via-[#171719]/65 to-[#171719]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/80 via-transparent to-transparent" />
      </div>

      {/* Decorative ring */}
      <div className="absolute top-1/3 right-[18%] w-72 h-72 rounded-full border border-[#D51F32]/25 animate-float hidden lg:block" />
      <div className="absolute top-1/4 right-[22%] w-44 h-44 rounded-full border border-[#D51F32]/12 animate-float hidden lg:block" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-[#D51F32]/30 bg-[#D51F32]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D51F32] animate-pulse" />
            <span className="text-[#F7DADD] text-[11px] font-semibold tracking-[0.2em] uppercase">Premium Event Styling & Decoration</span>
          </div>

          <h1 className="font-display text-white leading-[0.95] mb-6" style={{ fontSize: "clamp(52px, 7vw, 100px)", fontWeight: 500, letterSpacing: "-0.03em", fontFamily: "Poppins, sans-serif" }}>
            Turning Special<br />
            <em className="not-italic" style={{ color: R }}>Moments</em> Into<br />
            Beautiful<br />
            Memories.
          </h1>

          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
            Elegant decorations for weddings, Mehandhi, Nikhah, birthdays, gender reveals, and every celebration across Sri Lanka.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/services" className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 transition-all shadow-lg" style={{ background: R, color: "#fff", boxShadow: `0 8px 24px ${R}40` }}>
              Explore Decorations <ArrowRight size={16} />
            </Link>
            <Link to="/booking" className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 transition-all">
              Book Your Event
            </Link>
          </div>

          <Link to="/gallery" className="inline-flex items-center gap-2 text-white/50 text-sm font-medium hover:text-[#F7DADD] transition-colors">
            View Our Portfolio <ArrowRight size={14} />
          </Link>

          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            {[["250+", "Events Styled"], ["100+", "Decoration Themes"], ["4.9", "Customer Rating"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-display font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{num}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-4 items-end">
          <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10" style={{ transform: `translate(${mouse.x * -0.5}px, ${mouse.y * -0.5}px)`, transition: "transform 0.6s ease-out" }}>
            <img src={services[2].image} alt="Sri Lankan Mehandhi stage decoration" className="w-full h-full object-cover" />
          </div>
          <div className="w-52 h-40 rounded-2xl overflow-hidden shadow-xl border border-white/10 -mt-16 mr-4" style={{ transform: `translate(${mouse.x * -0.8}px, ${mouse.y * -0.8}px)`, transition: "transform 0.4s ease-out" }}>
            <img src={services[6].image} alt="Premium birthday balloon decoration" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

// ─── Event Category Selector ─────────────────────────────────────────────────
const categories = [
  { name: "Wedding", image: services[0].image, desc: "Timeless wedding decorations that capture the magic of your special day.", icon: "💍" },
  { name: "Traditional Sri Lankan", image: services[1].image, desc: "Authentic Poruwa ceremonies and Kandyan cultural decoration setups.", icon: "🪔" },
  { name: "Mehandhi", image: services[2].image, desc: "Vibrant boho Mehandhi setups with mandaps, lanterns, and floor cushions.", icon: "🌸" },
  { name: "Waleema", image: services[3].image, desc: "Grand Waleema receptions blending Islamic tradition with modern luxury.", icon: "🕌" },
  { name: "Nikhah", image: services[4].image, desc: "Simple, elegant, spiritually beautiful Nikhah ceremony setups.", icon: "☪️" },
  { name: "Birthday", image: services[6].image, desc: "Magical birthday atmospheres for boys, girls, teens, and milestones.", icon: "🎂" },
  { name: "Gender Reveal", image: services[7].image, desc: "Dramatic smoke, balloon drops, and confetti reveal stations.", icon: "🎀" },
  { name: "Holy Communion", image: services[9].image, desc: "Sacred white and gold setups for Communion and Baptism ceremonies.", icon: "✝️" },
  { name: "Corporate", image: services[11].image, desc: "Professional brand-aligned event environments for every occasion.", icon: "🏢" },
];

function CategorySelector() {
  const [active, setActive] = useState(0);
  const cur = categories[active];

  return (
    <section className="py-24 bg-[#FAF9F7] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>What Are You Celebrating?</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Choose Your Event</h2>
          </div>
          <Link to="/services" className="hidden sm:flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all" style={{ color: R }}>
            All Services <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <img src={cur.image} alt={cur.name} className="w-full h-full object-cover transition-all duration-700" key={active} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/85 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{cur.icon}</span>
                <h3 className="text-white text-3xl font-display font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>{cur.name}</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">{cur.desc}</p>
              <div className="flex gap-3">
                <Link to="/packages" className="px-4 py-2 rounded-lg text-white text-xs font-semibold" style={{ background: R }}>View Packages</Link>
                <Link to="/booking" className="px-4 py-2 rounded-lg border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors">Book Now</Link>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 max-h-[420px] lg:overflow-y-auto">
            {categories.map((cat, i) => (
              <button key={cat.name} onClick={() => setActive(i)} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${i === active ? "text-white shadow-lg" : "bg-[#F4F1EE] text-[#6B6765] hover:bg-[#F7DADD]"}`} style={i === active ? { background: "#171719" } : {}}>
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Birthday Subcategories ───────────────────────────────────────────────────
function BirthdaySection() {
  return (
    <section className="py-20 bg-[#F4F1EE]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>For Every Age</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Birthday Decoration Themes</h2>
          <p className="text-[#6B6765] text-sm mt-3 max-w-xl mx-auto">From the tiniest birthday to the grandest milestone — we have the perfect setup for every age.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {birthdaySubcategories.map((sub) => (
            <Link key={sub.id} to={`/packages?category=Birthday-${sub.id.charAt(0).toUpperCase() + sub.id.slice(1)}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-3 w-full" style={{ background: sub.color }} />
              <div className="p-6 flex-1">
                <div className="text-4xl mb-3">{sub.icon}</div>
                <h3 className="font-display text-xl font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{sub.label}</h3>
                <div className="text-xs font-semibold mb-2 px-2 py-0.5 rounded-full inline-block text-white" style={{ background: sub.color }}>{sub.age}</div>
                <p className="text-sm text-[#6B6765] leading-relaxed">{sub.desc}</p>
              </div>
              <div className="px-6 pb-5">
                <span className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: sub.color }}>
                  View Packages <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Services ────────────────────────────────────────────────────────
function FeaturedServices() {
  return (
    <section className="py-24 bg-[#FAF9F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Our Services</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Designed For Every Celebration</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((svc, i) => <ServiceCard key={svc.id} service={svc} index={i} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 font-semibold text-sm hover:text-white transition-all" style={{ borderColor: R, color: R } as React.CSSProperties} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = R; (e.currentTarget as HTMLElement).style.color = "#fff"; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = R; }}>
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * 6, y: -((e.clientX - r.left) / r.width - 0.5) * 6 });
  };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transitionDelay: `${index * 20}ms` }}>
      <div className="aspect-[4/3] overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{service.icon}</span>
          <h3 className="font-display font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>{service.name}</h3>
        </div>
        <p className="text-xs text-[#6B6765] leading-relaxed mb-4">{service.shortDesc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: R }}>From LKR {service.startingPrice.toLocaleString()}</span>
          <Link to={`/services/${service.slug}`} className="text-xs font-semibold text-[#171719] flex items-center gap-1 group-hover:text-[#D51F32] transition-colors">
            Explore <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Featured Packages ────────────────────────────────────────────────────────
function FeaturedPackages() {
  const featured = packages.filter((p) => p.popular).slice(0, 4);
  return (
    <section className="py-24 bg-[#F4F1EE]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Top Picks</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Premium Event Packages</h2>
          </div>
          <Link to="/packages" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: R }}>All Packages <ArrowRight size={14} /></Link>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {featured.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {pkg.popular && <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold tracking-wider" style={{ background: R }}>POPULAR</span>}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#171719]/80 text-white text-[10px] font-medium">{pkg.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{pkg.name}</h3>
                <p className="text-xs text-[#6B6765] mb-3">{pkg.guestCapacity} guests • {pkg.indoor ? "Indoor" : "Outdoor"}</p>
                <div className="font-bold text-sm mb-3" style={{ color: R }}>{pkg.startingPrice ? "From " : ""}LKR {pkg.price.toLocaleString()}</div>
                <ul className="space-y-1 mb-4">
                  {pkg.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#625E5C]">
                      <Check size={11} style={{ color: R, flexShrink: 0 }} /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <Link to={`/packages/${pkg.slug}`} className="flex-1 py-2 text-center rounded-lg border border-[rgba(28,26,24,0.12)] text-[#171719] text-xs font-semibold hover:bg-[#F4F1EE] transition-colors">View</Link>
                  <Link to="/booking" className="flex-1 py-2 text-center rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity" style={{ background: R }}>Book</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Before/After ─────────────────────────────────────────────────────────────
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const move = (x: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(Math.max(((x - r.left) / r.width) * 100, 5), 95));
  };

  return (
    <section className="py-24 bg-[#171719]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Transformation</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white" style={{ fontFamily: "Poppins, sans-serif" }}>See The Difference</h2>
          <p className="text-white/50 text-sm mt-3">Drag the slider to reveal the transformation</p>
        </div>
        <div ref={ref} className="relative h-[360px] md:h-[480px] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl" onMouseDown={() => { drag.current = true; }} onMouseMove={(e) => { if (drag.current) move(e.clientX); }} onMouseUp={() => { drag.current = false; }} onMouseLeave={() => { drag.current = false; }} onTouchMove={(e) => move(e.touches[0].clientX)}>
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop&auto=format" alt="After" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: R }}>After Shan Decorations</div>
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop&auto=format" alt="Before" className="absolute inset-0 h-full object-cover" style={{ width: `${10000 / pos}%` }} />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-[#171719]/70 text-white text-xs font-semibold">Before</div>
          </div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <ChevronLeft size={12} className="text-[#171719]" /><ChevronRight size={12} className="text-[#171719]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Preview ──────────────────────────────────────────────────────────
function GalleryPreview() {
  return (
    <section className="py-24 bg-[#FAF9F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Our Portfolio</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Recent Work</h2>
          </div>
          <Link to="/gallery" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: R }}>View Gallery <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {galleryProjects.slice(0, 6).map((proj, i) => (
            <Link key={proj.id} to="/gallery" className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "md:row-span-2" : ""}`} style={{ aspectRatio: i === 0 ? undefined : "4/3", minHeight: i === 0 ? "340px" : undefined }}>
              <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-semibold">{proj.name}</p>
                <p className="text-white/70 text-xs">{proj.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const whyItems = [
  { icon: "✦", title: "Creative Designs", desc: "Every decoration uniquely crafted to match your vision." },
  { icon: "◈", title: "Premium Materials", desc: "Only the finest quality flowers, fabrics, and décor elements." },
  { icon: "⊕", title: "All Traditions", desc: "Weddings, Mehandhi, Nikhah, Waleema, Poruwa — we cover them all." },
  { icon: "◎", title: "On-Time Setup", desc: "We arrive early and deliver impeccable results, every time." },
  { icon: "✿", title: "Experienced Team", desc: "5+ years transforming events across Sri Lanka." },
  { icon: "❋", title: "Affordable Packages", desc: "Luxury decoration at accessible prices for every budget." },
];

function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F4F1EE]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Why Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Excellence In Every Detail</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyItems.map((item) => (
            <div key={item.title} className="glass p-7 rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform" style={{ color: R }}>{item.icon}</div>
              <h3 className="font-display text-xl font-semibold text-[#171719] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{item.title}</h3>
              <p className="text-sm text-[#6B6765] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Shop Preview ─────────────────────────────────────────────────────────────
function ShopPreview() {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addToast } = useUIStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-[#FAF9F7]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Decoration Store</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Shop Decoration Essentials</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm font-medium" style={{ color: R }}>Visit Shop <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => {
            const inWishlist = isInWishlist(product.id);
            return (
              <div key={product.id} className="group bg-[#F4F1EE] rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.oldPrice && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[9px] font-bold bg-[#C94A4A]">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>}
                  {product.offer && <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-white text-[9px] font-bold" style={{ background: R }}>OFFER</span>}
                  {product.isRental && <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#171719] text-white text-[9px] font-bold">RENTAL</span>}
                  <button onClick={() => { toggleItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast(inWishlist ? "Removed from wishlist." : "Added to wishlist.", "info"); }} className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all text-sm ${inWishlist ? "text-white" : "bg-white/80 text-[#6B6765] hover:bg-white"}`} style={inWishlist ? { background: R } : {}}>♥</button>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: R }}>{product.category}</p>
                  <h4 className="text-sm font-semibold text-[#171719] mb-2 leading-snug">{product.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-sm" style={{ color: R }}>LKR {product.price.toLocaleString()}</span>
                    {product.oldPrice && <span className="text-[#6B6765] text-xs line-through">LKR {product.oldPrice.toLocaleString()}</span>}
                  </div>
                  <button onClick={() => { addItem({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category }); addToast("Added to cart."); }} className="w-full py-2 rounded-lg text-white text-xs font-semibold hover:opacity-90 transition-opacity" style={{ background: "#171719" }}>
                    {product.isRental ? "Reserve" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all" style={{ borderColor: R, color: R }}>
            Visit Full Shop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  return (
    <section className="py-24 bg-[#171719]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-2" style={{ color: R }}>Client Stories</p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-white" style={{ fontFamily: "Poppins, sans-serif" }}>What Our Clients Say</h2>
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-8">
          <div className="flex justify-center mb-4">{Array.from({ length: testimonials[idx].rating }).map((_, i) => <Star key={i} size={16} fill={R} style={{ color: R }} />)}</div>
          <p className="text-white/80 italic leading-relaxed mb-8" style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontFamily: "Poppins, sans-serif" }}>"{testimonials[idx].review}"</p>
          <div className="flex items-center justify-center gap-3">
            <img src={testimonials[idx].photo} alt={testimonials[idx].name} className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: R + "60" }} />
            <div className="text-left">
              <div className="text-white font-semibold text-sm">{testimonials[idx].name}</div>
              <div className="text-xs" style={{ color: R }}>{testimonials[idx].event} Client</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#D51F32] hover:text-[#D51F32] transition-colors"><ChevronLeft size={18} /></button>
            <div className="flex gap-2">{testimonials.map((_, i) => <button key={i} onClick={() => setIdx(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i === idx ? R : "rgba(255,255,255,0.3)", width: i === idx ? "24px" : "8px" }} />)}</div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#D51F32] hover:text-[#D51F32] transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking CTA ──────────────────────────────────────────────────────────────
function BookingCTA() {
  return (
    <section className="py-24 bg-[#FAF9F7]">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: R }}>Ready To Celebrate?</p>
        <h2 className="font-display text-4xl md:text-6xl font-medium text-[#171719] mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>
          Let's Create Something<br />Unforgettable Together
        </h2>
        <p className="text-[#6B6765] text-base mb-10 max-w-xl mx-auto">Book a consultation or request a custom quote. Our team will reach out within 24 hours.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/booking" className="flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-all shadow-lg" style={{ background: R, boxShadow: `0 8px 24px ${R}30` }}>
            Book Your Event <ArrowRight size={16} />
          </Link>
          <Link to="/request-quote" className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 font-semibold hover:border-[#D51F32] hover:text-[#D51F32] transition-all border-[rgba(28,26,24,0.12)] text-[#171719]">
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Social Gallery ───────────────────────────────────────────────────────────
function SocialGallery() {
  return (
    <section className="py-16 bg-[#F4F1EE]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-[#6B6765] text-sm mb-1">Follow Our Latest Decorations</p>
          <a href="#" className="font-semibold text-lg font-display" style={{ color: R, fontFamily: "Poppins, sans-serif" }}>@ShanDecorations</a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {galleryProjects.slice(6, 12).map((proj) => (
            <a key={proj.id} href="#" className="group aspect-square relative overflow-hidden rounded-xl">
              <img src={proj.image} alt={proj.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: `${R}80` }}>
                <span className="text-white text-xs font-semibold">View Post</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <CategorySelector />
      <BirthdaySection />
      <FeaturedServices />
      <FeaturedPackages />
      <BeforeAfter />
      <GalleryPreview />
      <WhyChooseUs />
      <ShopPreview />
      <Testimonials />
      <BookingCTA />
      <SocialGallery />
    </>
  );
}

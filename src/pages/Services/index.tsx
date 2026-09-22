import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Star, Phone } from "lucide-react";
import { services, testimonials } from "@/data";

function ServicesList() {
  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="mb-14 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">What We Offer</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Our Decoration Services
          </h1>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div key={svc.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={svc.image} alt={svc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{svc.icon}</span>
                  <h2 className="font-display text-xl font-semibold text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>{svc.name}</h2>
                </div>
                <p className="text-sm text-[#6B6765] leading-relaxed mb-4">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D51F32] font-bold">From LKR {svc.startingPrice.toLocaleString()}</span>
                  <Link to={`/services/${svc.slug}`} className="flex items-center gap-1.5 text-sm font-semibold text-[#171719] hover:text-[#D51F32] transition-colors">
                    Explore <ArrowRight size={14} />
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

function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-[#FAF9F7]">
      <div className="text-center">
        <h2 className="font-display text-3xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Service Not Found</h2>
        <Link to="/services" className="text-[#D51F32] font-medium">Browse All Services</Link>
      </div>
    </div>
  );

  const relatedReviews = testimonials.filter((t) => t.event === service.category).slice(0, 2);

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/80 via-[#171719]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-[1400px] mx-auto">
          <p className="text-[#D51F32] text-xs font-semibold tracking-wider uppercase mb-2">{service.category}</p>
          <h1 className="font-display text-5xl text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>{service.name}</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <p className="text-[#625E5C] leading-relaxed text-base mb-8">{service.description}</p>

            <h3 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>What's Included</h3>
            <ul className="grid sm:grid-cols-2 gap-3 mb-10">
              {["Professional Setup & Teardown", "Design Consultation", "Premium Floral Arrangements", "Stage / Venue Decoration", "Ambient Lighting", "Welcome Board", "Photo Corner Setup", "Coordination Support"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#625E5C]">
                  <Check size={14} className="text-[#D51F32] flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>

            {relatedReviews.length > 0 && (
              <>
                <h3 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Client Reviews</h3>
                <div className="space-y-4">
                  {relatedReviews.map((r) => (
                    <div key={r.id} className="bg-[#F4F1EE] rounded-2xl p-5">
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={12} fill="#D51F32" className="text-[#D51F32]" />)}
                      </div>
                      <p className="text-sm text-[#625E5C] italic">"{r.review}"</p>
                      <p className="text-xs text-[#D51F32] font-semibold mt-2">— {r.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-[rgba(28,26,24,0.08)] rounded-3xl p-6 shadow-sm">
              <div className="text-2xl font-display font-semibold text-[#171719] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                From LKR {service.startingPrice.toLocaleString()}
              </div>
              <p className="text-xs text-[#6B6765] mb-5">Starting price • Final price based on requirements</p>

              <div className="space-y-3">
                <Link to="/booking" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">
                  Book This Service
                </Link>
                <Link to="/request-quote" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] font-semibold hover:bg-[#F4F1EE] transition-colors">
                  Request Quote
                </Link>
                <a href="https://wa.me/94771234567" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-semibold hover:opacity-90 transition-opacity">
                  <Phone size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { slug } = useParams();
  return slug ? <ServiceDetail /> : <ServicesList />;
}

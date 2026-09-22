import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const stats = [{ num: "250+", label: "Events Styled" }, { num: "100+", label: "Decoration Themes" }, { num: "5+", label: "Years Experience" }, { num: "4.9", label: "Average Rating" }];
const team = [
  { name: "Shan Perera", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format" },
  { name: "Dilrukshi Jayawardena", role: "Lead Floral Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format" },
  { name: "Kasun Fernando", role: "Event Coordinator", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format" },
  { name: "Thilini Silva", role: "Decoration Stylist", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&auto=format" },
];

export default function About() {
  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-16">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=700&fit=crop&auto=format" alt="About Shan Decorations" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/80 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 pb-16 w-full">
          <p className="text-[#D51F32] text-xs font-semibold tracking-wider uppercase mb-2">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
            We Create<br />Beautiful Moments
          </h1>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-4">Our Story</p>
            <h2 className="font-display text-4xl text-[#171719] font-medium mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
              Born From a Passion for Celebration
            </h2>
            <div className="space-y-4 text-[#625E5C] leading-relaxed">
              <p>Shan Decorations was founded in 2020 with a simple but powerful belief: every celebration deserves to be extraordinary. What began as a small floral decoration studio in Colombo quickly grew into Sri Lanka's most trusted premium event decoration company.</p>
              <p>Our founder, Shan Perera, began his journey creating small birthday arrangements from his parents' garage. A natural eye for design, an obsession with quality, and an unwavering commitment to client satisfaction transformed that humble start into a thriving creative studio.</p>
              <p>Today, we serve hundreds of clients across Sri Lanka — from intimate family celebrations to grand corporate galas — bringing the same level of passion and craftsmanship to every single event we touch.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=700&fit=crop&auto=format" alt="Our team at work" className="w-full rounded-3xl shadow-xl" />
            <div className="absolute -bottom-6 -left-6 bg-[#D51F32] text-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-display font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>5+</div>
              <div className="text-xs font-medium">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-8 bg-[#F4F1EE] rounded-3xl">
              <div className="font-display text-5xl font-medium text-[#D51F32] mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>{s.num}</div>
              <div className="text-sm text-[#6B6765] font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Philosophy */}
        <div className="text-center mb-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-3">Our Philosophy</p>
          <h2 className="font-display text-4xl text-[#171719] font-medium mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>Design With Intention</h2>
          <p className="text-[#625E5C] max-w-2xl mx-auto leading-relaxed">
            We believe decoration is more than placing flowers and fabric — it's storytelling. Every color we choose, every arch we build, every petal we place is guided by the unique story of the celebration we're designing for. This intentional approach is what sets our work apart.
          </p>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">The Team</p>
            <h2 className="font-display text-4xl text-[#171719] font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>Meet Our Creatives</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-full aspect-square rounded-3xl overflow-hidden mb-4 bg-[#F4F1EE]">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold text-[#171719] text-sm">{member.name}</h3>
                <p className="text-xs text-[#D51F32] mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#171719] rounded-3xl p-16">
          <h2 className="font-display text-4xl text-white font-medium mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Ready To Work With Us?</h2>
          <p className="text-white/60 text-sm mb-8">Let's create something extraordinary for your next celebration.</p>
          <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">
            Book a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

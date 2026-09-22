import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#171719] text-white/70">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="text-2xl font-display font-semibold tracking-widest text-white" style={{ fontFamily: "Poppins, sans-serif" }}>SHAN</div>
              <div className="text-[10px] tracking-[0.35em] font-body" style={{ color: "#D51F32" }}>DECORATIONS</div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/60">
              Sri Lanka's premier event decoration studio. We transform celebrations into timeless memories.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D51F32] transition-colors"><Share2 size={14} /></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D51F32] transition-colors text-xs font-bold">f</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#D51F32] transition-colors text-xs font-bold">▶</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[["Home", "/"], ["About Us", "/about"], ["Services", "/services"], ["Packages", "/packages"], ["Gallery", "/gallery"], ["Shop", "/shop"]].map(([label, href]) => (
                <li key={href}><Link to={href} className="hover:text-[#D51F32] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {[["Wedding Decoration", "/services/wedding-decoration"], ["Birthday Decoration", "/services/birthday-decoration"], ["Engagement", "/services/engagement-decoration"], ["Baby Shower", "/services/baby-shower-decoration"], ["Corporate Events", "/services/corporate-event-decoration"], ["Custom Events", "/services/custom-decoration"]].map(([label, href]) => (
                <li key={href}><Link to={href} className="hover:text-[#D51F32] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><Phone size={14} className="mt-0.5 text-[#D51F32] flex-shrink-0" /><span>+94 77 123 4567<br/>+94 11 234 5678</span></li>
              <li className="flex items-start gap-3"><Mail size={14} className="mt-0.5 text-[#D51F32] flex-shrink-0" /><span>hello@shandecorations.lk</span></li>
              <li className="flex items-start gap-3"><MapPin size={14} className="mt-0.5 text-[#D51F32] flex-shrink-0" /><span>No. 45, Galle Road,<br/>Colombo 03, Sri Lanka</span></li>
            </ul>
            <div className="mt-4 text-xs text-white/40">
              <div>Mon–Sat: 9:00 AM – 7:00 PM</div>
              <div>Sunday: 10:00 AM – 4:00 PM</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 Shan Decorations. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </footer>
  );
}

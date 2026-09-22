import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useUIStore } from "@/store";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addToast } = useUIStore();

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!form.name.trim()) e2.name = "Name is required";
    if (!form.email.includes("@")) e2.email = "Valid email required";
    if (!form.message.trim()) e2.message = "Message is required";
    if (Object.keys(e2).length) { setErrors(e2); return; }
    addToast("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Contact Us</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-12">
          {/* Info */}
          <div>
            <p className="text-[#625E5C] leading-relaxed mb-10">We'd love to hear about your event and help make it extraordinary. Reach out through any of the channels below or fill in the form and we'll respond within 24 hours.</p>

            <div className="space-y-5 mb-10">
              {[
                [<Phone size={18} />, "Phone & WhatsApp", "+94 77 123 4567\n+94 11 234 5678"],
                [<Mail size={18} />, "Email", "hello@shandecorations.lk"],
                [<MapPin size={18} />, "Visit Us", "No. 45, Galle Road, Colombo 03, Sri Lanka"],
                [<Clock size={18} />, "Opening Hours", "Mon–Sat: 9:00 AM – 7:00 PM\nSunday: 10:00 AM – 4:00 PM"],
              ].map(([icon, label, value]) => (
                <div key={label as string} className="flex gap-4 p-5 bg-[#F4F1EE] rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-[#D51F32]/10 flex items-center justify-center text-[#D51F32] flex-shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs font-bold text-[#171719] tracking-wider uppercase mb-1">{label as string}</p>
                    <p className="text-sm text-[#625E5C] whitespace-pre-line">{value as string}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden h-56 bg-[#E4CFA3] flex items-center justify-center">
              <div className="text-center text-[#625E5C]">
                <MapPin size={32} className="mx-auto mb-2 text-[#D51F32]" />
                <p className="text-sm font-medium">Colombo 03, Sri Lanka</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#D51F32] underline mt-1 block">Open in Google Maps</a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(28,26,24,0.06)] self-start">
            <h3 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Send Us a Message</h3>
            <div className="space-y-4">
              {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number (optional)", "tel"], ["subject", "Subject", "text"]].map(([k, label, type]) => (
                <div key={k}>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
                  <input type={type} value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors[k] ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                  {errors[k] && <p className="text-[#C94A4A] text-xs mt-1">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-[#625E5C] block mb-1">Message</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={5} placeholder="Tell us about your event..." className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] resize-none ${errors.message ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                {errors.message && <p className="text-[#C94A4A] text-xs mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

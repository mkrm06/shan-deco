import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUIStore } from "@/store";

const budgets = ["Under LKR 25,000", "LKR 25,000 – 50,000", "LKR 50,000 – 100,000", "LKR 100,000+", "Custom"];
const eventTypes = ["Wedding", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Corporate", "Custom"];

export default function Quote() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", eventType: "", date: "", venue: "", guests: "", budget: "", theme: "", colors: "", service: "", package: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!form.name.trim()) e2.name = "Name is required";
    if (!form.email.includes("@")) e2.email = "Valid email required";
    if (!form.eventType) e2.eventType = "Please select event type";
    if (Object.keys(e2).length) { setErrors(e2); return; }
    addToast("Quotation request submitted!");
    navigate("/");
  };

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Get a Quote</p>
          <h1 className="font-display text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Request a Quotation</h1>
          <p className="text-[#6B6765] text-sm mt-3">Fill in your event details and we'll send you a custom quote within 24 hours.</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(28,26,24,0.06)] space-y-6">
          {/* Contact */}
          <div>
            <h3 className="font-display text-xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Your Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["email", "Email Address", "email"]].map(([k, label, type]) => (
                <div key={k} className={k === "email" ? "sm:col-span-2" : ""}>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
                  <input type={type} value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors[k] ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                  {errors[k] && <p className="text-[#C94A4A] text-xs mt-1">{errors[k]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="font-display text-xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Event Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#625E5C] block mb-2">Event Type</label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((t) => (
                    <button key={t} type="button" onClick={() => update("eventType", t)} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${form.eventType === t ? "bg-[#D51F32] text-white" : "bg-[#F4F1EE] text-[#625E5C] hover:bg-[#E4CFA3]"}`}>{t}</button>
                  ))}
                </div>
                {errors.eventType && <p className="text-[#C94A4A] text-xs mt-1">{errors.eventType}</p>}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Event Date</label>
                  <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Venue</label>
                  <input value={form.venue} onChange={(e) => update("venue", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Guest Count</label>
                  <input type="number" value={form.guests} onChange={(e) => update("guests", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="font-display text-xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Budget Range</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {budgets.map((b) => (
                <button key={b} type="button" onClick={() => update("budget", b)} className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all text-left ${form.budget === b ? "border-[#D51F32] bg-[#F4F1EE] text-[#D51F32]" : "border-[rgba(28,26,24,0.1)] text-[#625E5C] hover:border-[#E4CFA3]"}`}>{b}</button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-[#625E5C] block mb-1">Special Requirements</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={4} placeholder="Describe your vision, theme preferences, or any special requirements..." className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32] resize-none" />
          </div>

          <button type="submit" className="w-full py-4 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors text-sm">Request My Quotation</button>
        </form>
      </div>
    </div>
  );
}

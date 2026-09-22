import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Calendar, MapPin, Users, Phone, ArrowRight } from "lucide-react";

const steps = ["Event Type", "Date & Time", "Venue", "Event Details", "Service", "Your Details", "Review"];
const eventTypes = ["Wedding", "Birthday", "Engagement", "Baby Shower", "Anniversary", "Corporate", "Other"];
const themes = ["Classic Floral", "Modern Minimalist", "Rustic Boho", "Royal Luxury", "Garden Fresh", "Tropical", "Vintage", "Custom"];
const colors = ["White & Gold", "Blush & Rose", "Blue & Silver", "Green & White", "Purple & Gold", "Red & Black", "Pastel Mix", "Other"];

interface BookingForm {
  eventType: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueType: "indoor" | "outdoor";
  guestCount: string;
  theme: string;
  preferredColors: string;
  specialReqs: string;
  serviceType: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export default function Booking() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<BookingForm>({
    eventType: "", eventDate: "", eventTime: "", venueName: "", venueAddress: "", venueCity: "", venueType: "indoor",
    guestCount: "", theme: "", preferredColors: "", specialReqs: "", serviceType: "package",
    name: "", phone: "", whatsapp: "", email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const update = (k: keyof BookingForm, v: string) => setForm({ ...form, [k]: v });

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0 && !form.eventType) e.eventType = "Please select an event type";
    if (step === 1 && !form.eventDate) e.eventDate = "Please select a date";
    if (step === 2 && !form.venueName) e.venueName = "Venue name is required";
    if (step === 3 && !form.guestCount) e.guestCount = "Guest count is required";
    if (step === 5) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.includes("@")) e.email = "Valid email required";
      if (form.phone.length < 9) e.phone = "Valid phone required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };
  const submit = () => {
    if (validate()) navigate("/booking-success");
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Start Planning</p>
          <h1 className="font-display text-5xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Book Your Event</h1>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between text-xs text-[#6B6765] mb-2">
            <span>Step {step + 1} of {steps.length}: {steps[step]}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 bg-[#F4F1EE] rounded-full overflow-hidden">
            <div className="h-full bg-[#D51F32] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[rgba(28,26,24,0.06)]">
          {/* Step 0: Event Type */}
          {step === 0 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>What Are You Celebrating?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {eventTypes.map((et) => (
                  <button key={et} onClick={() => update("eventType", et)} className={`py-4 px-4 rounded-2xl border-2 text-sm font-medium transition-all ${form.eventType === et ? "border-[#D51F32] bg-[#F4F1EE] text-[#D51F32]" : "border-[rgba(28,26,24,0.1)] text-[#625E5C] hover:border-[#E4CFA3]"}`}>
                    {et}
                  </button>
                ))}
              </div>
              {errors.eventType && <p className="text-[#C94A4A] text-xs mt-3">{errors.eventType}</p>}
            </div>
          )}

          {/* Step 1: Date */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>When Is Your Event?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-2 flex items-center gap-1"><Calendar size={12} /> Event Date</label>
                  <input type="date" value={form.eventDate} onChange={(e) => update("eventDate", e.target.value)} min={new Date().toISOString().split("T")[0]} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.eventDate ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                  {errors.eventDate && <p className="text-[#C94A4A] text-xs mt-1">{errors.eventDate}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-2">Preferred Time</label>
                  <input type="time" value={form.eventTime} onChange={(e) => update("eventTime", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
              </div>
              <div className="mt-6 p-4 bg-[#F4F1EE] rounded-2xl">
                <p className="text-xs text-[#6B6765]">📅 Availability is subject to confirmation. Our team will contact you within 24 hours to confirm your date.</p>
              </div>
            </div>
          )}

          {/* Step 2: Venue */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Where Is Your Event?</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1 flex items-center gap-1"><MapPin size={12} /> Venue Name</label>
                  <input value={form.venueName} onChange={(e) => update("venueName", e.target.value)} placeholder="e.g. Grand Ceylon Ballroom" className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.venueName ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                  {errors.venueName && <p className="text-[#C94A4A] text-xs mt-1">{errors.venueName}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Venue Address</label>
                  <input value={form.venueAddress} onChange={(e) => update("venueAddress", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">City</label>
                  <input value={form.venueCity} onChange={(e) => update("venueCity", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-2">Venue Type</label>
                  <div className="flex gap-3">
                    {(["indoor", "outdoor"] as const).map((t) => (
                      <button key={t} onClick={() => update("venueType", t)} className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${form.venueType === t ? "border-[#D51F32] bg-[#F4F1EE] text-[#D51F32]" : "border-[rgba(28,26,24,0.1)] text-[#625E5C]"}`}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Event Details */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Event Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1 flex items-center gap-1"><Users size={12} /> Approximate Guest Count</label>
                  <input type="number" value={form.guestCount} onChange={(e) => update("guestCount", e.target.value)} placeholder="e.g. 150" className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.guestCount ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                  {errors.guestCount && <p className="text-[#C94A4A] text-xs mt-1">{errors.guestCount}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-2">Preferred Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    {themes.map((t) => (
                      <button key={t} onClick={() => update("theme", t)} className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-left ${form.theme === t ? "border-[#D51F32] bg-[#F4F1EE] text-[#D51F32]" : "border-[rgba(28,26,24,0.1)] text-[#625E5C] hover:border-[#E4CFA3]"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-2">Preferred Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button key={c} onClick={() => update("preferredColors", c)} className={`py-1.5 px-3 rounded-full border text-xs font-medium transition-all ${form.preferredColors === c ? "border-[#D51F32] bg-[#D51F32] text-white" : "border-[rgba(28,26,24,0.1)] text-[#625E5C] hover:border-[#E4CFA3]"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Special Requirements</label>
                  <textarea value={form.specialReqs} onChange={(e) => update("specialReqs", e.target.value)} rows={3} placeholder="Any specific requests, accessibility needs, or additional information..." className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32] resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Service / Package */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>What Are You Looking For?</h2>
              <div className="space-y-3">
                {[["package", "📦", "Select a Package", "Choose from our pre-designed event packages"], ["service", "✦", "Book a Service", "Book a specific decoration service"], ["custom", "✨", "Custom Decoration", "Describe your vision and we'll create it"]].map(([val, icon, label, desc]) => (
                  <label key={val} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${form.serviceType === val ? "border-[#D51F32] bg-[#F4F1EE]" : "border-[rgba(28,26,24,0.1)] hover:border-[#E4CFA3]"}`}>
                    <input type="radio" name="serviceType" value={val} checked={form.serviceType === val} onChange={(e) => update("serviceType", e.target.value)} className="hidden" />
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="font-semibold text-[#171719] text-sm">{label}</div>
                      <div className="text-xs text-[#6B6765]">{desc}</div>
                    </div>
                    {form.serviceType === val && <Check size={16} className="text-[#D51F32] ml-auto" />}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Customer Details */}
          {step === 5 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Your Contact Details</h2>
              <div className="space-y-4">
                {[["name", "Full Name", "text"], ["phone", "Phone Number", "tel"], ["whatsapp", "WhatsApp Number", "tel"], ["email", "Email Address", "email"]].map(([k, label, type]) => (
                  <div key={k}>
                    <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
                    <input type={type} value={form[k as keyof BookingForm]} onChange={(e) => update(k as keyof BookingForm, e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors[k] ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                    {errors[k] && <p className="text-[#C94A4A] text-xs mt-1">{errors[k]}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div>
              <h2 className="font-display text-2xl text-[#171719] mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Review Your Booking</h2>
              <div className="space-y-3 text-sm">
                {[
                  ["Event Type", form.eventType, "🎉"],
                  ["Date", form.eventDate ? new Date(form.eventDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—", "📅"],
                  ["Venue", form.venueName ? `${form.venueName}, ${form.venueCity}` : "—", "📍"],
                  ["Guests", form.guestCount || "—", "👥"],
                  ["Theme", form.theme || "—", "✨"],
                  ["Service", form.serviceType, "📦"],
                  ["Contact", form.name ? `${form.name} — ${form.phone}` : "—", "📞"],
                ].map(([label, value, icon]) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-[#F4F1EE] rounded-xl">
                    <span>{icon}</span>
                    <span className="text-[#6B6765] w-28 flex-shrink-0">{label}</span>
                    <span className="font-medium text-[#171719]">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6B6765] mt-5 p-4 bg-[#F4F1EE] rounded-2xl">
                By submitting, our team will review your booking and contact you within 24 hours to confirm availability and discuss final pricing.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="px-6 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm font-semibold text-[#171719] hover:bg-[#F4F1EE] transition-colors">Back</button>}
            {step < steps.length - 1 && <button onClick={next} className="flex-1 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors flex items-center justify-center gap-2">Continue <ArrowRight size={16} /></button>}
            {step === steps.length - 1 && <button onClick={submit} className="flex-1 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Submit Booking Request</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingSuccess() {
  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F4F1EE] flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-[#D51F32]" />
        </div>
        <h1 className="font-display text-4xl font-medium text-[#171719] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Booking Request Submitted!</h1>
        <p className="text-[#6B6765] mb-2">Booking Reference: <strong className="text-[#D51F32]">SD-BK-10025</strong></p>
        <p className="text-sm text-[#6B6765] mb-8">Our team will review your request and contact you within 24 hours to confirm availability and discuss final details.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard/bookings" className="px-6 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm">View Booking</Link>
          <a href="https://wa.me/94771234567" className="px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2"><Phone size={14} /> WhatsApp Us</a>
          <Link to="/" className="px-6 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] font-semibold text-sm">Return Home</Link>
        </div>
      </div>
    </div>
  );
}

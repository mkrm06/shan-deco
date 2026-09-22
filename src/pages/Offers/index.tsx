import { Link } from "react-router-dom";
import { offers } from "@/data";
import { useUIStore } from "@/store";

export default function Offers() {
  const { addToast } = useUIStore();

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#D51F32] font-semibold font-body mb-2">Special Deals</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-[#171719]" style={{ fontFamily: "Poppins, sans-serif" }}>Current Offers</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-video overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171719]/70 to-transparent" />
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-[#D51F32] text-white font-bold text-sm">
                  {offer.discount}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-display text-2xl font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>{offer.title}</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#625E5C] mb-4">{offer.description}</p>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs text-[#6B6765]">Valid until: <strong className="text-[#171719]">{new Date(offer.validUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</strong></span>
                </div>
                {offer.code && (
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 bg-[#F4F1EE] rounded-xl px-4 py-2.5">
                      <span className="text-xs text-[#6B6765]">Promo Code: </span>
                      <span className="font-mono font-bold text-[#D51F32]">{offer.code}</span>
                    </div>
                    <button onClick={() => { navigator.clipboard?.writeText(offer.code); addToast("Promo code copied!"); }} className="px-4 py-2.5 rounded-xl bg-[#171719] text-white text-xs font-semibold hover:bg-[#D51F32] transition-colors">Copy</button>
                  </div>
                )}
                {offer.services.length > 0 ? (
                  <Link to="/booking" className="block w-full py-3 text-center rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Book Now & Save</Link>
                ) : (
                  <Link to="/shop" className="block w-full py-3 text-center rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Shop Now</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

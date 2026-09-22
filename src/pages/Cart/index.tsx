import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore, useUIStore } from "@/store";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const { addToast } = useUIStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SHOP30") { setDiscount(0.3); addToast("Coupon applied! 30% off."); }
    else if (coupon.toUpperCase() === "WELCOME10") { setDiscount(0.1); addToast("Coupon applied! 10% off."); }
    else addToast("Invalid coupon code.", "error");
  };

  const subtotal = total();
  const discountAmount = subtotal * discount;
  const delivery = subtotal > 10000 ? 0 : 500;
  const finalTotal = subtotal - discountAmount + delivery;

  if (items.length === 0) return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center max-w-sm">
        <ShoppingBag size={64} className="text-[#E4CFA3] mx-auto mb-6" />
        <h2 className="font-display text-3xl text-[#171719] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Your Cart Is Empty</h2>
        <p className="text-[#6B6765] text-sm mb-8">Your cart is waiting for something beautiful.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D51F32] text-white font-semibold">
          Explore Shop <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-medium text-[#171719] mb-10" style={{ fontFamily: "Poppins, sans-serif" }}>Shopping Cart</h1>

        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#D51F32] font-bold tracking-wider uppercase">{item.category}</p>
                  <h3 className="font-semibold text-[#171719] text-sm mt-0.5 truncate">{item.name}</h3>
                  <p className="text-[#D51F32] font-bold text-sm mt-1">LKR {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center border border-[rgba(28,26,24,0.12)] rounded-xl overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 hover:bg-[#F4F1EE] text-[#171719] font-bold text-sm">−</button>
                  <span className="px-3 py-2 text-sm font-semibold text-[#171719] border-x border-[rgba(28,26,24,0.12)]">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 hover:bg-[#F4F1EE] text-[#171719] font-bold text-sm">+</button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-[#171719] text-sm">LKR {(item.price * item.quantity).toLocaleString()}</p>
                  <button onClick={() => { removeItem(item.id); addToast("Item removed.", "info"); }} className="text-[#C94A4A] hover:text-[#b8393e] mt-2 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex gap-3 mt-4">
              <Link to="/shop" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm font-medium text-[#171719] hover:bg-[#F4F1EE] transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-[rgba(28,26,24,0.06)]">
              <h3 className="font-display text-xl font-semibold text-[#171719] mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>Order Summary</h3>

              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between text-[#625E5C]"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-[#3D8B62]"><span>Discount</span><span>-LKR {discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between text-[#625E5C]"><span>Delivery</span><span>{delivery === 0 ? "Free" : `LKR ${delivery}`}</span></div>
                <div className="flex justify-between text-[#171719] font-bold text-base pt-3 border-t border-[rgba(28,26,24,0.08)]">
                  <span>Total</span><span>LKR {Math.round(finalTotal).toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Promo Code" className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
                <button onClick={applyCoupon} className="px-4 py-2.5 rounded-xl bg-[#F4F1EE] text-[#171719] text-sm font-semibold hover:bg-[#E4CFA3] transition-colors">Apply</button>
              </div>

              <Link to="/checkout" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <p className="text-center text-[10px] text-[#6B6765] mt-4 flex items-center justify-center gap-1">
                🔒 Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

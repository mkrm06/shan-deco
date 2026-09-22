import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useCartStore, useUIStore } from "@/store";

const steps = ["Customer Details", "Payment", "Review", "Confirmation"];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", postal: "", notes: "", payment: "cod" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { items, total, clearCart } = useCartStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (form.phone.length < 9) e.phone = "Valid phone is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !validate()) return;
    setStep((s) => s + 1);
  };

  const placeOrder = () => {
    clearCart();
    addToast("Order placed successfully!");
    navigate("/order-success");
  };

  const subtotal = total();
  const delivery = subtotal > 10000 ? 0 : 500;
  const finalTotal = subtotal + delivery;

  if (items.length === 0 && step < 3) {
    return (
      <div className="bg-[#FAF9F7] min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Your cart is empty</h2>
          <Link to="/shop" className="text-[#D51F32] font-medium">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-display text-4xl font-medium text-[#171719] mb-10" style={{ fontFamily: "Poppins, sans-serif" }}>Checkout</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i < step ? "bg-[#D51F32] text-white" : i === step ? "bg-[#171719] text-white" : "bg-[#F4F1EE] text-[#6B6765]"}`}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <div className="flex-1 mx-2">
                <div className={`h-0.5 transition-all ${i < step ? "bg-[#D51F32]" : "bg-[#E4CFA3]"}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            {/* Step 0: Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Customer Details</h2>
                {[["name", "Full Name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["address", "Delivery Address", "text"], ["city", "City", "text"], ["postal", "Postal Code", "text"]].map(([k, label, type]) => (
                  <div key={k}>
                    <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
                    <input type={type} value={form[k as keyof typeof form]} onChange={(e) => update(k, e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors[k] ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
                    {errors[k] && <p className="text-[#C94A4A] text-xs mt-1">{errors[k]}</p>}
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-[#625E5C] block mb-1">Order Notes (optional)</label>
                  <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32] resize-none" />
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Payment Method</h2>
                <div className="space-y-3">
                  {[["cod", "💵", "Cash on Delivery", "Pay when your order arrives"], ["bank", "🏦", "Bank Transfer", "Transfer to our account after placing order"], ["online", "💳", "Online Payment", "Secure payment via card or payment gateway"]].map(([val, icon, label, desc]) => (
                    <label key={val} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${form.payment === val ? "border-[#D51F32] bg-[#F4F1EE]" : "border-[rgba(28,26,24,0.1)] hover:border-[#E4CFA3]"}`}>
                      <input type="radio" name="payment" value={val} checked={form.payment === val} onChange={(e) => update("payment", e.target.value)} className="hidden" />
                      <span className="text-2xl">{icon}</span>
                      <div>
                        <div className="font-semibold text-[#171719] text-sm">{label}</div>
                        <div className="text-xs text-[#6B6765]">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-[#6B6765] mt-4 flex items-center gap-1">🔒 Your payment information is secure</p>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Review Your Order</h2>
                <div className="bg-[#F4F1EE] rounded-2xl p-5 mb-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-[#6B6765]">Name</span><span className="font-medium">{form.name}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B6765]">Email</span><span className="font-medium">{form.email}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B6765]">Delivery</span><span className="font-medium">{form.address}, {form.city}</span></div>
                  <div className="flex justify-between"><span className="text-[#6B6765]">Payment</span><span className="font-medium capitalize">{form.payment === "cod" ? "Cash on Delivery" : form.payment === "bank" ? "Bank Transfer" : "Online Payment"}</span></div>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1 text-sm"><div className="font-medium text-[#171719]">{item.name}</div><div className="text-[#6B6765]">× {item.quantity}</div></div>
                      <div className="font-semibold text-[#171719] text-sm">LKR {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="px-6 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm font-semibold text-[#171719] hover:bg-[#F4F1EE] transition-colors">Back</button>}
              {step < 2 && <button onClick={next} className="flex-1 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Continue</button>}
              {step === 2 && <button onClick={placeOrder} className="flex-1 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm hover:bg-[#B81628] transition-colors">Place Order</button>}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 self-start bg-white rounded-3xl p-5 shadow-sm border border-[rgba(28,26,24,0.06)]">
            <h3 className="font-display text-lg font-semibold text-[#171719] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>Order Total</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-[#625E5C]"><span>Subtotal</span><span>LKR {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-[#625E5C]"><span>Delivery</span><span>{delivery === 0 ? "Free" : `LKR ${delivery}`}</span></div>
              <div className="flex justify-between font-bold text-[#171719] pt-2 border-t border-[rgba(28,26,24,0.08)]"><span>Total</span><span>LKR {finalTotal.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

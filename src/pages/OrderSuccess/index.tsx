import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function OrderSuccess() {
  const orderId = "SD-ORD-" + Math.floor(30000 + Math.random() * 10000);

  return (
    <div className="bg-[#FAF9F7] min-h-screen pt-24 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#3D8B62]/10 flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-[#3D8B62]" />
        </div>
        <h1 className="font-display text-4xl font-medium text-[#171719] mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Order Placed!</h1>
        <p className="text-[#6B6765] mb-2">Order Number: <strong className="text-[#D51F32]">{orderId}</strong></p>
        <p className="text-sm text-[#6B6765] mb-8">Thank you for your purchase. You'll receive a confirmation email shortly. Estimated delivery in 3–5 business days.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard/orders" className="px-6 py-3 rounded-xl bg-[#D51F32] text-white font-semibold text-sm">Track Order</Link>
          <Link to="/shop" className="px-6 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-[#171719] font-semibold text-sm">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

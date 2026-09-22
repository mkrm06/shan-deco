import { useUIStore } from "@/store";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: { id: string; message: string; type: string }; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const icons = { success: CheckCircle, error: XCircle, info: Info };
  const Icon = icons[toast.type as keyof typeof icons] || Info;
  const colors = {
    success: "border-l-[#3D8B62] bg-white",
    error: "border-l-[#C94A4A] bg-white",
    info: "border-l-[#D51F32] bg-white",
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border-l-4 min-w-[280px] max-w-[360px] transition-all duration-300 ${colors[toast.type as keyof typeof colors] || colors.info} ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
    >
      <Icon size={18} className={toast.type === "success" ? "text-[#3D8B62]" : toast.type === "error" ? "text-[#C94A4A]" : "text-[#D51F32]"} />
      <p className="text-sm text-[#171719] font-medium flex-1">{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="text-[#6B6765] hover:text-[#171719] transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}

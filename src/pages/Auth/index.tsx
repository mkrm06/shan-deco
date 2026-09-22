import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore, useUIStore } from "@/store";

function AuthLayout({ children, image }: { children: React.ReactNode; image: string }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img src={image} alt="Shan Decorations" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171719]/70 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="text-3xl font-display font-semibold tracking-widest text-white" style={{ fontFamily: "Poppins, sans-serif" }}>SHAN</div>
          <div className="text-[10px] tracking-[0.35em] font-body" style={{ color: "#D51F32" }}>DECORATIONS</div>
          <p className="text-white/60 text-sm mt-4 max-w-xs">Creating beautiful moments for every celebration across Sri Lanka.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-[#FAF9F7]">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!email.includes("@")) e2.email = "Valid email required";
    if (password.length < 6) e2.password = "Password must be at least 6 characters";
    if (Object.keys(e2).length) { setErrors(e2); return; }
    login(email, password);
    addToast("Welcome back to Shan Decorations!");
    navigate("/dashboard");
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&auto=format">
      <div>
        <h1 className="font-display text-4xl text-[#171719] font-medium mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Welcome Back</h1>
        <p className="text-[#6B6765] text-sm mb-8">Sign in to manage your bookings and orders.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#625E5C] block mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.email ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
            {errors.email && <p className="text-[#C94A4A] text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold text-[#625E5C] block mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.password ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6765] hover:text-[#171719]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-[#C94A4A] text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#625E5C] cursor-pointer">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-xs text-[#D51F32] hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">Sign In</button>
        </form>

        <p className="text-center text-sm text-[#6B6765] mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#D51F32] font-semibold hover:underline">Create Account</Link>
        </p>

        <div className="mt-6 p-4 bg-[#F4F1EE] rounded-xl text-xs text-[#6B6765] text-center">
          Demo: Enter any email & password (6+ chars) to log in
        </div>
      </div>
    </AuthLayout>
  );
}

export function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "", agree: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuthStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();

  const update = (k: string, v: string | boolean) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2: Record<string, string> = {};
    if (!form.name.trim()) e2.name = "Name is required";
    if (!form.email.includes("@")) e2.email = "Valid email required";
    if (form.phone.length < 9) e2.phone = "Valid phone required";
    if (form.password.length < 6) e2.password = "Min 6 characters";
    if (form.password !== form.confirm) e2.confirm = "Passwords do not match";
    if (!form.agree) e2.agree = "You must agree to the terms";
    if (Object.keys(e2).length) { setErrors(e2); return; }
    register(form.name, form.email, form.phone, form.password);
    addToast("Account created! Welcome to Shan Decorations.");
    navigate("/dashboard");
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1000&fit=crop&auto=format">
      <div>
        <h1 className="font-display text-4xl text-[#171719] font-medium mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Create Account</h1>
        <p className="text-[#6B6765] text-sm mb-8">Join Shan Decorations to manage bookings and orders.</p>

        <form onSubmit={submit} className="space-y-4">
          {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([k, label, type]) => (
            <div key={k}>
              <label className="text-xs font-semibold text-[#625E5C] block mb-1">{label}</label>
              <input type={type} value={form[k as keyof typeof form] as string} onChange={(e) => update(k, e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors[k] ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
              {errors[k] && <p className="text-[#C94A4A] text-xs mt-1">{errors[k]}</p>}
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-[#625E5C] block mb-1">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.password ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6765]"><Eye size={16} /></button>
            </div>
            {errors.password && <p className="text-[#C94A4A] text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold text-[#625E5C] block mb-1">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:border-[#D51F32] ${errors.confirm ? "border-[#C94A4A]" : "border-[rgba(28,26,24,0.12)]"}`} />
            {errors.confirm && <p className="text-[#C94A4A] text-xs mt-1">{errors.confirm}</p>}
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-0.5" />
            <span className="text-xs text-[#625E5C]">I agree to the <a href="#" className="text-[#D51F32] underline">Terms of Service</a> and <a href="#" className="text-[#D51F32] underline">Privacy Policy</a></span>
          </label>
          {errors.agree && <p className="text-[#C94A4A] text-xs">{errors.agree}</p>}
          <button type="submit" className="w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">Create Account</button>
        </form>

        <p className="text-center text-sm text-[#6B6765] mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#D51F32] font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { addToast } = useUIStore();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    addToast("Reset link sent to your email.");
    setSent(true);
  };

  return (
    <AuthLayout image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop&auto=format">
      <div>
        <h1 className="font-display text-4xl text-[#171719] font-medium mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Reset Password</h1>
        <p className="text-[#6B6765] text-sm mb-8">Enter your email and we'll send a reset link.</p>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#F4F1EE] flex items-center justify-center mx-auto mb-4">✉️</div>
            <h3 className="font-semibold text-[#171719] mb-2">Check Your Email</h3>
            <p className="text-sm text-[#6B6765]">We've sent a password reset link to <strong>{email}</strong></p>
            <Link to="/login" className="mt-6 inline-block text-[#D51F32] font-semibold text-sm">← Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#625E5C] block mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[rgba(28,26,24,0.12)] text-sm focus:outline-none focus:border-[#D51F32]" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold hover:bg-[#B81628] transition-colors">Send Reset Link</button>
            <Link to="/login" className="block text-center text-sm text-[#6B6765] hover:text-[#D51F32]">← Back to Login</Link>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}

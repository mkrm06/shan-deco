import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/common/SearchModal";
import ToastContainer from "@/components/common/Toast";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Packages from "@/pages/Packages";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Offers from "@/pages/Offers";
import Reviews from "@/pages/Reviews";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Booking, { BookingSuccess } from "@/pages/Booking";
import Quote from "@/pages/Quote";
import { ShopPage, ProductDetail } from "@/pages/Shop";
import { Login, Register, ForgotPassword } from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import OrderSuccess from "@/pages/OrderSuccess";
import AdminPanel, { AdminLoginPage } from "@/pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function SectionReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section, #root > div > section, #root > section"));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -48px" },
    );

    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("is-visible");
      } else {
        section.classList.add("reveal-section");
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div className="bg-[#FAF9F7] min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <div className="font-display text-[120px] text-[#F4F1EE] font-bold leading-none" style={{ fontFamily: "Poppins, sans-serif" }}>404</div>
        <h1 className="font-display text-4xl text-[#171719] font-medium mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
          Looks Like This Celebration<br />Has Moved Somewhere Else.
        </h1>
        <p className="text-[#6B6765] text-sm mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#D51F32] text-white font-semibold">Return Home</a>
      </div>
    </div>
  );
}

function AppShell() {
  const { pathname } = useLocation();
  const noShellRoutes = ["/login", "/register", "/forgot-password", "/admin", "/admin/login"];
  const hasShell = !noShellRoutes.some((r) => pathname.startsWith(r));

  return (
    <>
      <ScrollToTop />
      <SectionReveal />
      <SearchModal />
      <ToastContainer />
      {hasShell && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:slug" element={<Packages />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/shop/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/request-quote" element={<Quote />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:section" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {hasShell && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

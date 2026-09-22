import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, User, Menu, X, Bell } from "lucide-react";
import { useCartStore, useWishlistStore, useAuthStore, useUIStore, useNotificationStore } from "@/store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Offers", href: "/offers" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((s) => s.count());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { isAuthenticated } = useAuthStore();
  const { toggleSearch, toggleMobileMenu, mobileMenuOpen } = useUIStore();
  const notifications = useNotificationStore((s) => s.notifications);
  const unread = notifications.filter((n) => !n.read).length;
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent"
            : "bg-[rgba(255,253,248,0.92)] backdrop-blur-xl border-b border-[rgba(198,161,91,0.12)] shadow-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col leading-none">
              <span
                className={`font-display text-xl font-semibold tracking-widest transition-colors ${transparent ? "text-white" : "text-[#171719]"}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                SHAN
              </span>
              <span
                className="text-[10px] font-body tracking-[0.35em] font-medium"
                style={{ color: "#D51F32" }}
              >
                DECORATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.href || (link.href !== "/" && location.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 text-[11px] tracking-[0.12em] font-medium font-body uppercase transition-all duration-200 relative group ${
                    transparent ? "text-white/80 hover:text-white" : "text-[#6B6765] hover:text-[#171719]"
                  } ${active ? (transparent ? "text-white" : "text-[#D51F32]") : ""}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-3 right-3 h-px bg-[#D51F32] transition-transform origin-left duration-200 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-lg transition-colors ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[#6B6765] hover:text-[#171719] hover:bg-[#F4F1EE]"}`}
            >
              <Search size={18} />
            </button>

            <Link
              to="/dashboard/wishlist"
              className={`p-2 rounded-lg transition-colors relative ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[#6B6765] hover:text-[#171719] hover:bg-[#F4F1EE]"}`}
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D51F32] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className={`p-2 rounded-lg transition-colors relative ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[#6B6765] hover:text-[#171719] hover:bg-[#F4F1EE]"}`}
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D51F32] text-white rounded-full text-[9px] flex items-center justify-center font-bold animate-pulse-gold">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard/notifications"
                className={`p-2 rounded-lg transition-colors relative hidden sm:flex ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[#6B6765] hover:text-[#171719] hover:bg-[#F4F1EE]"}`}
              >
                <Bell size={18} />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C94A4A] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {unread}
                  </span>
                )}
              </Link>
            )}

            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className={`p-2 rounded-lg transition-colors ${transparent ? "text-white/80 hover:text-white hover:bg-white/10" : "text-[#6B6765] hover:text-[#171719] hover:bg-[#F4F1EE]"}`}
            >
              <User size={18} />
            </Link>

            <Link
              to="/booking"
              className="hidden lg:flex items-center px-4 py-2 ml-2 rounded-lg text-[11px] font-semibold tracking-[0.08em] uppercase transition-all duration-200 bg-[#D51F32] text-white hover:bg-[#B81628] shadow-sm"
            >
              Book Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg lg:hidden transition-colors ${transparent ? "text-white/80 hover:text-white" : "text-[#171719] hover:bg-[#F4F1EE]"}`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#FAF9F7] pt-16 overflow-y-auto" onClick={() => toggleMobileMenu()}>
          <div className="flex flex-col p-6 gap-1" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={toggleMobileMenu}
                className={`py-3 px-4 rounded-xl text-base font-medium font-body transition-colors ${location.pathname === link.href ? "bg-[#F4F1EE] text-[#D51F32]" : "text-[#171719] hover:bg-[#F4F1EE]"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-[rgba(28,26,24,0.1)]">
              <Link to="/booking" onClick={toggleMobileMenu} className="block w-full py-3 text-center rounded-xl bg-[#D51F32] text-white font-semibold tracking-wide">
                Book Your Event
              </Link>
              <Link to={isAuthenticated ? "/dashboard" : "/login"} onClick={toggleMobileMenu} className="block w-full py-3 text-center mt-2 rounded-xl border border-[rgba(28,26,24,0.1)] text-[#171719] font-medium">
                {isAuthenticated ? "My Account" : "Login / Register"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

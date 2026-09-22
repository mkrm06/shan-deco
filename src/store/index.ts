import { create } from "zustand";
import { persist } from "zustand/middleware";

// --- Types ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// --- Cart Store ---
interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({ items: get().items.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
        set({ isOpen: true });
        setTimeout(() => set({ isOpen: false }), 3000);
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({ items: get().items.map((i) => i.id === id ? { ...i, quantity } : i) });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "shan-cart" }
  )
);

// --- Wishlist Store ---
interface WishlistStore {
  items: WishlistItem[];
  isOpen: boolean;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: number) => boolean;
  toggleWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      isInWishlist: (id) => !!get().items.find((i) => i.id === id),
      toggleWishlist: () => set({ isOpen: !get().isOpen }),
    }),
    { name: "shan-wishlist" }
  )
);

// --- Auth Store ---
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, _password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, phone: string, _password: string) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, _password: string) => {
        // Demo login — accept any credentials
        set({ user: { id: "u1", name: "Dilrukshi Perera", email, phone: "+94 77 123 4567" }, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      register: (name: string, email: string, phone: string, _password: string) => {
        set({ user: { id: "u2", name, email, phone }, isAuthenticated: true });
        return true;
      },
    }),
    { name: "shan-auth" }
  )
);

// --- UI Store ---
interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface UIStore {
  toasts: Toast[];
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  toasts: [],
  searchOpen: false,
  mobileMenuOpen: false,
  addToast: (message, type = "success") => {
    const id = Math.random().toString(36).slice(2);
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => get().removeToast(id), 3500);
  },
  removeToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
  toggleSearch: () => set({ searchOpen: !get().searchOpen }),
  toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
}));

// --- Notification Store ---
interface NotificationStore {
  notifications: { id: number; type: string; title: string; message: string; time: string; read: boolean; link: string; }[];
  markRead: (id: number) => void;
  markAllRead: () => void;
  deleteNotification: (id: number) => void;
}

import { notifications as initialNotifications } from "@/data";

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: initialNotifications,
  markRead: (id) => set({ notifications: get().notifications.map((n) => n.id === id ? { ...n, read: true } : n) }),
  markAllRead: () => set({ notifications: get().notifications.map((n) => ({ ...n, read: true })) }),
  deleteNotification: (id) => set({ notifications: get().notifications.filter((n) => n.id !== id) }),
}));

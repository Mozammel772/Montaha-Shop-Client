"use client";

import { CartContextType, CartItem } from "@/types/cartItem.interface";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* ================= LOAD CART (SSR SAFE + NO EFFECT LOOP ISSUE) ================= */
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
          const parsed: CartItem[] = JSON.parse(savedCart);
          setCartItems(parsed);
        }
      } catch (error) {
        console.error("Cart parse error:", error);
      } finally {
        setHydrated(true);
      }
    };

    loadCart();
  }, []);

  /* ================= SAVE CART ================= */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("cart", JSON.stringify(cartItems));

    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: cartItems,
      }),
    );
  }, [cartItems, hydrated]);

  /* ================= ADD TO CART ================= */
  const addToCart = useCallback((newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedSize === newItem.selectedSize,
      );

      if (existingIndex !== -1) {
        const updated = [...prev];

        const newQty = updated[existingIndex].quantity + newItem.quantity;

        if (newQty > updated[existingIndex].stock) return prev;

        updated[existingIndex].quantity = newQty;
        return updated;
      }

      return [...prev, newItem];
    });
  }, []);

  /* ================= REMOVE ================= */
  const removeFromCart = useCallback((index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = useCallback((index: number, qty: number) => {
    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: qty > item.stock ? item.quantity : qty,
            }
          : item,
      ),
    );
  }, []);

  /* ================= CLEAR ================= */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  /* ================= TOTAL PRICE ================= */
  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  /* ================= CART COUNT ================= */
  const getCartCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  /* ================= CONTEXT VALUE ================= */
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

import { StaticImageData } from "next/image";

export interface CartItem {
  id: number;

  slug: string;

  title: string;

  shortTitle?: string;

  image: string | StaticImageData;

  price: number;

  oldPrice?: number;

  discount?: string;

  quantity: number;

  selectedColor?: string;

  selectedSize?: string;

  sku?: string;

  stock: number;
}

export interface CartContextType {
  cartItems: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (index: number) => void;

  updateQuantity: (index: number, newQuantity: number) => void;

  clearCart: () => void;

  getCartCount: () => number;

  getCartTotal: () => number;
}

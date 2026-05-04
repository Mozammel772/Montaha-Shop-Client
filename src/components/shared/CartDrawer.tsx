"use client";

import { useCart } from "@/hooks/useCart";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartDrawer({ open, setOpen }: Props) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  const totalPrice = getCartTotal();
  const totalItems = getCartCount();

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[9998] transition-all duration-300 ${
          open ? "opacity-100 visible " : "opacity-0 invisible "
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 z-[9999] h-screen w-full sm:w-[420px] bg-white flex flex-col transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="h-[72px] border-b border-gray-200 px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#0f3ea9]" />

            <h2 className="text-[24px] font-bold text-gray-800">
              Shopping Cart
            </h2>

            <span className="text-gray-500 font-medium text-[18px]">
              ({totalItems})
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* EMPTY */}
        {cartItems.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-300" />

            <h3 className="text-[22px] font-bold mt-4">Your cart is empty</h3>

            <p className="text-gray-500 mt-2 text-sm">
              Add products to your shopping cart.
            </p>
          </div>
        )}

        {/* ITEMS */}
        {cartItems.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#fafafa]">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex gap-3"
                >
                  {/* IMAGE */}
                  <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden border shrink-0 bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[14px] font-medium text-gray-800 line-clamp-2 leading-[20px]">
                        {item.shortTitle || item.title}
                      </h3>

                      <p className="text-[20px] font-bold text-gray-900 whitespace-nowrap">
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* COLOR */}
                    {item.selectedColor && (
                      <p className="text-[12px] text-gray-500 mt-1">
                        Color: {item.selectedColor}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between mt-3">
                      {/* QUANTITY */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-sm font-semibold min-w-[14px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="border-t  bg-white p-4 rounded-t-4xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
              {/* TOTAL */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[22px] font-bold text-gray-800">Total:</h3>

                <h2 className="text-[32px] font-bold text-[#0f3ea9]">
                  ৳{totalPrice.toLocaleString()}
                </h2>
              </div>

              {/* CHECKOUT */}
              <Link href="/checkout">
                <button className="w-full h-[52px] rounded-xl bg-[#0f3ea9] hover:bg-[#0b2f80] text-white font-semibold transition-all shadow-lg">
                  Proceed to Checkout
                </button>
              </Link>

              {/* CLEAR */}
              <button
                onClick={clearCart}
                className="w-full mt-3 h-[50px] rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-all shadow-sm"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

"use client";

import { useCart } from "@/hooks/useCart";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: "desktop" | "mobile";
}

export default function CartDrawer({
  open,
  setOpen,
  variant = "desktop",
}: Props) {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const totalPrice = getCartTotal();

  const isMobile = variant === "mobile";

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-[9998] transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-[100dvh]
        ${isMobile ? "w-full sm:w-[360px]" : "w-full sm:w-[430px]"}
        bg-white z-[9999]
        transition-transform duration-300 ease-out
        flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* HEADER */}
        <div className="h-[70px] border-b px-4 sm:px-5 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag
              className={`w-6 h-6 ${
                isMobile ? "text-orange-500" : "text-[#0f3ea9]"
              }`}
            />

            <h2 className="text-[18px] sm:text-[22px] font-bold text-gray-800">
              Shopping Cart
            </h2>

            <span
              className={`text-white text-[12px] font-semibold px-2 py-1 rounded-full ${
                isMobile ? "bg-orange-500" : "bg-[#0f3ea9]"
              }`}
            >
              {cartItems?.length ?? 0}
            </span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300" />

            <h3 className="text-[20px] font-bold mt-5">Your Cart is Empty</h3>

            <p className="text-gray-500 mt-2">
              Looks like you haven’t added anything yet.
            </p>
          </div>
        )}

        {/* CART ITEMS */}
        {cartItems.length > 0 && (
          <>
            <div
              className={`flex-1 overflow-y-auto px-4 py-4 pb-32 space-y-4 ${
                isMobile ? "bg-gray-50" : ""
              }`}
            >
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="border border-gray-200 rounded-2xl p-3 flex gap-3 hover:shadow-md transition-all bg-white"
                >
                  {/* IMAGE */}
                  <div className="relative w-[80px] sm:w-[90px] h-[80px] sm:h-[90px] rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-800 line-clamp-2 leading-[22px]">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {item.selectedColor && (
                        <span className="text-[11px] sm:text-[12px] text-gray-500">
                          Color: {item.selectedColor}
                        </span>
                      )}

                      {item.selectedSize && (
                        <span className="text-[11px] sm:text-[12px] text-gray-500">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-[18px] sm:text-[20px] font-bold mt-2 ${
                        isMobile ? "text-orange-500" : "text-[#0f3ea9]"
                      }`}
                    >
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between mt-3 gap-2">
                      {/* QUANTITY */}
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity - 1)
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <div className="w-10 text-center font-bold text-sm">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() =>
                            updateQuantity(index, item.quantity + 1)
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="w-9 h-9 rounded-full hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div
              className={`border-t bg-white p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] shrink-0 ${
                isMobile ? "shadow-lg" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-800">
                  Total
                </h3>

                <h2
                  className={`text-[24px] sm:text-[28px] font-bold ${
                    isMobile ? "text-orange-500" : "text-[#0f3ea9]"
                  }`}
                >
                  ৳{totalPrice.toLocaleString()}
                </h2>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <button
                    className={`w-full h-[52px] sm:h-[56px] rounded-xl text-white font-semibold transition-all shadow-md ${
                      isMobile
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-[#0f3ea9] hover:bg-[#0b2f80]"
                    }`}
                  >
                    Proceed To Checkout
                  </button>
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full h-[50px] sm:h-[52px] rounded-xl border border-red-200 text-red-500 font-semibold hover:bg-red-50 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

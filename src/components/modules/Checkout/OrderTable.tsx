"use client";

import { useCart } from "@/hooks/useCart";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function OrderTable() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-10 text-center rounded-xl border">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {/* HEADER (desktop only) */}
      <div className="hidden md:grid bg-[#f7f3e9] px-5 py-3 font-semibold text-sm grid-cols-12">
        <div className="col-span-6">PRODUCT DETAILS</div>
        <div className="col-span-2 text-center">PRICE</div>
        <div className="col-span-2 text-center">QTY</div>
        <div className="col-span-2 text-right">TOTAL</div>
      </div>

      {/* ITEMS */}
      <div className="divide-y">
        {cartItems.map((item, index) => (
          <div key={item.id}>
            {/* ✅ DESKTOP ROW */}
            <div className="hidden md:grid grid-cols-12 items-center px-5 py-4 text-sm">
              <div className="col-span-6 flex gap-3 items-center">
                <div className="w-14 h-14 relative border rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-medium">{item.title}</p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 text-xs mt-1 hover:underline"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-center">৳{item.price}</div>

              <div className="col-span-2 flex justify-center">
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(index, item.quantity - 1)
                    }
                    className="px-2"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button
                    onClick={() =>
                      item.quantity < item.stock &&
                      updateQuantity(index, item.quantity + 1)
                    }
                    className="px-2"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-right font-semibold text-[#0f3ea9]">
                ৳{item.price * item.quantity}
              </div>
            </div>

            {/* ✅ MOBILE CARD (image মতো) */}
            <div className="md:hidden p-4 flex gap-3">
              {/* IMAGE */}
              <div className="w-[60px] h-[60px] relative border rounded-md overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                {/* TITLE */}
                <p className="text-[14px] font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 text-xs mt-1"
                >
                  ✕ Remove
                </button>

                {/* PRICE + QTY */}
                <div className="flex items-center justify-between mt-2">
                  {/* PRICE */}
                  <span className="text-gray-500 text-sm min-w-[70px]">
                    ৳{item.price}
                  </span>

                  {/* QTY */}
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(index, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3 text-sm font-medium min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        item.quantity < item.stock &&
                        updateQuantity(index, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* TOTAL */}
                  <span className="text-[#0f3ea9] font-semibold text-sm min-w-[80px] text-right">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

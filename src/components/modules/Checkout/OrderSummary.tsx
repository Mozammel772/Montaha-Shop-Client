"use client";

import { useCart } from "@/hooks/useCart";
import { CheckoutFormData } from "@/types/checkout.interface";
import { useMemo, useState } from "react";

interface OrderSummaryProps {
  formData: CheckoutFormData;
}

export default function OrderSummary({ formData }: OrderSummaryProps) {
  const { cartItems } = useCart();
  const [location, setLocation] = useState("dhaka");

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const delivery = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 1000) return 0;

    const quantityCharge = totalQuantity * 10;
    const locationCharge = location === "dhaka" ? 60 : 120;

    return Math.max(quantityCharge, locationCharge);
  }, [subtotal, totalQuantity, location]);

  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    const orderData = {
      customer: formData,
      cart: cartItems,
      summary: {
        subtotal,
        delivery,
        total,
        totalQuantity,
        location,
      },
      createdAt: new Date(),
    };

    console.log("🔥 ORDER DATA:", orderData);
  };

  return (
    <div className="bg-white rounded-xl border p-5 sticky top-5">
      <h2 className="font-bold text-lg mb-4">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Product Price</span>
          <span>৳{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span>{delivery === 0 ? "Free" : `৳${delivery}`}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold text-lg">
          <span>Total Payment</span>
          <span>৳{total}</span>
        </div>
      </div>

      <select
        className="w-full border p-2 rounded-md mt-4"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="dhaka">Inside City</option>
        <option value="outside">Outside City</option>
      </select>

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-5 h-[50px] bg-[#0f3ea9] text-white rounded-lg"
      >
        Order & Pay ৳{total}
      </button>
    </div>
  );
}

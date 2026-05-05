"use client";

import CheckoutForm from "@/components/modules/Checkout/CheckoutForm";
import OrderSummary from "@/components/modules/Checkout/OrderSummary";
import OrderTable from "@/components/modules/Checkout/OrderTable";
import { useCart } from "@/hooks/useCart";
import { CheckoutFormData } from "@/types/checkout.interface";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    district: "",
    upazila: "",
    address: "",
    notes: "",
  });
  return (
    <section className="bg-[#f5f7fb] min-h-screen">
      <div className="border-y bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-[14px] text-gray-600 px-3 py-1.5">
          {/* Icon box */}
          <div className="w-6 h-6 flex items-center justify-center border rounded-md text-gray-600">
            <ShoppingBag size={14} />
          </div>

          {/* Checkout */}
          <Link
            href="/checkout"
            className="font-medium text-gray-800 hover:text-[#0f3ea9] transition"
          >
            Checkout
          </Link>

          {/* Divider */}
          <span className="text-gray-400">›</span>

          {/* Items */}
          <span className="text-[13px] text-gray-500">
            {cartItems.length} items
          </span>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">
            <CheckoutForm onChange={setFormData} />
            <OrderTable />
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <OrderSummary formData={formData} />
          </div>
        </div>
      </div>
    </section>
  );
}

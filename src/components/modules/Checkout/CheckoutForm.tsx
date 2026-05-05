"use client";

import { CheckoutFormData } from "@/types/checkout.interface";
import { useState } from "react";

type Props = {
  onChange?: (data: CheckoutFormData) => void;
};

// ✅ District + Upazila Data
const districtData: Record<string, string[]> = {
  Dhaka: ["Dhanmondi", "Mirpur", "Uttara", "Gulshan"],
  Chattogram: ["Pahartali", "Panchlaish", "Kotwali"],
  Rajshahi: ["Boalia", "Motihar"],
  Khulna: ["Sonadanga", "Khalishpur"],
};

export default function CheckoutForm({ onChange }: Props) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    district: "",
    upazila: "",
    address: "",
    notes: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState("");

  // 🔥 handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    const updated = { ...formData, [name]: value };
    setFormData(updated);

    onChange?.(updated);
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="text-xs mb-5 text-gray-500 tracking-wide">
        ENTERING ADDRESS
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* NAME */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg outline-none focus:border-blue-500"
          placeholder="Full Name *"
        />

        {/* PHONE */}
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg outline-none focus:border-blue-500"
          placeholder="Phone Number *"
        />

        {/* DISTRICT */}
        <select
          name="district"
          value={formData.district}
          onChange={(e) => {
            handleChange(e);
            setSelectedDistrict(e.target.value);
          }}
          className="border p-3 rounded-lg text-gray-600"
        >
          <option value="">Select District</option>

          {Object.keys(districtData).map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        {/* UPAZILA */}
        <select
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          className="border p-3 rounded-lg text-gray-600"
          disabled={!selectedDistrict}
        >
          <option value="">Select Upazila</option>

          {selectedDistrict &&
            districtData[selectedDistrict].map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
        </select>
      </div>

      {/* ADDRESS */}
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full mt-4 border p-3 rounded-lg"
        placeholder="House, Road, Area *"
      />

      {/* NOTES */}
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="w-full mt-4 border p-3 rounded-lg"
        placeholder="Any special instructions (optional)"
      />
    </div>
  );
}

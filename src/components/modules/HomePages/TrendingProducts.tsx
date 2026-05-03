// "use client";

// import { Clock3, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// // IMPORT IMAGES
// import trendingBanner from "@/assets/images/trending/treandings.webp";

// import productOne from "@/assets/images/trending/Summer-Popular-Small-Bag-2020.webp";
// import productTwo from "@/assets/images/trending/anua-heartleaf.webp";
// import productThree from "@/assets/images/trending/korean-stle-pu-small.webp";
// import productFour from "@/assets/images/trending/trendy-Women-Messenger-Shoulder-Bag.webp";

// const products = [
//   {
//     id: 1,
//     title:
//       "Summer Niche Inner Wear Halterneck Vest Top Fashionable Two-Piece Pure Lust Suit V Neck",
//     shortTitle: "Summer Niche Inner Wear Halterneck Vest Top",
//     image: productOne,
//     gallery: [productOne, productTwo, productThree, productFour],

//     // PRICE
//     discount: "11% OFF",
//     price: 400,
//     oldPrice: 450,

//     // PRODUCT INFO
//     rating: 4.7,
//     stock: 120,
//     sku: "SN-458712",
//     vendor: "Fashion Style Factory",
//     category: "Women's Fashion",
//     brand: "Summer Style",
//     country: "China",
//     material: "Cotton Blend",
//     style: "Casual & Fashion",
//     colors: ["Black", "White", "Pink"],
//     sizes: ["S", "M", "L", "XL"],

//     // DELIVERY
//     delivery: "Standard Delivery (2-3 days)",

//     // DESCRIPTION
//     description:
//       "Stylish summer halterneck vest top with soft breathable fabric. Perfect for casual outings, daily wear, and fashion styling.",

//     specifications: {
//       fabric: "Cotton Blend",
//       fit: "Regular Fit",
//       neckStyle: "V Neck",
//       sleeve: "Sleeveless",
//       season: "Summer",
//       occasion: "Casual Wear",
//     },

//     url: "/product/product-one",
//   },

//   {
//     id: 2,
//     title:
//       "Women's Retro Simple Solid Color Commuter Texture Handbag Fall/Winter 2023 New Korean Backpack",
//     shortTitle: "Retro Solid Color Texture Handbag",
//     image: productTwo,
//     gallery: [productTwo, productOne, productThree, productFour],

//     // PRICE
//     discount: "12% OFF",
//     price: 2900,
//     oldPrice: 3299,

//     // PRODUCT INFO
//     rating: 4.8,
//     stock: 2400,
//     sku: "HB-104326",
//     vendor: "Korean Fashion Bags",
//     category: "Bag & Shoes",
//     brand: "Retro Collection",
//     country: "China",
//     material: "Premium PU Leather",
//     style: "Casual Style",
//     colors: ["White with pendant", "Black with pendant", "Pink belt pendant"],
//     sizes: ["20*20*9"],

//     // DELIVERY
//     delivery: "Standard Delivery (2-3 days)",

//     // DESCRIPTION
//     description:
//       "Elegant Korean-style retro handbag with premium texture finish. Designed for modern women with stylish and spacious everyday carrying experience.",

//     specifications: {
//       bagType: "Shoulder Crossbody Bag",
//       closure: "Magnetic Buckle",
//       hardness: "Medium Soft",
//       structure: "Laminated zipper bag",
//       style: "Urban Simplicity",
//       occasion: "Daily Matching",
//     },

//     url: "/product/product-two",
//   },

//   {
//     id: 3,
//     title:
//       "Summer this year's popular small bags 2020 new fashion ladies shoulder sling bag",
//     shortTitle: "Popular Small Shoulder Sling Bag",
//     image: productThree,
//     gallery: [productThree, productOne, productTwo, productFour],

//     // PRICE
//     discount: "50% OFF",
//     price: 1250,
//     oldPrice: 2500,

//     // PRODUCT INFO
//     rating: 4.5,
//     stock: 550,
//     sku: "SB-874521",
//     vendor: "Ladies Trend House",
//     category: "Fashion Bags",
//     brand: "Mini Fashion",
//     country: "China",
//     material: "PU Leather",
//     style: "Modern Fashion",
//     colors: ["Green", "White", "Black"],
//     sizes: ["Medium"],

//     // DELIVERY
//     delivery: "Express Delivery (1-2 days)",

//     // DESCRIPTION
//     description:
//       "Compact and trendy sling bag for daily fashion styling. Lightweight design with premium look and comfortable carrying experience.",

//     specifications: {
//       bagShape: "Square",
//       strap: "Adjustable",
//       closure: "Zipper",
//       pattern: "Solid",
//       occasion: "Travel & Casual",
//       texture: "Soft PU",
//     },

//     url: "/product/product-three",
//   },

//   {
//     id: 4,
//     title:
//       "Trendy Women's Messenger Shoulder Bag – Spring Summer Fashion Collection",
//     shortTitle: "Women's Messenger Shoulder Bag",
//     image: productFour,
//     gallery: [productFour, productOne, productTwo, productThree],

//     // PRICE
//     discount: "10% OFF",
//     price: 900,
//     oldPrice: 1000,

//     // PRODUCT INFO
//     rating: 4.6,
//     stock: 310,
//     sku: "MSG-447812",
//     vendor: "Urban Women Fashion",
//     category: "Women's Bags",
//     brand: "Spring Summer",
//     country: "China",
//     material: "Synthetic Leather",
//     style: "Elegant Casual",
//     colors: ["White", "Cream", "Brown"],
//     sizes: ["Medium"],

//     // DELIVERY
//     delivery: "Standard Delivery (2-4 days)",

//     // DESCRIPTION
//     description:
//       "Modern messenger shoulder bag with elegant finishing and spacious design. Ideal for office, shopping, and daily fashion styling.",

//     specifications: {
//       closure: "Flap Cover",
//       strap: "Single Shoulder Strap",
//       shape: "Horizontal Square",
//       pocket: "Inner Patch Pocket",
//       style: "Fashion Casual",
//       season: "Spring/Summer",
//     },

//     url: "/product/product-four",
//   },
// ];

// const TrendingProducts = () => {
//   return (
//     <section className="w-full bg-[#f4f6f9] py-5 md:py-8 px-2 md:px-4">
//       <div className="max-w-[1600px] mx-auto">
//         {/* MAIN CARD */}
//         <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
//           {/* HEADER */}
//           <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
//             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
//               <Clock3 className="w-4 h-4 text-red-500" />
//             </div>

//             <div className="bg-[#edf3ff] px-4 py-1.5 rounded-full">
//               <h2 className="text-[12px] md:text-[14px] font-bold tracking-wide uppercase text-[#0f3ea9]">
//                 Trending Now
//               </h2>
//             </div>
//           </div>

//           {/* PRODUCTS + BANNER */}
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 p-1 md:p-5">
//             {/* MOBILE BANNER */}
//             <div className="relative w-full h-[90px] col-span-2 md:hidden rounded-lg overflow-hidden">
//               <Image
//                 src={trendingBanner}
//                 alt="Trending Banner"
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="object-cover"
//               />
//             </div>

//             {/* MD BANNER */}
//             <div className="hidden md:block relative w-full h-[420px] min-h-[320px] rounded-xl overflow-hidden">
//               <Image
//                 src={trendingBanner}
//                 alt="Trending Banner"
//                 fill
//                 priority
//                 sizes="20vw"
//                 className="object-cover"
//               />
//             </div>

//             {/* PRODUCTS GRID */}
//             <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
//               {products.map((product) => (
//                 <Link
//                   href={product.url}
//                   key={product.id}
//                   className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* DISCOUNT BADGE */}
//                   <div className="absolute top-0 left-0 z-20 bg-[#002b7f] px-2 md:px-3 py-1 rounded-br-md">
//                     <p className="text-white text-[8px] md:text-[12px] font-semibold">
//                       {product.discount}
//                     </p>
//                   </div>

//                   {/* IMAGE */}
//                   <div className="relative h-[170px] md:h-[230px] overflow-hidden bg-[#f8fafc]">
//                     <Image
//                       src={product.image}
//                       alt={product.title}
//                       fill
//                       sizes="(max-width:768px) 50vw, 25vw"
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-2 md:p-3">
//                     {/* TITLE */}
//                     <h3 className="text-[13px] md:text-[16px] font-semibold leading-[20px] md:leading-[26px] text-[#1f2937] line-clamp-2 min-h-[42px] md:min-h-[56px]">
//                       {product.title}
//                     </h3>

//                     {/* PRICE */}
//                     <div className="flex items-end gap-2 mt-1 md:mt-2">
//                       <p className="text-[18px] md:text-[24px] font-bold text-[#0f3ea9]">
//                         ৳{product.price}
//                       </p>

//                       <p className="text-[11px] md:text-[14px] text-gray-400 line-through mb-[2px]">
//                         ৳{product.oldPrice}
//                       </p>
//                     </div>

//                     {/* BUTTON */}
//                     <button className="mt-2 md:mt-2 w-full h-[32px] md:h-[42px] rounded-full bg-[#0f3ea9] text-white text-[11px] md:text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#082c7c] transition-all duration-300">
//                       <ShoppingCart className="w-4 h-4" />
//                       Add To Cart
//                     </button>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingProducts;
"use client";

import { Clock3, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import trendingBanner from "@/assets/images/trending/treandings.webp";
import { TrendingProductsData } from "@/services/trendingProducts/trendingProductsData";

// IMPORT DATA

const TrendingProducts = () => {
  return (
    <section className="w-full bg-[#f4f6f9] py-5 md:py-8 px-2 md:px-4">
      <div className="max-w-[1600px] mx-auto">
        {/* MAIN CARD */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          {/* HEADER */}
          <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50">
              <Clock3 className="w-4 h-4 text-red-500" />
            </div>

            <div className="bg-[#edf3ff] px-4 py-1.5 rounded-full">
              <h2 className="text-[12px] md:text-[14px] font-bold tracking-wide uppercase text-[#0f3ea9]">
                Trending Now
              </h2>
            </div>
          </div>

          {/* PRODUCTS + BANNER */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 p-1 md:p-5">
            {/* MOBILE BANNER */}
            <div className="relative w-full h-[90px] col-span-2 md:hidden rounded-lg overflow-hidden">
              <Image
                src={trendingBanner}
                alt="Trending Banner"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* DESKTOP BANNER */}
            <div className="hidden md:block relative w-full h-[420px] min-h-[320px] rounded-xl overflow-hidden">
              <Image
                src={trendingBanner}
                alt="Trending Banner"
                fill
                priority
                sizes="20vw"
                className="object-cover"
              />
            </div>

            {/* PRODUCTS GRID */}
            <div className="col-span-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {TrendingProductsData.map((product) => (
                <Link
                  href={`/trending-products/${product.slug}`}
                  key={product.id}
                  className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* DISCOUNT BADGE */}
                  <div className="absolute top-0 left-0 z-20 bg-[#002b7f] px-2 md:px-3 py-1 rounded-br-md">
                    <p className="text-white text-[8px] md:text-[12px] font-semibold">
                      {product.discount}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="relative h-[170px] md:h-[230px] overflow-hidden bg-[#f8fafc]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-2 md:p-3">
                    {/* TITLE */}
                    <h3 className="text-[13px] md:text-[16px] font-semibold leading-[20px] md:leading-[26px] text-[#1f2937] line-clamp-2 min-h-[42px] md:min-h-[56px]">
                      {product.title}
                    </h3>

                    {/* PRICE */}
                    <div className="flex items-end gap-2 mt-1 md:mt-2">
                      <p className="text-[18px] md:text-[24px] font-bold text-[#0f3ea9]">
                        ৳{product.price}
                      </p>

                      <p className="text-[11px] md:text-[14px] text-gray-400 line-through mb-[2px]">
                        ৳{product.oldPrice}
                      </p>
                    </div>

                    {/* BUTTON */}
                    <button className="mt-2 md:mt-2 w-full h-[32px] md:h-[42px] rounded-full bg-[#0f3ea9] text-white text-[11px] md:text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#082c7c] transition-all duration-300">
                      <ShoppingCart className="w-4 h-4" />
                      Add To Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;

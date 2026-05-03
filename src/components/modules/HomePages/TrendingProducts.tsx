// "use client";

// import { Clock3, ShoppingCart } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// import trendingBanner from "@/assets/images/trending/treandings.webp";
// import { TrendingProductsData } from "@/services/trendingProducts/trendingProductsData";

// // IMPORT DATA

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

//             {/* DESKTOP BANNER */}
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
//               {TrendingProductsData.map((product) => (
//                 <Link
//                   href={`/trending-products/${product.slug}`}
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

import trendingBanner from "@/assets/images/trending/treandings.webp";
import { useCart } from "@/hooks/useCart";
import { TrendingProductsData } from "@/services/trendingProducts/trendingProductsData";
import { Clock3, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TrendingProducts = () => {
  /* ================= CART ================= */

  const { addToCart } = useCart();

  /* ================= HANDLE ADD TO CART ================= */

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof TrendingProductsData)[0],
  ) => {
    /* LINK STOP */
    e.preventDefault();

    e.stopPropagation();

    addToCart({
      id: product.id,

      slug: product.slug,

      title: product.title,

      shortTitle: product.title,

      image: product.image,

      price: product.price,

      oldPrice: product.oldPrice,

      discount: product.discount,

      quantity: 1,

      selectedColor: "Default",

      selectedSize: "Default",

      sku: `SKU-${product.id}`,

      stock: 20,
    });
  };

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
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="mt-2 md:mt-2 w-full h-[32px] md:h-[42px] rounded-full bg-[#0f3ea9] text-white text-[11px] md:text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-[#082c7c] transition-all duration-300 active:scale-[0.98]"
                    >
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

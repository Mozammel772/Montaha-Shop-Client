// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useMemo, useState } from "react";

// export default function ProductDetails({ product }: any) {
//   const [mainImage, setMainImage] = useState(product.image);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
//   const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
//   const [zoomStyle, setZoomStyle] = useState({
//     backgroundImage: "",
//     backgroundPosition: "0% 0%",
//     opacity: 0,
//   });

//   /* IMAGE ZOOM */

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();

//     const x = ((e.pageX - left) / width) * 100;

//     const y = ((e.pageY - top) / height) * 100;

//     setZoomStyle({
//       backgroundImage: `url(${mainImage.src})`,
//       backgroundPosition: `${x}% ${y}%`,
//       opacity: 1,
//     });
//   };

//   const handleMouseLeave = () => {
//     setZoomStyle((prev) => ({
//       ...prev,
//       opacity: 0,
//     }));
//   };

//   /* PRICE */

//   const totalPrice = useMemo(() => {
//     return product.price * quantity;
//   }, [product.price, quantity]);

//   /* ACTIONS */

//   const handleAddToCart = () => {
//     const cartItem = {
//       ...product,
//       quantity,
//       selectedColor,
//       selectedSize,
//     };

//     console.log(cartItem);

//     alert("Added To Cart");
//   };

//   return (
//     <section className=" min-h-screen ">
//       {/* BREADCRUMB */}

//       <div className="border-b">
//         <div className="max-w-[1600px] mx-auto flex items-center justify-start gap-2 text-[13px] text-gray-500 overflow-x-auto whitespace-nowrap px-2 py-3">
//           <Link href="/" className="hover:text-[#0f3ea9] transition-all">
//             Home
//           </Link>

//           <span>›</span>

//           <Link
//             href="/category/bag-shoes"
//             className="hover:text-[#0f3ea9] transition-all"
//           >
//             {product.category}
//           </Link>

//           <span>›</span>

//           <p className="text-[#111827] font-medium">{product.title}</p>
//         </div>
//       </div>
//       <div className="max-w-[1600px] mx-auto ">
//         <div className="p-2 md:p-4">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//             {/* LEFT */}

//             <div className="lg:col-span-5">
//               <div
//                 className="relative overflow-hidden rounded-xl border border-gray-200"
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <div className="relative h-[250px] md:h-[500px]">
//                   <Image
//                     src={mainImage}
//                     alt={product.title}
//                     fill
//                     priority
//                     sizes="(max-width: 768px) 100vw, 70vw"
//                     className="object-cover"
//                   />
//                 </div>

//                 {/* ZOOM */}

//                 <div
//                   className="absolute inset-0 hidden md:block pointer-events-none"
//                   style={{
//                     backgroundImage: zoomStyle.backgroundImage,
//                     backgroundPosition: zoomStyle.backgroundPosition,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "220%",
//                     opacity: zoomStyle.opacity,
//                   }}
//                 />
//               </div>

//               {/* THUMBNAILS */}

//               <div className="grid grid-cols-4 gap-1 md:gap-2 mt-2 md:mt-4">
//                 {product.gallery?.map((img: any, index: number) => (
//                   <button
//                     key={index}
//                     onClick={() => setMainImage(img)}
//                     className={`relative h-[60px] md:h-[90px] rounded-lg overflow-hidden border-1 ${
//                       mainImage === img ? "border-[#0f3ea9]" : "border-gray-200"
//                     }`}
//                   >
//                     <Image
//                       src={img}
//                       alt="thumb"
//                       fill
//                       sizes="(max-width: 768px) 100vw, 70vw"
//                       className="object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* CENTER */}

//             <div className="lg:col-span-5">
//               <div className="flex items-start justify-between gap-4">
//                 <h1 className="text-[18px] md:text-[25px] font-bold leading-[20px] md:leading-[26px]">
//                   {product.title}
//                 </h1>

//                 <button className="w-16 h-10 rounded-full border border-gray-200 flex items-center justify-center">
//                   <Share2 className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* BRAND */}

//               <div className="flex items-center gap-4 mt-2">
//                 <p className="text-gray-500 text-[14px]">
//                   Brand:
//                   <span className="text-[#0f3ea9] font-semibold ml-1">
//                     {product.brand}
//                   </span>
//                 </p>

//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

//                   <span>{product.rating}</span>
//                 </div>
//               </div>

//               {/* PRICE */}

//               <div className="mt-3 border-b border-gray-200 pb-3">
//                 <div className="flex items-center gap-3 flex-wrap">
//                   <h2 className="text-[26px] md:text-[34px] font-bold text-[#0f3ea9]">
//                     ৳{totalPrice}
//                   </h2>

//                   <p className="line-through text-gray-400">
//                     ৳{product.oldPrice}
//                   </p>

//                   <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-[12px] font-semibold">
//                     {product.discount}
//                   </span>
//                 </div>
//               </div>

//               {/* COLORS */}

//               <div className="mt-5">
//                 <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>

//                 <div className="flex flex-wrap gap-2">
//                   {product.colors?.map((color: string) => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`px-2 md:px-4 py-1 md:py-2 rounded-md border ${
//                         selectedColor === color
//                           ? "bg-[#0f3ea9] text-white border-[#0f3ea9]"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* SIZES */}

//               <div className="mt-5">
//                 <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>

//                 <div className="flex flex-wrap gap-2">
//                   {product.sizes?.map((size: string) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-2 md:px-4 py-1 md:py-2 rounded-md border ${
//                         selectedSize === size
//                           ? "bg-[#0f3ea9] text-white border-[#0f3ea9]"
//                           : "border-gray-300"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* QUANTITY */}

//               <div className="mt-6">
//                 <h3 className="font-semibold mb-3">Quantity</h3>

//                 <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
//                   <button
//                     onClick={() =>
//                       setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
//                     }
//                     className="w-12 h-12 flex items-center justify-center"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </button>

//                   <div className="w-14 h-12 flex items-center justify-center font-bold">
//                     {quantity}
//                   </div>

//                   <button
//                     onClick={() => setQuantity((prev) => prev + 1)}
//                     className="w-12 h-12 flex items-center justify-center"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* BUTTONS */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
//                 <button
//                   onClick={handleAddToCart}
//                   className="h-[54px] rounded-lg border-2 border-[#0f3ea9] text-[#0f3ea9] font-semibold flex items-center justify-center gap-2"
//                 >
//                   <ShoppingCart className="w-5 h-5" />
//                   Add To Cart
//                 </button>

//                 <button className="h-[54px] rounded-lg bg-[#0f3ea9] text-white font-semibold">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useCart } from "@/hooks/useCart";
import {
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function ProductDetails({ product }: any) {
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const [zoomStyle, setZoomStyle] = useState({
    backgroundImage: "",
    backgroundPosition: "0% 0%",
    opacity: 0,
  });

  /* IMAGE ZOOM */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${mainImage.src})`,
      backgroundPosition: `${x}% ${y}%`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  /* PRICE */
  const totalPrice = useMemo(() => {
    return product.price * quantity;
  }, [product.price, quantity]);

  const discountAmount = useMemo(() => {
    return (product.oldPrice - product.price) * quantity;
  }, [product.oldPrice, product.price, quantity]);

  /* ACTIONS */
  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);

      return;
    }

    addToCart({
      id: product.id,

      slug: product.slug,

      title: product.title,

      shortTitle: product.shortTitle,

      image: product.image,

      price: product.price,

      oldPrice: product.oldPrice,

      discount: product.discount,

      quantity,

      selectedColor,

      selectedSize,

      sku: product.sku,

      stock: product.stock,
    });

    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();

    window.location.href = "/checkout";
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* BREADCRUMB */}
      <div className="border-b bg-white">
        <div className="max-w-[1600px] mx-auto flex items-center justify-start gap-2 text-[13px] text-gray-500 overflow-x-auto whitespace-nowrap px-2 py-3">
          <Link href="/" className="hover:text-[#0f3ea9] transition-all">
            Home
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category?.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
            className="hover:text-[#0f3ea9] transition-all"
          >
            {product.category}
          </Link>
          <span>›</span>
          <p className="text-[#111827] font-medium line-clamp-1">
            {product.title}
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        <div className="p-2 md:p-4">
          {/* MAIN PRODUCT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT - GALLERY */}
            <div className="lg:col-span-5">
              <div
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="relative h-[250px] md:h-[500px]">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-[12px] font-bold">
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* ZOOM EFFECT */}
                <div
                  className="absolute inset-0 hidden md:block pointer-events-none"
                  style={{
                    backgroundImage: zoomStyle.backgroundImage,
                    backgroundPosition: zoomStyle.backgroundPosition,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "220%",
                    opacity: zoomStyle.opacity,
                  }}
                />
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-1 md:gap-2 mt-2 md:mt-4">
                {product.gallery?.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`relative h-[60px] md:h-[90px] rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img
                        ? "border-[#0f3ea9] shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER - PRODUCT INFO */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-[18px] md:text-[25px] font-bold leading-[20px] md:leading-[32px] text-gray-800">
                    {product.title}
                  </h1>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
                    >
                      <Heart
                        className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* BRAND & RATING */}
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <p className="text-gray-500 text-[14px]">
                    Brand:
                    <span className="text-[#0f3ea9] font-semibold ml-1">
                      {product.brand}
                    </span>
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-400 text-sm">(248 reviews)</span>
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    ✓ {product.totalSold || 1248}+ Sold
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-4 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-[28px] md:text-[36px] font-bold text-[#0f3ea9]">
                      ৳{totalPrice.toLocaleString()}
                    </h2>
                    {product.oldPrice && (
                      <p className="line-through text-gray-400 text-lg">
                        ৳{(product.oldPrice * quantity).toLocaleString()}
                      </p>
                    )}
                    {product.discount && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[12px] font-semibold">
                        {product.discount}
                      </span>
                    )}
                  </div>
                  {discountAmount > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      You save: ৳{discountAmount.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* STOCK STATUS */}
                <div className="mt-4 flex items-center gap-4">
                  <p
                    className={`text-[14px] font-semibold ${product.stock <= 10 ? "text-orange-600" : "text-green-600"}`}
                  >
                    {product.stock <= 10
                      ? `⚠️ Only ${product.stock} items left in stock`
                      : `✓ In Stock (${product.stock} units)`}
                  </p>
                  {product.freeShipping && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <Truck className="w-4 h-4" />
                      <span>Free Shipping</span>
                    </div>
                  )}
                </div>

                {/* COLORS */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold mb-3">
                      Color: {selectedColor}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color: string) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-md border text-sm transition-all ${
                            selectedColor === color
                              ? "bg-[#0f3ea9] text-white border-[#0f3ea9] shadow-md"
                              : "border-gray-300 hover:border-[#0f3ea9] hover:text-[#0f3ea9]"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIZES */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size: string) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-md border text-sm transition-all ${
                            selectedSize === size
                              ? "bg-[#0f3ea9] text-white border-[#0f3ea9] shadow-md"
                              : "border-gray-300 hover:border-[#0f3ea9] hover:text-[#0f3ea9]"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* MATERIAL INFO */}
                {product.material && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>Material: {product.material}</span>
                  </div>
                )}

                {/* QUANTITY */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                      }
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus
                        className={`w-4 h-4 ${quantity <= 1 ? "opacity-50" : ""}`}
                      />
                    </button>
                    <div className="w-14 h-12 flex items-center justify-center font-bold text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          prev < product.stock ? prev + 1 : prev,
                        )
                      }
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus
                        className={`w-4 h-4 ${quantity >= product.stock ? "opacity-50" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <button
                    onClick={handleAddToCart}
                    className="h-[54px] rounded-lg border-2 border-[#0f3ea9] text-[#0f3ea9] font-semibold flex items-center justify-center gap-2 hover:bg-[#0f3ea9] hover:text-white transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add To Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="h-[54px] rounded-lg bg-[#0f3ea9] text-white font-semibold hover:bg-[#0c2d7a] transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </div>

                {/* DELIVERY INFO */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#0f3ea9]" />
                      <div>
                        <p className="text-[12px] text-gray-500">Delivery</p>
                        <p className="text-[13px] font-semibold">
                          {product.delivery}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 text-[#0f3ea9]" />
                      <div>
                        <p className="text-[12px] text-gray-500">Returns</p>
                        <p className="text-[13px] font-semibold">
                          {product.returnPolicy || "7 Days Easy Return"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#0f3ea9]" />
                      <div>
                        <p className="text-[12px] text-gray-500">Warranty</p>
                        <p className="text-[13px] font-semibold">
                          {product.warranty || "1 Year Warranty"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#0f3ea9]" />
                      <div>
                        <p className="text-[12px] text-gray-500">SKU</p>
                        <p className="text-[13px] font-semibold">
                          {product.sku}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT - TRENDING SIDEBAR */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-4 shadow-sm sticky top-4">
                <h2 className="text-[18px] font-bold border-l-4 border-[#0f3ea9] pl-3 mb-4">
                  Trending Products
                </h2>
                <div className="space-y-4">
                  {/* This would normally map through trending products */}
                  <div className="text-center text-gray-500 text-sm">
                    More products coming soon...
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESCRIPTION & SPECIFICATIONS TABS */}
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === "description"
                    ? "border-b-2 border-[#0f3ea9] text-[#0f3ea9]"
                    : "text-gray-500 hover:text-[#0f3ea9]"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === "specifications"
                    ? "border-b-2 border-[#0f3ea9] text-[#0f3ea9]"
                    : "text-gray-500 hover:text-[#0f3ea9]"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-semibold text-sm transition-all whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "border-b-2 border-[#0f3ea9] text-[#0f3ea9]"
                    : "text-gray-500 hover:text-[#0f3ea9]"
                }`}
              >
                Reviews
              </button>
            </div>

            <div className="p-6">
              {/* DESCRIPTION TAB */}
              {activeTab === "description" && (
                <div>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {product.description}
                  </p>
                  {product.careInstructions && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Care Instructions:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                        {product.careInstructions?.map(
                          (instruction: string, i: number) => (
                            <li key={i}>{instruction}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* SPECIFICATIONS TAB */}
              {activeTab === "specifications" && (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100"
                      >
                        <p className="font-semibold capitalize text-gray-700">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-gray-600 sm:col-span-2">
                          {value as string}
                        </p>
                      </div>
                    ),
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-700">SKU</p>
                    <p className="text-gray-600 sm:col-span-2">{product.sku}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-700">Vendor</p>
                    <p className="text-gray-600 sm:col-span-2">
                      {product.vendor}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2">
                    <p className="font-semibold text-gray-700">
                      Country of Origin
                    </p>
                    <p className="text-gray-600 sm:col-span-2">
                      {product.country}
                    </p>
                  </div>
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#0f3ea9]">
                        {product.rating}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Based on 248 reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">Sarah Johnson</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Amazing quality! The fabric is super soft and
                        comfortable. Perfect for summer days.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Verified Purchase • March 10, 2024
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold">Maria Garcia</div>
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star className="w-3 h-3 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Good product but runs a little small. Size up for better
                        fit.
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Verified Purchase • March 5, 2024
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

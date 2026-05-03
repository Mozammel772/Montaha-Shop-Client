/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ProductDetails({ product }: any) {
  const [mainImage, setMainImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
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

  /* ACTIONS */

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    };

    console.log(cartItem);

    alert("Added To Cart");
  };

  return (
    <section className=" min-h-screen ">
      {/* BREADCRUMB */}

      <div className="border-b">
        <div className="max-w-[1600px] mx-auto flex items-center justify-start gap-2 text-[13px] text-gray-500 overflow-x-auto whitespace-nowrap px-2 py-3">
          <Link href="/" className="hover:text-[#0f3ea9] transition-all">
            Home
          </Link>

          <span>›</span>

          <Link
            href="/category/bag-shoes"
            className="hover:text-[#0f3ea9] transition-all"
          >
            {product.category}
          </Link>

          <span>›</span>

          <p className="text-[#111827] font-medium">{product.title}</p>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto ">
        <div className="p-2 md:p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT */}

            <div className="lg:col-span-5">
              <div
                className="relative overflow-hidden rounded-xl border border-gray-200"
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
                </div>

                {/* ZOOM */}

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
                    className={`relative h-[60px] md:h-[90px] rounded-lg overflow-hidden border-1 ${
                      mainImage === img ? "border-[#0f3ea9]" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="thumb"
                      fill
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* CENTER */}

            <div className="lg:col-span-5">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-[18px] md:text-[25px] font-bold leading-[20px] md:leading-[26px]">
                  {product.title}
                </h1>

                <button className="w-16 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* BRAND */}

              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-500 text-[14px]">
                  Brand:
                  <span className="text-[#0f3ea9] font-semibold ml-1">
                    {product.brand}
                  </span>
                </p>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                  <span>{product.rating}</span>
                </div>
              </div>

              {/* PRICE */}

              <div className="mt-3 border-b border-gray-200 pb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-[26px] md:text-[34px] font-bold text-[#0f3ea9]">
                    ৳{totalPrice}
                  </h2>

                  <p className="line-through text-gray-400">
                    ৳{product.oldPrice}
                  </p>

                  <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-[12px] font-semibold">
                    {product.discount}
                  </span>
                </div>
              </div>

              {/* COLORS */}

              <div className="mt-5">
                <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>

                <div className="flex flex-wrap gap-2">
                  {product.colors?.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-2 md:px-4 py-1 md:py-2 rounded-md border ${
                        selectedColor === color
                          ? "bg-[#0f3ea9] text-white border-[#0f3ea9]"
                          : "border-gray-300"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIZES */}

              <div className="mt-5">
                <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>

                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 md:px-4 py-1 md:py-2 rounded-md border ${
                        selectedSize === size
                          ? "bg-[#0f3ea9] text-white border-[#0f3ea9]"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY */}

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Quantity</h3>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="w-14 h-12 flex items-center justify-center font-bold">
                    {quantity}
                  </div>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-12 h-12 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="h-[54px] rounded-lg border-2 border-[#0f3ea9] text-[#0f3ea9] font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add To Cart
                </button>

                <button className="h-[54px] rounded-lg bg-[#0f3ea9] text-white font-semibold">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

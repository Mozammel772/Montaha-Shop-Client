// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useState } from "react";

// // IMPORT YOUR IMAGES
// import accessories from "@/assets/images/categories/Kids-Digital.webp";
// import momBaby from "@/assets/images/categories/Mom--Baby.webp";
// import digitalAccessories from "@/assets/images/categories/accessaries.webp";
// import bagShoes from "@/assets/images/categories/bag.webp";
// import dressClothing from "@/assets/images/categories/girls-fashion.webp";
// import newCollection from "@/assets/images/categories/new-collection.webp";
// import personalCare from "@/assets/images/categories/personal-care.webp";
// import mensFashion from "@/assets/images/categories/pngtree-elegant.webp";
// import preOrder from "@/assets/images/categories/pre-order.webp";
// import summerCollection from "@/assets/images/categories/summer-collection-men.webp";

// const categories = [
//   {
//     id: 1,
//     title: "Bag & Shoes",
//     image: bagShoes,
//     url: "/category/bag-shoes",
//   },
//   {
//     id: 2,
//     title: "Personal care",
//     image: personalCare,
//     url: "/category/personal-care",
//   },
//   {
//     id: 3,
//     title: "Mom & Baby",
//     image: momBaby,
//     url: "/category/mom-baby",
//   },
//   {
//     id: 4,
//     title: "Dress & clothing",
//     image: dressClothing,
//     url: "/category/dress-clothing",
//   },
//   {
//     id: 5,
//     title: "Mens Fashion",
//     image: mensFashion,
//     url: "/category/mens-fashion",
//   },
//   {
//     id: 6,
//     title: "Digital Accessories",
//     image: digitalAccessories,
//     url: "/category/digital-accessories",
//   },
//   {
//     id: 7,
//     title: "Pre Order",
//     image: preOrder,
//     url: "/category/pre-order",
//   },
//   {
//     id: 8,
//     title: "New Collection",
//     image: newCollection,
//     url: "/category/new-collection",
//   },
//   {
//     id: 9,
//     title: "Accessories",
//     image: accessories,
//     url: "/category/accessories",
//   },
//   {
//     id: 10,
//     title: "Summer Collection",
//     image: summerCollection,
//     url: "/category/summer-collection",
//   },
// ];

// const CategorySection = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);

//   const [isDragging, setIsDragging] = useState(false);
//   const [moved, setMoved] = useState(false);

//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   // MOUSE DOWN
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!sliderRef.current) return;

//     setIsDragging(true);
//     setMoved(false);

//     startX.current = e.pageX;
//     scrollLeft.current = sliderRef.current.scrollLeft;
//   };

//   // MOUSE MOVE
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !sliderRef.current) return;

//     e.preventDefault();

//     setMoved(true);

//     const x = e.pageX;

//     const walk = (x - startX.current) * 1.5;

//     sliderRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   // STOP DRAG
//   const stopDragging = () => {
//     setIsDragging(false);
//   };

//   return (
//     <section className="w-full bg-[#eef0f3] py-8 overflow-hidden">
//       <div className="max-w-[1400px] mx-auto">
//         {/* SLIDER */}
//         <div
//           ref={sliderRef}
//           className="flex items-center gap-2 md:gap-5 overflow-x-auto px-2 scrollbar-hide select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={stopDragging}
//           onMouseLeave={stopDragging}
//         >
//           {categories.map((item) => (
//             <div
//               key={item.id}
//               className="flex flex-col items-center justify-center min-w-[120px] shrink-0 group snap-start"
//             >
//               <Link
//                 href={item.url}
//                 draggable={false}
//                 onClick={(e) => {
//                   if (moved) {
//                     e.preventDefault();
//                   }
//                 }}
//                 className="flex flex-col items-center"
//               >
//                 {/* IMAGE */}
//                 <div className="relative w-[92px] h-[92px]">
//                   {/* BACK */}
//                   <div className="absolute inset-0 rounded-[32%] bg-white rotate-[7deg] shadow-md"></div>

//                   {/* FRONT */}
//                   <div className="relative z-10 w-full h-full overflow-hidden rounded-[32%] border-[3px] md:border-[5px] border-white bg-white -rotate-[7deg] transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
//                     <Image
//                       src={item.image}
//                       alt={item.title}
//                       fill
//                       sizes="(max-width: 768px) 100vw, 50vw"
//                       draggable={false}
//                       className="object-cover pointer-events-none"
//                     />
//                   </div>
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="mt-4 text-[14px] md:text-[15px] font-semibold text-[#1f2937] whitespace-nowrap text-center">
//                   {item.title}
//                 </h3>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategorySection;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

// IMAGES
import accessories from "@/assets/images/categories/Kids-Digital.webp";
import momBaby from "@/assets/images/categories/Mom--Baby.webp";
import digitalAccessories from "@/assets/images/categories/accessaries.webp";
import bagShoes from "@/assets/images/categories/bag.webp";
import dressClothing from "@/assets/images/categories/girls-fashion.webp";
import newCollection from "@/assets/images/categories/new-collection.webp";
import personalCare from "@/assets/images/categories/personal-care.webp";
import mensFashion from "@/assets/images/categories/pngtree-elegant.webp";
import preOrder from "@/assets/images/categories/pre-order.webp";
import summerCollection from "@/assets/images/categories/summer-collection-men.webp";

const categories = [
  {
    id: 1,
    title: "Bag & Shoes",
    image: bagShoes,
    url: "/category/bag-shoes",
  },
  {
    id: 2,
    title: "Personal care",
    image: personalCare,
    url: "/category/personal-care",
  },
  {
    id: 3,
    title: "Mom & Baby",
    image: momBaby,
    url: "/category/mom-baby",
  },
  {
    id: 4,
    title: "Dress & clothing",
    image: dressClothing,
    url: "/category/dress-clothing",
  },
  {
    id: 5,
    title: "Mens Fashion",
    image: mensFashion,
    url: "/category/mens-fashion",
  },
  {
    id: 6,
    title: "Digital Accessories",
    image: digitalAccessories,
    url: "/category/digital-accessories",
  },
  {
    id: 7,
    title: "Pre Order",
    image: preOrder,
    url: "/category/pre-order",
  },
  {
    id: 8,
    title: "New Collection",
    image: newCollection,
    url: "/category/new-collection",
  },
  {
    id: 9,
    title: "Accessories",
    image: accessories,
    url: "/category/accessories",
  },
  {
    id: 10,
    title: "Summer Collection",
    image: summerCollection,
    url: "/category/summer-collection",
  },
];

const CategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isDown = useRef(false);
  const isDragging = useRef(false);

  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    isDown.current = true;
    isDragging.current = false;

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;

    e.preventDefault();

    isDragging.current = true;

    const x = e.pageX - sliderRef.current.offsetLeft;

    const walk = (x - startX.current) * 1.5;

    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDown.current = false;

    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  return (
    <section className="w-full bg-[#eef0f3] py-6 md:py-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={() => {
            isDragging.current = false;
          }}
          onTouchMove={() => {
            isDragging.current = true;
          }}
          className="flex items-start gap-3 md:gap-5 overflow-x-auto px-3 md:px-4 scrollbar-hide select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center min-w-[95px] md:min-w-[120px] shrink-0 snap-start group"
            >
              <Link
                href={item.url}
                draggable={false}
                onClick={(e) => {
                  if (isDragging.current) {
                    e.preventDefault();
                  }
                }}
                className="flex flex-col items-center"
              >
                <div className="relative w-[78px] h-[78px] md:w-[92px] md:h-[92px]">
                  <div className="absolute inset-0 rounded-[32%] bg-white rotate-[7deg] shadow-md"></div>

                  <div className="relative z-10 w-full h-full overflow-hidden rounded-[32%] border-[3px] md:border-[5px] border-white bg-white -rotate-[7deg] transition-all duration-300 group-hover:rotate-0 group-hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="92px"
                      draggable={false}
                      className="object-cover pointer-events-none"
                    />
                  </div>
                </div>

                <h3 className="mt-3 md:mt-4 text-[12px] md:text-[15px] font-semibold text-[#1f2937] whitespace-nowrap text-center">
                  {item.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

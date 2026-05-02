/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../../assets/icons/theme-logo.png";

type Props = {
  open: boolean;
  onClose: () => void;
  categoryData: any;
};

export default function MobileCategoryDrawer({
  open,
  onClose,
  categoryData,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null,
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        onClose();
      }
    };

    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [onClose]);
  if (!open) return null;

  // Reset when drawer closes
  const handleClose = () => {
    setActiveCategory(null);
    setActiveSubCategory(null);
    onClose();
  };

  // Handle back navigation
  const handleBack = () => {
    if (activeSubCategory) {
      setActiveSubCategory(null);
    } else if (activeCategory) {
      setActiveCategory(null);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={handleClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-[65%] max-w-sm bg-white z-50 animate-slideLeft overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
          {/* Back button */}

          {/* Logo */}
          {/* <div className="flex-1 flex ">
            <Image
              src={logo}
              alt="ShopKing"
              width={100}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div> */}
          <Link href="/" className="shrink-0">
            <div className="relative h-10 w-[120px]">
              <Image
                src={logo}
                alt="ShopKing"
                fill
                sizes="120px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LEVEL 1 : Main Categories (Men, Women, Kids) */}
        {!activeCategory && (
          <div className="divide-y divide-gray-200">
            {Object.keys(categoryData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 rounded-b-sm transition-colors cursor-pointer "
              >
                <span className="capitalize font-medium text-gray-900 text-base">
                  {key === "juniors" ? "Kids & Juniors" : key}
                </span>
                <ChevronRight className="w-5 h-5 text-orange-500" />
              </button>
            ))}
          </div>
        )}

        {/* LEVEL 2 : Sub Categories (Clothing, Shoes, Accessories, etc.) */}
        {activeCategory && !activeSubCategory && (
          <div className="px-2 py-2 ">
            <div className="flex items-center justify-between gap-2 px-2 py-3 border-b">
              <button
                onClick={handleBack}
                className=" hover:bg-gray-100 rounded cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 " />
              </button>
              <h3 className=" text-gray-500 text-sm font-medium uppercase ">
                {activeCategory === "juniors"
                  ? "Kids & Juniors"
                  : activeCategory}
              </h3>
            </div>
            <div className="space-y-1">
              {Object.keys(categoryData[activeCategory]?.columns || {}).map(
                (subKey) => (
                  <button
                    key={subKey}
                    onClick={() => setActiveSubCategory(subKey)}
                    className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 rrounded-b-sm transition-colors cursor-pointer border-b"
                  >
                    <span className="font-medium text-gray-900 text-base ">
                      {subKey}
                    </span>
                    <ChevronRight className="w-5 h-5 text-orange-500" />
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* LEVEL 3 : Category Items (Hoodies, Jackets, Pants, etc.) */}
        {activeCategory && activeSubCategory && (
          <div className="px-2 py-2">
            <div className="flex items-center justify-between gap-2 px-2 py-3 border-b">
              <button
                onClick={handleBack}
                className="hover:bg-gray-100 rounded cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className=" text-gray-500 text-sm font-medium uppercase">
                {activeSubCategory}
              </h3>
            </div>
            <div className="space-y-1">
              {categoryData[activeCategory]?.columns[activeSubCategory]?.map(
                (item: any, index: number) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={handleClose}
                    className="w-full flex items-center px-3 py-3 hover:bg-gray-50 rounded-b-sm transition-colors border-b border-gray-200"
                  >
                    <span className="text-black text-base">{item.name}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import logo from "@/app/assets/icons/theme-logo.png";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   categoryData: any;
// };

// export default function MobileCategoryDrawer({
//   open,
//   onClose,
//   categoryData,
// }: Props) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
//     null
//   );
//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(min-width: 768px)");

//     const handleResize = () => {
//       if (mediaQuery.matches) {
//         onClose();
//       }
//     };

//     handleResize(); // initial check
//     mediaQuery.addEventListener("change", handleResize);

//     return () => {
//       mediaQuery.removeEventListener("change", handleResize);
//     };
//   }, [onClose]);
//   if (!open) return null;

//   // Reset when drawer closes
//   const handleClose = () => {
//     setActiveCategory(null);
//     setActiveSubCategory(null);
//     onClose();
//   };

//   // Handle back navigation
//   const handleBack = () => {
//     if (activeSubCategory) {
//       setActiveSubCategory(null);
//     } else if (activeCategory) {
//       setActiveCategory(null);
//     }
//   };

//   return (
//     <>
//       {/* Overlay */}
//       <div onClick={handleClose} className="fixed inset-0 bg-black/40 z-40" />

//       {/* Drawer */}
//       <div className="fixed top-0 left-0 h-full w-[65%] max-w-sm bg-white z-50 animate-slideLeft overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200">
//           {/* Back button */}
//           {activeCategory || activeSubCategory ? (
//             <button
//               onClick={handleBack}
//               className="p-1 hover:bg-gray-100 rounded"
//             >
//               <ChevronLeft className="w-5 h-5" />
//             </button>
//           ) : (
//             <div className="w-9" /> // Placeholder for alignment
//           )}

//           {/* Logo */}
//           <div className="flex-1 flex justify-center">
//             <Image
//               src={logo}
//               alt="ShopKing"
//               width={100}
//               height={40}
//               className="object-contain"
//             />
//           </div>

//           {/* Close button */}
//           <button
//             onClick={handleClose}
//             className="p-1 hover:bg-gray-100 rounded"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* LEVEL 1 : Main Categories (Men, Women, Kids) */}
//         {!activeCategory && (
//           <div className="divide-y divide-gray-100">
//             {Object.keys(categoryData).map((key) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveCategory(key)}
//                 className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
//               >
//                 <span className="capitalize font-medium text-gray-900 text-base">
//                   {key === "juniors" ? "Kids & Juniors" : key}
//                 </span>
//                 <ChevronRight className="w-5 h-5 text-orange-500" />
//               </button>
//             ))}
//           </div>
//         )}

//         {/* LEVEL 2 : Sub Categories (Clothing, Shoes, Accessories, etc.) */}
//         {activeCategory && !activeSubCategory && (
//           <div className="px-4 py-2">
//             <h3 className="px-3 py-2 text-gray-500 text-sm font-medium uppercase border-b">
//               {activeCategory === "juniors" ? "Kids & Juniors" : activeCategory}
//             </h3>
//             <div className="space-y-1">
//               {Object.keys(categoryData[activeCategory]?.columns || {}).map(
//                 (subKey) => (
//                   <button
//                     key={subKey}
//                     onClick={() => setActiveSubCategory(subKey)}
//                     className="w-full flex items-center justify-between px-3 py-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border-b"
//                   >
//                     <span className="font-medium text-gray-900 text-base ">
//                       {subKey}
//                     </span>
//                     <ChevronRight className="w-5 h-5 text-gray-400" />
//                   </button>
//                 )
//               )}
//             </div>
//           </div>
//         )}

//         {/* LEVEL 3 : Category Items (Hoodies, Jackets, Pants, etc.) */}
//         {activeCategory && activeSubCategory && (
//           <div className="px-4 py-2">
//             <h3 className="px-3 py-2 text-gray-500 text-sm font-medium uppercase border-b">
//               {activeSubCategory}
//             </h3>
//             <div className="space-y-1">
//               {categoryData[activeCategory]?.columns[activeSubCategory]?.map(
//                 (item: any, index: number) => (
//                   <Link
//                     key={index}
//                     href={item.href}
//                     onClick={handleClose}
//                     className="w-full flex items-center px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors border-b"
//                   >
//                     <span className="text-black text-base">{item.name}</span>
//                   </Link>
//                 )
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

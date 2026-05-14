// "use client";

// import { logoutUser } from "@/services/auth/logoutUser";
// import { LogOut, X } from "lucide-react";
// import { useState } from "react";

// export default function LogoutButton() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     setLoading(true);

//     try {
//       await logoutUser();
//       window.dispatchEvent(new Event("userChanged"));
//       window.location.href = "/";
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* TRIGGER BUTTON */}
//       <button
//         onClick={() => setOpen(true)}
//         className="w-full flex items-center gap-2 px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
//       >
//         <LogOut className="h-4 w-4" />
//         <span className="font-medium text-sm">Logout</span>
//       </button>

//       {/* MODAL */}
//       {open && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//           onClick={(e) => {
//             if (e.target === e.currentTarget) setOpen(false);
//           }}
//         >
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
//             {/* HEADER */}
//             <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
//                   <LogOut className="h-5 w-5 text-red-500" />
//                 </div>
//                 <h2 className="text-base font-semibold text-gray-800">
//                   Confirm Logout
//                 </h2>
//               </div>

//               <button
//                 onClick={() => setOpen(false)}
//                 disabled={loading}
//                 className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             {/* BODY */}
//             <div className="px-6 py-5">
//               <p className="text-sm text-gray-500 leading-relaxed">
//                 আপনি কি নিশ্চিতভাবে logout করতে চান? আপনাকে আবার login করতে হবে।
//               </p>
//             </div>

//             {/* FOOTER */}
//             <div className="flex items-center gap-3 px-6 pb-5">
//               <button
//                 onClick={() => setOpen(false)}
//                 disabled={loading}
//                 className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleLogout}
//                 disabled={loading}
//                 className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     <span>Logging out...</span>
//                   </>
//                 ) : (
//                   <>
//                     <LogOut className="h-3.5 w-3.5" />
//                     <span>Yes, Logout</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import { logoutUser } from "@/services/auth/logoutUser";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      window.dispatchEvent(new Event("userChanged"));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>

      {/* Confirmation Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl">
            {/* Icon */}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
              <LogOut className="h-5 w-5 text-red-500" />
            </div>

            {/* Text */}
            <h2 className="mb-1 text-sm font-semibold text-gray-900">
              Logout করবেন?
            </h2>
            <p className="text-xs text-gray-500">আপনাকে আবার login করতে হবে।</p>

            {/* Actions */}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-500 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-3.5 w-3.5" />
                    Yes, Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

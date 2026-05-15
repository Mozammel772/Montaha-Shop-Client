// import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
// import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
// import React from "react";

// export const dynamic = "force-dynamic";

// const CommonDashboardLayout = async ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <DashboardSidebar />
//       <div className="flex flex-1 flex-col overflow-hidden">
//         <DashboardNavbar />
//         <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
//           <div className="">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CommonDashboardLayout;
// CommonDashboardLayout.tsx

import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userInfo = await getUserInfo();

  // ✅ একটাই check — সব কিছু এখানে থেকে control হবে
  if (!userInfo) {
    redirect("/login");
  }
  const user = userInfo!;
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar userInfo={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar userInfo={user} />
        <main className="flex-1 overflow-y-auto bg-muted/10 p-2 md:p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;

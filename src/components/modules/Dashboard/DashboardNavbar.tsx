// // import { getDefaultDashboardRoute } from "@/lib/auth-utils";

// // import { getNavItemsByRole } from "@/lib/navItems.config";
// // import { getUserInfo } from "@/services/auth/getUserInfo";
// // import { UserInfo } from "@/types/user.interface";
// // import DashboardNavbarContent from "./DashboardNavbarContent";

// // const DashboardNavbar = async () => {
// //   const userInfo = (await getUserInfo()) as UserInfo;
// //   const navItems = await getNavItemsByRole(userInfo.role);
// //   const dashboardHome = getDefaultDashboardRoute(userInfo.role);

// //   return (
// //     <DashboardNavbarContent
// //       userInfo={userInfo}
// //       navItems={navItems}
// //       dashboardHome={dashboardHome}
// //     />
// //   );
// // };

// // export default DashboardNavbar;

// import { getDefaultDashboardRoute } from "@/lib/auth-utils";
// import { getNavItemsByRole } from "@/lib/navItems.config";
// import { getUserInfo } from "@/services/auth/getUserInfo";
// import { UserInfo } from "@/types/user.interface";
// import { redirect } from "next/navigation";
// import DashboardNavbarContent from "./DashboardNavbarContent";

// const DashboardNavbar = async () => {
//   const userInfo = await getUserInfo();

//   if (!userInfo) {
//     redirect("/login"); // ✅ middleware cookie clear করবে
//   }

//   const navItems = await getNavItemsByRole((userInfo as UserInfo).role);
//   const dashboardHome = getDefaultDashboardRoute((userInfo as UserInfo).role);

//   return (
//     <DashboardNavbarContent
//       userInfo={userInfo as UserInfo}
//       navItems={navItems}
//       dashboardHome={dashboardHome}
//     />
//   );
// };

// export default DashboardNavbar;
// DashboardNavbar.tsx
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { UserInfo } from "@/types/user.interface";
import DashboardNavbarContent from "./DashboardNavbarContent";

// ✅ async সরিয়ে দাও, নিজে fetch করবে না
const DashboardNavbar = async ({ userInfo }: { userInfo: UserInfo }) => {
  const navItems = await getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;

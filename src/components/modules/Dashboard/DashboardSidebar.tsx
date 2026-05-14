// import { getDefaultDashboardRoute } from "@/lib/auth-utils";
// import { getNavItemsByRole } from "@/lib/navItems.config";
// import { getUserInfo } from "@/services/auth/getUserInfo";

// import { NavSection } from "@/types/dashboard.interface";
// import DashboardSidebarContent from "./DashboardSidebarContent";

// const DashboardSidebar = async () => {
//   const userInfo = await getUserInfo();

//   // 🔥 user na thakle login e pathai deo
//   if (!userInfo) return null;

//   const navItems: NavSection[] = await getNavItemsByRole(userInfo.role);

//   const dashboardHome = getDefaultDashboardRoute(userInfo.role);

//   return (
//     <DashboardSidebarContent
//       userInfo={userInfo}
//       navItems={navItems}
//       dashboardHome={dashboardHome}
//     />
//   );
// };

// export default DashboardSidebar;
// DashboardSidebar.tsx
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { UserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";

// ✅ async সরিয়ে দাও, নিজে fetch করবে না
const DashboardSidebar = async ({ userInfo }: { userInfo: UserInfo }) => {
  const navItems = await getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;

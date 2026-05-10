import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home", // ✅ String
          roles: ["USER", "MODERATOR", "ADMIN"],
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "MODERATOR", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["USER", "MODERATOR", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["USER"],
        },
      ],
    },
  ];
};

export const getModeratorNavItems = async (): Promise<NavSection[]> => {
  // Fetch upcoming appointments count (only future appointments)

  return [
    {
      title: "USER Management",
      items: [
        {
          title: "Appointments",
          href: "/MODERATOR/dashboard/appointments",
          icon: "Calendar", // ✅ String

          roles: ["MODERATOR"],
        },
        {
          title: "My Schedules",
          href: "/MODERATOR/dashboard/my-schedules",
          icon: "Clock", // ✅ String
          roles: ["MODERATOR"],
        },
        {
          title: "Prescriptions",
          href: "/MODERATOR/dashboard/prescriptions",
          icon: "FileText", // ✅ String
          roles: ["MODERATOR"],
        },
      ],
    },
  ];
};

export const getUSERNavItems = async (): Promise<NavSection[]> => {
  // Fetch upcoming appointments count (only future appointments)

  return [
    {
      title: "Appointments",
      items: [
        {
          title: "My Appointments",
          href: "/dashboard/my-appointments",
          icon: "Calendar", // ✅ String

          roles: ["USER"],
        },
        {
          title: "Book Appointment",
          href: "/consultation",
          icon: "ClipboardList", // ✅ String
          roles: ["USER"],
        },
      ],
    },
    {
      title: "Medical Records",
      items: [
        {
          title: "My Prescriptions",
          href: "/dashboard/my-prescriptions",
          icon: "FileText", // ✅ String
          roles: ["USER"],
        },
        {
          title: "Health Records",
          href: "/dashboard/health-records",
          icon: "Activity", // ✅ String
          roles: ["USER"],
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "MODERATORs",
        href: "/admin/dashboard/MODERATORs-management",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "USERs",
        href: "/admin/dashboard/USERs-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Hospital Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = async (
  role: UserRole,
): Promise<NavSection[]> => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "MODERATOR":
      return [
        ...commonNavItems,
        // ...MODERATORNavItems
        ...(await getModeratorNavItems()),
      ];
    case "USER":
      return [
        ...commonNavItems,
        // ...USERNavItems
        ...(await getUSERNavItems()),
      ];
    default:
      return [];
  }
};

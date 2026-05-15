import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      title: "Dashboard Management",
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "MODERATOR", "ADMIN", "SUPER_ADMIN"],
        },
      ],
    },
    {
      title: "Go To Home",
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
          roles: ["USER", "MODERATOR", "ADMIN", "SUPER_ADMIN"],
        },
      ],
    },
  ];
};

export const getModeratorNavItems = async (): Promise<NavSection[]> => {
  return [
    {
      title: "USER Management",
      items: [
        {
          title: "Appointments",
          href: "/MODERATOR/dashboard/appointments",
          icon: "Calendar",
          roles: ["MODERATOR"],
        },
        {
          title: "My Schedules",
          href: "/MODERATOR/dashboard/my-schedules",
          icon: "Clock",
          roles: ["MODERATOR"],
        },
        {
          title: "Prescriptions",
          href: "/MODERATOR/dashboard/prescriptions",
          icon: "FileText",
          roles: ["MODERATOR"],
        },
      ],
    },
  ];
};

export const getUSERNavItems = async (): Promise<NavSection[]> => {
  return [
    {
      title: "Order Summery",
      items: [
        {
          title: "My Order",
          href: "/dashboard/my-appointments",
          icon: "Calendar",
          roles: ["USER"],
        },
        {
          title: "Order Status",
          href: "/consultation",
          icon: "ClipboardList",
          roles: ["USER"],
        },
      ],
    },
  ];
};

// ─── Admin nav — with dropdowns ────────────────────────────────────────────
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
        roles: ["ADMIN"],
        children: [
          {
            title: "All Users",
            href: "/admin/dashboard/all-users-management",
            icon: "Users",
            roles: ["ADMIN"],
          },
          {
            title: "Banned Users",
            href: "/admin/dashboard/USERs-management/banned",
            icon: "UserX",
            roles: ["ADMIN"],
          },
          {
            title: "New Registrations",
            href: "/admin/dashboard/USERs-management/new",
            icon: "UserPlus",
            roles: ["ADMIN"],
          },
        ],
      },
    ],
  },

  {
    title: "Settings",
    items: [
      {
        title: "Settings",
        href: "/admin/dashboard/appointments-management",
        icon: "Settings",
        roles: ["ADMIN", "SUPER_ADMIN"],
        children: [
          {
            title: "All Appointments",
            href: "/admin/dashboard/appointments-management",
            icon: "CalendarDays",
            roles: ["ADMIN"],
          },
          {
            title: "Pending",
            href: "/admin/dashboard/appointments-management/pending",
            icon: "Clock",
            roles: ["ADMIN"],
          },
          {
            title: "Completed",
            href: "/admin/dashboard/appointments-management/completed",
            icon: "CheckCircle",
            roles: ["ADMIN"],
          },
        ],
      },

      {
        title: "ToDay Order",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = async (
  role: UserRole,
): Promise<NavSection[]> => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "MODERATOR":
      return [...commonNavItems, ...(await getModeratorNavItems())];
    case "USER":
      return [...commonNavItems, ...(await getUSERNavItems())];
    default:
      return [];
  }
};

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
          icon: "Home",
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
          icon: "Settings",
          roles: ["USER"],
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
      title: "Appointments",
      items: [
        {
          title: "My Appointments",
          href: "/dashboard/my-appointments",
          icon: "Calendar",
          roles: ["USER"],
        },
        {
          title: "Book Appointment",
          href: "/consultation",
          icon: "ClipboardList",
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
          icon: "FileText",
          roles: ["USER"],
        },
        {
          title: "Health Records",
          href: "/dashboard/health-records",
          icon: "Activity",
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
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "MODERATORs",
        href: "/admin/dashboard/MODERATORs-management",
        icon: "Stethoscope",
        roles: ["ADMIN"],
      },
      {
        // ✅ Dropdown example — "USERs" has sub-items
        title: "USERs",
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
    title: "Hospital Management",
    items: [
      {
        // ✅ Dropdown example — "Appointments" has sub-items
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar",
        roles: ["ADMIN"],
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
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock",
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital",
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
      return [...commonNavItems, ...(await getModeratorNavItems())];
    case "USER":
      return [...commonNavItems, ...(await getUSERNavItems())];
    default:
      return [];
  }
};

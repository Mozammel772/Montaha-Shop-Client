// import { Heart, LayoutDashboard, Package, Settings, Users } from "lucide-react";
// const adminMenu = [
//   {
//     name: "Dashboard",
//     href: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Manage Users",
//     href: "/admin/users",
//     icon: Users,
//   },
//   {
//     name: "Orders",
//     href: "/admin/orders",
//     icon: Package,
//   },
//   {
//     name: "Change Password",
//     href: "/account/change-password",
//     icon: Package,
//   },
// ];

// export const navbarRoleBaseMenu = {
//   SUPER_ADMIN: adminMenu,

//   ADMIN: adminMenu,

//   MODERATOR: [
//     {
//       name: "Dashboard",
//       href: "/moderator/dashboard",
//       icon: LayoutDashboard,
//     },
//   ],

//   USER: [
//     {
//       name: "Dashboard",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Orders",
//       href: "/orders",
//       icon: Package,
//     },
//     {
//       name: "Wishlist",
//       href: "/wishlist",
//       icon: Heart,
//     },
//     {
//       name: "Settings",
//       href: "/settings",
//       icon: Settings,
//     },
//   ],
// };
import {
  Heart,
  KeyRound,
  LayoutDashboard,
  Package,
  Settings,
  User,
  Users,
} from "lucide-react";

const accountMenu = [
  {
    name: "My Profile",
    href: "/account/my-profile",
    icon: User,
  },
  {
    name: "Change Password",
    href: "/account/change-password",
    icon: KeyRound,
  },
  {
    name: "Settings",
    href: "/account/setting",
    icon: Settings,
  },
];

const adminMenu = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  ...accountMenu, // ← account folder এর সব items
];

export const navbarRoleBaseMenu = {
  SUPER_ADMIN: adminMenu,

  ADMIN: adminMenu,

  MODERATOR: [
    {
      name: "Dashboard",
      href: "/moderator/dashboard",
      icon: LayoutDashboard,
    },
    ...accountMenu, // ← moderator এও
  ],

  USER: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Orders",
      href: "/orders",
      icon: Package,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    ...accountMenu, // ← user এও
  ],
};

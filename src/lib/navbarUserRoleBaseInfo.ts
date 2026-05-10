const adminMenu = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Manage Users", href: "/admin/users" },
  { name: "Orders", href: "/admin/orders" },
];

export const navbarRoleBaseMenu = {
  SUPER_ADMIN: adminMenu,
  ADMIN: adminMenu,
  MODERATOR: [{ name: "Dashboard", href: "/moderator/dashboard" }],
  USER: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Orders", href: "/orders" },
    { name: "Account Info", href: "/account" },
  ],
};

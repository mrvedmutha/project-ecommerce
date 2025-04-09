export const customerSidebarData = {
  navItems: [
    { title: "Dashboard", url: "/cx/dashboard" },
    { title: "Your Orders", url: "/cx/orders" },
    {
      title: "Your Profile",
      url: "#",
      items: [
        { title: "Profile", url: "/cx/profile" },
        { title: "Manage Address", url: "/cx/profile/address" },
        { title: "Change Password", url: "/cx/profile/password" },
      ],
    },
  ],
};

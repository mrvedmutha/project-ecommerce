export const adminSidebarData = {
  navItems: [
    // Simple item
    {
      title: "Dashboard",
      url: "/admin/dashboard",
    },
    // Collapsible item
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "All Products",
          url: "/admin/products",
        },
        {
          title: "Categories",
          url: "/admin/products/categories",
        },
        {
          title: "Brands",
          url: "/admin/products/brands",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
    },
    {
      title: "Customers",
      url: "/admin/customers",
    },
    {
      title: "Content",
      url: "#",
      items: [
        {
          title: "Posts",
          url: "/admin/content/posts",
        },
        {
          title: "Pages",
          url: "/admin/content/pages",
        },
        {
          title: "Menus",
          url: "/admin/content/menus",
        },
        {
          title: "Media",
          url: "/admin/content/media",
        },
      ],
    },
    {
      title: "Marketing",
      url: "#",
      items: [
        {
          title: "Automation",
          url: "/admin/marketing/automation",
        },
        {
          title: "Messages",
          url: "/admin/marketing/messages",
        },
        {
          title: "Coupons",
          url: "/admin/marketing/coupons",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
    },
  ],
};

import { v4 as uuid } from "uuid";

const NavbarDefault = [
  {
    id: uuid(),
    menuitem: "Account",
    children: [
      {
        id: uuid(),
        menuitem: "Dashboard",
        link: "/dashboard",
      },
    ],
  },
  {
    id: uuid(),
    menuitem: "Education",
    children: [
      {
        id: uuid(),
        menuitem: "Podcasts",
        link: "/podcasts",
      },
      {
        id: uuid(),
        menuitem: "Blogs",
        link: "/blogs",
      },
      {
        id: uuid(),
        menuitem: "Shared Stories",
        children: [
          {
            id: uuid(),
            menuitem: "All Stories",
            link: "/sharedstories",
          },
          {
            id: uuid(),
            menuitem: "Share Your Story",
            link: "/sharedstories/create",
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    menuitem: "Help",
    children: [
      {
        id: uuid(),
        menuitem: "FAQS",
        link: "/faq",
      },
      {
        id: uuid(),
        menuitem: "Pricing",
        link: "/subscription",
      },
      {
        id: uuid(),
        menuitem: "About Us",
        link: "/aboutpage",
      },
      {
        id: uuid(),
        menuitem: "Policies",
        children: [
          {
            id: uuid(),
            menuitem: "Cookie Policy",
            link: "/cookiepolicy",
          },
          {
            id: uuid(),
            menuitem: "Privacy Policy",
            link: "/privpolicy",
          },
        ],
      },
      {
        id: uuid(),
        menuitem: "Contact Us",
        link: "/contactus",
      },
    ],
  },
];

export default NavbarDefault;

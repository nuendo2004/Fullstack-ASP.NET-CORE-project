export const dashboardMenu = [
  {
    id: 1,
    title: "My Subscriptions",
    link: "/usersettings/subscription",
    icon: "book",
  },
  {
    id: 2,
    title: "My Courses",
    link: "#",
    icon: "book",
  },
  {
    id: 3,
    title: "Reviews",
    link: "#",
    icon: "star",
  },
  {
    id: 4,
    title: "Earnings",
    link: "#",
    icon: "pie-chart",
  },
  {
    id: 6,
    title: "Payouts",
    link: "#",
    icon: "dollar-sign",
  },
];

export const accountSettingsMenu = [
  {
    id: 1,
    title: "Edit Profile",
    link: "/usersettings/edit-profile",
    icon: "settings",
  },
  {
    id: 2,
    title: "Security",
    link: "#",
    icon: "user",
  },
  {
    id: 3,
    title: "Social Profiles",
    link: "#",
    icon: "refresh-cw",
  },
  {
    id: 4,
    title: "Notifications",
    link: "#",
    icon: "bell",
  },
  {
    id: 5,
    title: "Profile Privacy",
    link: "#",
    icon: "lock",
  },
  {
    id: 6,
    title: "Delete Profile",
    link: "#",
    icon: "trash",
  },
  {
    id: 6,
    title: "Sign Out",
    link: "/",
    icon: "power",
  },
];

export const dashMenu = [dashboardMenu, accountSettingsMenu];

export default dashMenu;

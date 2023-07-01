import { Bell, Bookmark, Home, Paperclip, User } from "react-feather";

const SideBarItems = [
  {
    label: <i className="font-bold leading-loose text-2xl">"Paperclip"</i>,
    href: "/",
    auth: false,
    icon: Paperclip,
  },
  {
    label: "home",
    href: "/",
    auth: false,
    icon: Home,
  },
  {
    label: "Notifications",
    href: "/notifications",
    auth: true,
    icon: Bell,
  },
  {
    label: "Profile",
    href: `/profile/`,
    auth: true,
    icon: User,
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
    auth: true,
    icon: Bookmark,
  },
];

export { SideBarItems };

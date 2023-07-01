import { SideBarItems } from "@/constants";
import SideBarItem from "./SideBarItem";
import ThemeItem from "./ThemeItem";
import ChirpItem from "./ChirpItem";
import LogoutItem from "./LogoutItem";
import MoreItem from "./MoreItem";

const SideBAr = ({ loggedIn }) => {
  console.log("sidebar ", loggedIn);
  return (
    <div className="flex flex-col gap-2.5 px-2">
      {SideBarItems.map((item) => (
        <SideBarItem
          key={item.label}
          label={item.label}
          href={item.href}
          icon={item.icon}
          auth={item.auth}
          loggedIn={loggedIn}
        />
      ))}
      <ThemeItem />
      {loggedIn && <MoreItem />}
      <ChirpItem loggedIn={loggedIn} />
      {loggedIn && <LogoutItem />}
    </div>
  );
};

export default SideBAr;

import Link from "next/link";

const SideBarItem = ({ label, auth, href, icon: Icon, loggedIn }) => {
  if (auth && !loggedIn) {
    return null;
  }
  return (
    <Link href={href}>
      <div className="flex xl:justify-start justify-center items-center">
        <div className="btn btn-ghost rounded-full xl:px-2 py-4 p-4 h-full xl:w-full flex gap-3.5 xl:pl-4 xl:justify-start flex-nowrap">
          <Icon className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" />
          <p className="hidden xl:block   font-semibold xl:text-lg">{label}</p>
        </div>
      </div>
    </Link>
  );
};

export default SideBarItem;

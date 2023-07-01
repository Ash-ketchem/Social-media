import { MoreHorizontal } from "react-feather";

const MoreItem = () => {
  return (
    <div className="dropdown dropdown-right ">
      <div
        tabIndex={0}
        className="flex xl:justify-start justify-center items-center"
      >
        <div className="btn btn-ghost rounded-full xl:px-2 py-4 p-4 h-full xl:w-full flex gap-3.5 xl:justify-start flex-nowrap xl:pl-4 ">
          <MoreHorizontal className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8" />

          <p className="hidden xl:block   font-semibold xl:text-lg">More</p>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2  bg-base-100 rounded-box w-52 shadow-2xl flex gap-2 relative z-50"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MoreItem;

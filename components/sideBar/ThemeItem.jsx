"use client";

import { Sun } from "react-feather";
import { Moon } from "react-feather";
import themeStore from "@/stores/themeStore";
import { useCallback, useEffect } from "react";

const ThemeItem = () => {
  const theme = themeStore((state) => state.theme);
  const setTheme = themeStore((state) => state.setTheme);

  // console.log("theme compoenent");
  // console.log(theme);

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
  }, [theme]);

  const handleChangeTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <div
      className="flex xl:justify-start justify-center items-center"
      onClick={handleChangeTheme}
    >
      <div className="btn btn-ghost rounded-full p-4 xl:px-2 py-4 h-full xl:w-full flex gap-3.5 xl:justify-start xl:pl-4 ">
        {theme === "light" ? (
          <Moon className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 animate-[spin_1s_ease-in-out_1]" />
        ) : (
          <Sun className="xl:h-8 xl:w-8 sm:h-6 sm:w-6 md:h-8 md:w-8 animate-[spin_1s_ease-in-out_1]" />
        )}

        <p className="xl:block hidden font-semibold text-lg">
          {theme === "light" ? "Dark" : "Light"}
        </p>
      </div>
    </div>
  );
};

export default ThemeItem;

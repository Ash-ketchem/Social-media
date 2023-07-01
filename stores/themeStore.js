import { create } from "react-nuance";

const themeStore = create((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    set((state) => {
      return {
        theme: theme,
      };
    });
  },
}));
export default themeStore;

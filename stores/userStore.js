import { create } from "react-nuance";

const userStore = create((set) => ({
  user: null,
  loggedIn: false,

  setUser: (user) => {
    set((state) => {
      return {
        user,
        loggedIn: true,
      };
    });
  },
  removeUser: () => {
    set(() => {
      return {
        user: null,
        loggedIn: false,
      };
    });
  },
}));

export default userStore;

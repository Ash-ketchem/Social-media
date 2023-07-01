import { create } from "react-nuance";

const currentPostStore = create((set) => ({
  currentPostId: null,
  setCurrentPost: (id) => {
    set((state) => {
      return {
        currentPostId: id,
      };
    });
  },
  removeCurrentPost: () => {
    set(() => {
      return {
        currentPostId: null,
      };
    });
  },
}));

export default currentPostStore;

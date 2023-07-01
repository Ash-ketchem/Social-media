import { create } from "react-nuance";

const bookmarkStore = create((set) => ({
  bookmarks: [],

  addBookmarks: (bookmarks) => {
    set((state) => {
      return {
        bookmarks: [
          ...bookmarks.filter(
            //removing redundant objects
            (post) => !state.bookmarks.map((post) => post.id).includes(post.id)
          ),
          ...state.bookmarks,
        ],
      };
    });
  },

  addBookmark: (bookmark) => {
    set((state) => {
      return {
        bookmarks: state.bookmarks.map((post) => post.id).includes(bookmark.id)
          ? [...state.bookmarks]
          : [bookmark, ...state.bookmarks],
      };
    });
  },

  removeBookmark: (id) => {
    set((state) => {
      return {
        bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
      };
    });
  },

  removeAll: () => {
    set((state) => {
      return {
        bookmarks: [],
      };
    });
  },
}));

export default bookmarkStore;

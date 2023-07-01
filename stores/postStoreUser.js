import { create } from "react-nuance";

const postStoreUser = create((set) => ({
  posts: [],
  addPosts: (posts) => {
    set((state) => {
      return {
        posts: [
          ...state.posts,
          ...posts.filter(
            //removing redundant objects
            (post) => !state.posts.map((post) => post.id).includes(post.id)
          ),
        ],
      };
    });
  },
  setLike: (key) => {
    set((state) => {
      console.log(state);
      return {
        posts: state.posts.map((post) =>
          post.id === key
            ? { ...post, liked: !post.liked, extra: !post.extra }
            : post
        ),
      };
    }, key);
  },

  removePosts: () => {
    set(() => {
      return {
        posts: [],
      };
    });
  },
}));

export default postStoreUser;

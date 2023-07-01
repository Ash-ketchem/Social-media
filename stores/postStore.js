import { create } from "react-nuance";

const postStore = create((set) => ({
  posts: [],
  userPosts: [],

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
  addPostsUser: (posts) => {
    set((state) => {
      return {
        userPosts: [
          ...state.userPosts,
          ...posts.filter(
            //removing redundant objects
            (post) => !state.userPosts.map((post) => post.id).includes(post.id)
          ),
        ],
      };
    });
  },
  setLike: (key) => {
    set((state) => {
      // to make sure the like persiste between global and user posts
      const globalPostUser = state.userPosts.find((post) => post.id === key);
      if (globalPostUser) {
        globalPostUser.liked = !globalPostUser.liked;
        globalPostUser.likes = !globalPostUser.liked
          ? globalPostUser.likes - 1
          : globalPostUser.likes + 1;
      }

      return {
        posts: state.posts.map((post) =>
          post.id === key
            ? {
                ...post,
                liked: !post.liked,
                extra: !post.extra,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };
    }, key);
  },
  setLikeUser: (key) => {
    set((state) => {
      // console.log(state);

      // to make sure the like persiste between global and user posts
      const globalPost = state.posts.find((post) => post.id === key);
      if (globalPost) {
        globalPost.liked = !globalPost.liked;
        globalPost.likes = !globalPost.liked
          ? globalPost.likes - 1
          : globalPost.likes + 1;
      }

      return {
        userPosts: state.userPosts.map((post) =>
          post.id === key
            ? {
                ...post,
                liked: !post.liked,
                extra: !post.extra,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        ),
      };
    }, key);
  },

  setComment: (key) => {
    set((state) => {
      // to make sure the like persiste between global and user posts
      const globalPostUser = state.userPosts.find((post) => post.id === key);
      if (globalPostUser) {
        globalPostUser.comments += 1;
      }

      return {
        posts: state.posts.map((post) =>
          post.id === key
            ? {
                ...post,
                comments: post.comments + 1,
              }
            : post
        ),
      };
    }, key);
  },
  setCommentUser: (key) => {
    set((state) => {
      // console.log(state);

      // to make sure the like persiste between global and user posts
      const globalPost = state.posts.find((post) => post.id === key);
      if (globalPost) {
        globalPost.comments += 1;
      }

      return {
        userPosts: state.userPosts.map((post) =>
          post.id === key
            ? {
                ...post,
                comments: post.comments + 1,
              }
            : post
        ),
      };
    }, key);
  },

  removeComment: (key) => {
    set((state) => {
      // to make sure the like persiste between global and user posts
      const globalPostUser = state.userPosts.find((post) => post.id === key);
      if (globalPostUser) {
        globalPostUser.comments -= 1;
      }

      return {
        posts: state.posts.map((post) =>
          post.id === key
            ? {
                ...post,
                comments: post.comments - 1,
              }
            : post
        ),
      };
    }, key);
  },
  removeCommentUser: (key) => {
    set((state) => {
      // console.log(state);

      // to make sure the like persiste between global and user posts
      const globalPost = state.posts.find((post) => post.id === key);
      if (globalPost) {
        globalPost.comments -= 1;
      }

      return {
        userPosts: state.userPosts.map((post) =>
          post.id === key
            ? {
                ...post,
                comments: post.comments - 1,
              }
            : post
        ),
      };
    }, key);
  },

  setCommentGeneral: (key, action) => {
    set((state) => {
      if (action === "add") {
        return {
          posts: state.posts.map((post) =>
            post.id === key ? { ...post, comments: post.comments + 1 } : post
          ),
          userPosts: state.userPosts.map((post) =>
            post.id === key ? { ...post, comments: post.comments + 1 } : post
          ),
        };
      } else {
        return {
          posts: state.posts.map((post) =>
            post.id === key ? { ...post, comments: post.comments - 1 } : post
          ),
          userPosts: state.userPosts.map((post) =>
            post.id === key ? { ...post, comments: post.comments - 1 } : post
          ),
        };
      }
    }, key);
  },
  setBookmark: (key) => {
    set((state) => {
      // to make sure the like persiste between global and user posts
      const globalPostUser = state.userPosts.find((post) => post.id === key);
      if (globalPostUser) {
        globalPostUser.bookmarked = !globalPostUser.bookmarked;
      }

      return {
        posts: state.posts.map((post) =>
          post.id === key
            ? {
                ...post,
                bookmarked: !post.bookmarked,
              }
            : post
        ),
      };
    }, key);
  },
  setBookmarkUser: (key) => {
    set((state) => {
      // console.log(state);

      // to make sure the like persiste between global and user posts
      const globalPost = state.posts.find((post) => post.id === key);
      if (globalPost) {
        globalPost.bookmarked = !globalPost.bookmarked;
      }

      return {
        userPosts: state.userPosts.map((post) =>
          post.id === key
            ? {
                ...post,
                bookmarked: !post.bookmarked,
              }
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
  removePostsUser: () => {
    set(() => {
      return {
        userPosts: [],
      };
    });
  },

  addPostOnAll: (post) => {
    set((state) => {
      return {
        posts: [{ ...post }, ...state.posts],
        userPosts: [{ ...post }, ...state.userPosts],
      };
    });
  },
}));

export default postStore;

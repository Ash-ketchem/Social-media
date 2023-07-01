import { create } from "react-nuance";

const followStore = create((set) => ({
  users: [], // {id, isfollowing}

  addUser: (user) => {
    set((state) => {
      console.log("adding user =>", user.id);
      return {
        users: state.users.includes(user?.id)
          ? state.users
          : [...state.users, user],
      };
    });
  },

  followAction: (key, action = "add") => {
    set((state) => {
      //   console.log("calling follow action", key, state.users);
      return {
        users: state.users.map((user) =>
          key.includes(user?.id)
            ? action === "add"
              ? { ...user, isFollowing: true }
              : { ...user, isFollowing: false }
            : user
        ),
      };
    }, key);
  },
}));

export default followStore;

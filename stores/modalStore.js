import { create } from "react-nuance";

const modalStore = create((set) => ({
  isLoginModalOpen: true,
  isRegisterModalOpen: false,
  isEditModalOpen: false,
  isTweetModalOpen: false,

  onLoginModalOpen: () => {
    set(() => {
      window.login_modal.showModal();
      return {
        isLoginModalOpen: true,
      };
    });
  },
  onRegisterModalOpen: () => {
    set(() => {
      window.register_modal.showModal();
      return {
        isRegisterModalOpen: true,
      };
    });
  },
  onTweetModalOpen: () => {
    set(() => {
      window.tweet_modal.showModal();
      return {
        isTweetModalOpen: true,
      };
    });
  },
  onEditModalOpen: () => {
    set(() => {
      window.edit_modal.showModal();
      return {
        isEditModalOpen: true,
      };
    });
  },
  onLoginModalClose: () => {
    window.login_modal.close();
    set(() => {
      return {
        isLoginModalOpen: false,
      };
    });
  },
  onRegisterModalClose: () => {
    window.register_modal.close();
    set(() => {
      return {
        isRegisterModalOpen: false,
      };
    });
  },
  onTweetModalClose: () => {
    window.tweet_modal.close();
    set(() => {
      return {
        isTweetModalOpen: false,
      };
    });
  },
  onEditModalClose: () => {
    window.edit_modal.close();
    set(() => {
      return {
        isEditModalOpen: false,
      };
    });
  },
}));

export default modalStore;

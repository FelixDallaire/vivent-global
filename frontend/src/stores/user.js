import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: localStorage.getItem("userId") || null,
    username: localStorage.getItem("username") || "",
    role: localStorage.getItem("role") || "organizer",
    avatar: localStorage.getItem("avatar") || null,
  }),
  getters: {
    isOrganizer: (state) => state.role === "organizer",
  },
  actions: {
    setUser(userData) {
      this.id = userData.id;
      this.username = userData.username;
      this.role = userData.role || "organizer";
      this.avatar = userData.avatar;

      localStorage.setItem("userId", this.id);
      localStorage.setItem("username", this.username);
      localStorage.setItem("role", this.role);
      localStorage.removeItem("avatar");
    },

    resetUser() {
      this.id = null;
      this.username = "";
      this.role = "organizer";
      this.avatar = "";

      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("avatar");
    },
  },
  persist: {
    key: "user",
    storage: localStorage,
    paths: ["id", "username", "role", "avatar"],
  },
});

// src/store/auth.js
import { defineStore } from "pinia";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { useUserStore } from "./user";
import { useEventStore } from "./event";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username, password) {
      try {
        const data = await loginUser(username, password);
        this.token = data.token;
        localStorage.setItem("token", this.token);
        const userStore = useUserStore();
        userStore.setUser(data.user);

        // After login, fetch events if user is authenticated
        const eventStore = useEventStore();
        await eventStore.fetchEvents();  // Make sure events are fetched after login

      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },

    async register(username, password, role) {
      try {
        const data = await registerUser(username, password, role);
        this.token = data.token;
        localStorage.setItem("token", this.token);
        const userStore = useUserStore();
        userStore.setUser(data.user);
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await logoutUser();
        this.token = null;
        localStorage.removeItem("token");
        const userStore = useUserStore();
        userStore.resetUser();
        const eventStore = useEventStore();
        eventStore.resetEvents();
      } catch (error) {
        console.error("Error during logout:", error);
      }
    },
  },
  persist: {
    key: "auth",
    storage: localStorage,
    paths: ["token"],
  },
});

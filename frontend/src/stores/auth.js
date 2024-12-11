// src/store/auth.js
import { defineStore } from "pinia";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { useUserStore } from "./user"; // Import the User Store
import { useEventStore } from "./event"; // Import the Event Store

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null, // Token JWT de l'utilisateur
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
      } catch (error) {
        throw error;
      }
    },

    async register(username, password) {
      try {
        const data = await registerUser(username, password);
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
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      } finally {
        this.token = null;
        localStorage.removeItem("token");

        // Réinitialiser le User Store
        const userStore = useUserStore();
        userStore.resetUser();

        // Also reset the Event Store
        const eventStore = useEventStore();
        eventStore.resetEvents(); // Method to be added in Event Store for resetting events
      }
    },
  },
  persist: {
    key: "auth",
    storage: localStorage,
    paths: ["token"],
  },
});

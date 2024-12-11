// src/store/auth.js

import { defineStore } from "pinia";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { useUserStore } from "./user"; // Importer le userStore

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null, // Token JWT de l'utilisateur
  }),
  getters: {
    /**
     * Indique si l'utilisateur est authentifié.
     * @returns {Boolean} True si l'utilisateur est connecté, sinon False.
     */
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    /**
     * Connecte l'utilisateur.
     * @param {String} username
     * @param {String} password
     */
    async login(username, password) {
      try {
        const data = await loginUser(username, password);
        this.token = data.token;
        localStorage.setItem("token", this.token);

        // Mettre à jour le User Store avec les données utilisateur
        const userStore = useUserStore();
        userStore.setUser(data.user);
      } catch (error) {
        throw error;
      }
    },

    /**
     * Inscrit un nouvel utilisateur.
     * @param {String} username
     * @param {String} password
     */
    async register(username, password) {
      try {
        const data = await registerUser(username, password);
        this.token = data.token;
        localStorage.setItem("token", this.token);

        // Mettre à jour le User Store avec les données utilisateur
        const userStore = useUserStore();
        userStore.setUser(data.user);
      } catch (error) {
        throw error;
      }
    },

    /**
     * Déconnecte l'utilisateur.
     */
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
      }
    },
  },
  persist: {
    key: "auth",
    storage: localStorage,
    paths: ["token"],
  },
});

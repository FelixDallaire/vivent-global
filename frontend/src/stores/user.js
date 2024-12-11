// src/store/user.js

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: localStorage.getItem('userId') || null, // ID de l'utilisateur
    username: localStorage.getItem('username') || '', // Nom d'utilisateur
    role: localStorage.getItem('role') || 'organizer', // Rôle de l'utilisateur
    avatar: localStorage.getItem('avatar') || null
  }),
  getters: {
    /**
     * Indique si l'utilisateur a le rôle 'organizer'.
     * @returns {Boolean} True si le rôle est 'organizer', sinon False.
     */
    isOrganizer: (state) => state.role === 'organizer',
  },
  actions: {
    /**
     * Définit les informations de l'utilisateur.
     * @param {Object} userData - Données de l'utilisateur { id, username, role }.
     */
    setUser(userData) {
      this.id = userData.id;
      this.username = userData.username;
      this.role = userData.role || 'organizer';
      this.avatar = userData.avatar;

      // Stocker les informations dans le localStorage pour la persistance
      localStorage.setItem('userId', this.id);
      localStorage.setItem('username', this.username);
      localStorage.setItem('role', this.role);
      localStorage.removeItem('avatar')
    },

    /**
     * Réinitialise les informations de l'utilisateur.
     */
    resetUser() {
      this.id = null;
      this.username = '';
      this.role = 'organizer';
      this.avatar = ''

      // Supprimer les informations du localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('avatar')
    },
  },
  persist: {
    key: 'user',
    storage: localStorage,
    paths: ['id', 'username', 'role', 'avatar'],
  },
});

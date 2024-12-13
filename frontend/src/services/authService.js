// src/services/authService.js

import api from './api';

/**
 * Inscrit un nouvel utilisateur
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise<Object>} Données de l'utilisateur et token
 */
export async function registerUser(username, password, role) {
  console.warn(role)
  const response = await api.post('/auth/register', { username, password, role});
  return response.data;
}

/**
 * Connecte un utilisateur existant
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise<Object>} Données de l'utilisateur et token
 */
export async function loginUser(username, password) {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
}

/**
 * Déconnecte l'utilisateur (si nécessaire côté backend)
 * @returns {Promise<Object>} Réponse de déconnexion
 */
export async function logoutUser() {
  const response = await api.post('/auth/logout');
  return response.data;
}

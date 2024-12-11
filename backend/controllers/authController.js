// controllers/authController.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assurez-vous que le chemin est correct

/**
 * Auth Controller
 */
const authController = {};

/**
 * Génère un token JWT pour un utilisateur donné.
 * @param {Object} user - Utilisateur Mongoose.
 * @returns {String} Token JWT.
 */
function generateToken(user) {
  return jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

/**
 * Formate les données de l'utilisateur pour la réponse.
 * @param {Object} user - Utilisateur Mongoose.
 * @returns {Object} Données formatées de l'utilisateur.
 */
function formatUserResponse(user) {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
}

/**
 * Gère les erreurs d'authentification.
 * @param {Object} res - Réponse Express.
 * @param {Number} statusCode - Code de statut HTTP.
 * @param {String} message - Message d'erreur.
 */
function handleAuthError(res, statusCode, message) {
  return res.status(statusCode).json({ message });
}

/**
 * Connecte un utilisateur existant.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 */
authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return handleAuthError(res, 401, "Invalid credentials");
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return handleAuthError(res, 401, "Invalid credentials");
    }

    // Générer le token JWT
    const token = generateToken(user);

    // Formater la réponse utilisateur
    const formattedUser = formatUserResponse(user);

    // Retourner le token et les informations utilisateur
    res.json({
      token,
      user: formattedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Inscrit un nouvel utilisateur.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 */
authController.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return handleAuthError(res, 400, "Username already taken");
    }

    // Hasher le mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Déterminer le rôle
    const validRoles = ["participant", "organizer"];
    const userRole = validRoles.includes(role) ? role : "participant";

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      passwordHash,
      role: userRole,
    });

    await newUser.save();

    // Générer le token JWT
    const token = generateToken(newUser);

    // Formater la réponse utilisateur
    const formattedUser = formatUserResponse(newUser);

    // Retourner le token et les informations utilisateur
    res.status(201).json({
      token,
      user: formattedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Déconnecte l'utilisateur.
 * @param {Object} req - Requête Express.
 * @param {Object} res - Réponse Express.
 */
authController.logout = async (req, res) => {
  try {
    // Dans une authentification basée sur JWT, le logout est généralement géré côté client
    // en supprimant le token. Si vous souhaitez implémenter une invalidation de token
    // côté serveur (par exemple, en utilisant une liste noire), vous pouvez le faire ici.

    // Exemple simple : répondre avec un message de succès
    res.json({ message: "Déconnexion réussie" });

    // Exemple avancé : Ajouter le token à une liste noire (implémentation non incluse)
    // const token = req.headers.authorization.split(' ')[1];
    // await blacklistToken(token);
    // res.json({ message: 'Déconnexion réussie' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

module.exports = authController;

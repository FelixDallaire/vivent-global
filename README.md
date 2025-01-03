# Plateforme d'Événements Virtuels

## Description
Ce projet est une application de gestion d'événements virtuels, combinant une API backend en Node.js et une interface utilisateur développée avec Vue.js. Elle permet de créer, éditer, afficher des événements et de les représenter sur une carte interactive.

---

## Fonctionnalités principales

### Backend
- Gestion des utilisateurs : connexion, inscription et rôles (organisateur, participant).
- Gestion des événements : ajout, modification, suppression, et affichage.
- Manipulation des marqueurs sur des cartes interactives.

### Frontend
- Galerie d'événements affichée en grille.
- Navigation fluide entre les différentes pages.
- Édition des événements avec sélection de cartes et gestion des marqueurs interactifs.
- Intégration avec des composants Bootstrap pour un rendu professionnel.

---

## Technologies utilisées

### Backend
- **Node.js** et **Express.js** : pour la logique API.
- **MongoDB** avec Mongoose : pour la gestion de la base de données.
- **dotenv** : pour la gestion des variables d'environnement.

### Frontend
- **Vue.js 3** : pour l'interface utilisateur réactive.
- **Vue Router** : pour la navigation entre les pages.
- **Bootstrap 5** : pour le design et les styles.
- **Axios** : pour les requêtes HTTP.
- **Pinia** : pour la gestion de l'état global.

---

## Installation et exécution

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB installé localement ou une instance MongoDB distante

### Étapes d'installation

1. **Cloner le dépôt :**
   ```bash
   git clone <URL_DU_DÉPÔT>
   cd <NOM_DU_DÉPÔT>
   ```

2. **Installer les dépendances pour le backend :**
   ```bash
   cd backend
   npm install
   ```

3. **Configurer l'environnement backend :**
   - Créez un fichier `.env` dans le répertoire `backend`.
   - Ajoutez-y les variables suivantes :
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/vivent
     JWT_SECRET=maphrasesupersecrete
     ```

4. **Démarrer le serveur backend :**
   ```bash
   npm start
   ```

5. **Installer les dépendances pour le frontend :**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Démarrer le serveur frontend :**
   ```bash
   npm run dev
   ```

7. **Accéder à l'application :**
   - Frontend : [http://localhost:5173](http://localhost:5173)
   - Backend : [http://localhost:3000](http://localhost:3000)

---

## Structure du projet

### Backend
- **`app.js`** : configuration de l'application.
- **`routes/`** : contient les routes pour les utilisateurs, événements et marqueurs.
- **`models/`** : modèles MongoDB pour les utilisateurs, événements et marqueurs.

### Frontend
- **`src/components/`** : contient les composants Vue.js.
- **`src/views/`** : pages principales de l'application.
- **`src/assets/`** : images et ressources statiques.
- **`src/stores/`** : gestion des données avec Pinia.

---

## Scripts disponibles

### Backend
- `npm start` : Lancer le serveur.
- `npm run dev` : Lancer le serveur en mode développement.

### Frontend
- `npm run dev` : Lancer le serveur de développement Vue.
- `npm run build` : Compiler l'application pour la production.

---

## Exemple d'utilisation

1. **Inscription** : Créez un compte utilisateur.
2. **Connexion** : Accédez au tableau de bord après authentification.
3. **Créer un événement** : Ajoutez un nouvel événement avec une carte personnalisée.
4. **Modifier un événement** : Utilisez la carte interactive pour gérer les marqueurs.

---

## Dépendances principales

### Backend
- `express`, `mongoose`, `dotenv`, `jsonwebtoken`, `bcryptjs`.

### Frontend
- `vue`, `vue-router`, `axios`, `bootstrap`, `pinia`.

---

## Lien du Dépôt Git

[https://github.com/FelixDallaire/vivent-global](https://github.com/FelixDallaire/vivent-global)

---

## Auteur

Projet développé par Félix Dallaire & Camélia Brind'Amour Riffou.

---


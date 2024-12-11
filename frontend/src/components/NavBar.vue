<!-- <template>
  <nav class="navbar navbar-expand-lg bg-light shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="../assets/logo.svg" alt="Logo" class="me-2" width="auto" height="25" />
      </a>

      <div class="collapse navbar-collapse justify-content-center">
        <ul class="navbar-nav mb-2 mb-lg-0">
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <template v-if="isAuthenticated">
          <span class="me-2 nav-username fw-medium">{{ username }}</span>
          <div class="dropdown">
            <button class="btn btn-link p-0 border-0 dropdown-toggle-no-arrow" type="button" id="avatarDropdown"
              data-bs-toggle="dropdown" aria-expanded="false">
              <div class="avatar-border">
                <img :src="userAvatar" alt="User Avatar" class="rounded-circle avatar img-thumbnail nav-avatar" />
              </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="avatarDropdown">
              <li>
                <router-link class="dropdown-item" to="/profile">Profil</router-link>
              </li>
              <li v-if="is_admin">
                <router-link class="dropdown-item" to="/tags">Tags</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/add">Ajouter Item</router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <button @click="logout" class="dropdown-item text-danger">Déconnexion</button>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <router-link class="btn btn-primary me-2" to="/login">Connexion</router-link>
          <router-link class="btn btn-outline-primary" to="/signup">Inscription</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '../stores/authStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    /**
     * Indique si l'utilisateur est authentifié.
     * 
     * @returns {Boolean} True si l'utilisateur est connecté, sinon False.
     */
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    /**
     * Indique si l'utilisateur actuel est administrateur.
     * 
     * @returns {Boolean} True si l'utilisateur est admin, sinon False.
     */
    const is_admin = computed(() => authStore.is_admin);

    /**
     * Récupère l'avatar de l'utilisateur connecté.
     * 
     * @returns {String} URL de l'avatar de l'utilisateur.
     */
    const userAvatar = computed(() => authStore.user?.avatar);

    /**
     * Récupère le nom d'utilisateur de l'utilisateur connecté.
     * 
     * @returns {String} Nom d'utilisateur.
     */
    const username = computed(() => authStore.user?.username);

    /**
     * Déconnecte l'utilisateur et le redirige vers la page de connexion.
     */
    const logout = () => {
      authStore.logoutUser(router);
    };

    return {
      isAuthenticated,
      is_admin,
      userAvatar,
      logout,
      username,
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: var(--primary-dark-blue) !important;
}

.dropdown-toggle-no-arrow::after {
  display: none !important;
}
</style> -->

<template>
  <p>Navbar component</p>
</template>

<script></script>

<style></style>
<template>
  <nav class="navbar navbar-expand-lg bg-light shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/logo.svg" alt="Logo" class="me-2" height="25" />
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <!-- Additional navigation links if needed -->
        </ul>
      </div>
      <div class="d-flex align-items-center">
        <template v-if="isAuthenticated">
          <span class="me-2 nav-username fw-medium">{{ username }}</span>
          <div class="dropdown">
            <button class="btn btn-link p-0 border-0 dropdown-toggle-no-arrow" type="button" id="avatarDropdown"
              data-bs-toggle="dropdown" aria-expanded="false">
              <img :src="avatar" alt="User Avatar"
                class="rounded-circle p-0 border border-success border-3 avatar img-thumbnail nav-avatar" width="50"
                height="50" />
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="avatarDropdown">
              <li v-if="isOrganizer">
                <router-link class="dropdown-item" to="/add-event">
                  <i class="bi bi-plus-circle"></i> Add event
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item disabled" to="#">
                  <i class="bi bi-person-circle"></i> Profile
                  <span class="badge bg-warning text-dark">Soon!</span>
                </router-link>
              </li>
              <li>
                <button @click="logout" class="dropdown-item text-danger">
                  <i class="bi bi-box-arrow-right"></i> Log out
                </button>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <router-link class="btn btn-primary me-2" to="/login">
            <i class="bi bi-box-arrow-in-right"></i> Log in
          </router-link>
          <router-link class="btn btn-outline-primary" to="/register">
            <i class="bi bi-person-plus"></i> Register
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const username = computed(() => userStore.username);
    const avatar = computed(() => userStore.avatar);
    const isOrganizer = computed(() => userStore.isOrganizer);

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      isAuthenticated,
      username,
      avatar,
      isOrganizer,
      logout
    };
  },
};
</script>

<style scoped>
.navbar {
  padding: 1rem;
}

.dropdown-toggle-no-arrow::after {
  display: none !important;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg bg-light shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" to="/">
        <img src="@/assets/logo.svg" alt="Logo" class="me-2" height="25" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <!-- Add additional navigation links if needed -->
        </ul>
      </div>
      <div class="d-flex align-items-center">
        <template v-if="isAuthenticated">
          <span class="me-2 nav-username fw-medium">{{ username }}</span>
          <div class="dropdown">
            <button class="btn btn-link p-0 border-0 dropdown-toggle-no-arrow" type="button" id="avatarDropdown"
              data-bs-toggle="dropdown" aria-expanded="false">
              <div class="avatar-border">
                <img :src="userAvatar || defaultAvatar" alt="User Avatar" class="rounded-circle avatar img-thumbnail nav-avatar" />
              </div>
            </button>
            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="avatarDropdown">
              <li v-if="isOrganizer">
                <router-link class="dropdown-item" to="/add-festival">
                  <i class="bi bi-plus-circle"></i> Add Festival
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/profile">
                  <i class="bi bi-person-circle"></i> Profile
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
import defaultAvatar from '@/assets/default-avatar.png'; // Ensure this path is correct

export default {
  name: 'NavBar',
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isOrganizer = computed(() => userStore.isOrganizer);
    const userAvatar = computed(() => userStore.avatar);
    const username = computed(() => userStore.username);

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      isAuthenticated,
      isOrganizer,
      userAvatar,
      username,
      logout,
      defaultAvatar,
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

.avatar-border {
  width: 40px;
  height: 40px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

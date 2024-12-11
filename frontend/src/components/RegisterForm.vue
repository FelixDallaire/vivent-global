<!-- src/components/RegisterForm.vue -->

<template>
    <form @submit.prevent="handleRegister" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="username" class="form-label">Nom d'utilisateur</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="username"
          required
          placeholder="Choisissez un nom d'utilisateur"
        />
        <div class="invalid-feedback">
          Veuillez entrer un nom d'utilisateur.
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
          placeholder="Choisissez un mot de passe"
        />
        <div class="invalid-feedback">
          Veuillez entrer un mot de passe.
        </div>
      </div>
      <button type="submit" class="btn btn-outline-primary">
        <i class="bi bi-person-plus"></i> Inscription
      </button>
      <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'RegisterForm',
    setup() {
      const username = ref('');
      const password = ref('');
      const error = ref(null);
      const authStore = useAuthStore();
      const router = useRouter();
  
      const handleRegister = async () => {
        try {
          await authStore.register(username.value, password.value);
          router.push('/dashboard');
        } catch (err) {
          error.value = 'Échec de l\'inscription. Le nom d\'utilisateur peut-être déjà pris.';
        }
      };
  
      return {
        username,
        password,
        handleRegister,
        error,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques au formulaire d'inscription */
  </style>
  
<template>
  <form @submit.prevent="handleLogin" class="needs-validation text-start" novalidate>
    <div class="mb-3">
      <label for="username" class="form-label text-uppercase">Nom d'utilisateur</label>
      <input type="text" class="form-control border border-black border-2" id="username" v-model="username" required
        placeholder="Entrez votre nom d'utilisateur" />
      <div class="invalid-feedback">
        Veuillez entrer votre nom d'utilisateur.
      </div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label text-uppercase">Mot de passe</label>
      <input type="password" class="form-control border border-black border-2" id="password" v-model="password" required
        placeholder="Entrez votre mot de passe" />
      <div class="invalid-feedback">
        Veuillez entrer votre mot de passe.
      </div>
    </div>
    <div class="text-center mb-4">
      <button type="submit" class="btn btn-outline-dark text-uppercase border-2">Connexion</button>
    </div>
    <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "LoginForm",
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await authStore.login(username.value, password.value);
        router.push("/dashboard");
      } catch (err) {
        error.value = "Identifiants invalides. Veuillez réessayer.";
      }
    };

    return {
      username,
      password,
      handleLogin,
      error,
    };
  },
};
</script>

<style scoped>
</style>

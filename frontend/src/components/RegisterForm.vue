<template>
  <form @submit.prevent="handleRegister" class="needs-validation text-start" novalidate>
    <!-- Username -->
    <div class="mb-3">
      <label for="username" class="form-label text-uppercase">Nom d'utilisateur</label>
      <input type="text" class="form-control border border-black border-2" id="username" v-model="username" required
        placeholder="Entrez votre nom d'utilisateur" />
      <div class="invalid-feedback">
        Veuillez entrer votre nom d'utilisateur.
      </div>
    </div>
    
    <!-- Password -->
    <div class="mb-3">
      <label for="password" class="form-label text-uppercase">Mot de passe</label>
      <input type="password" class="form-control border border-black border-2" id="password" v-model="password" required
        placeholder="Entrez votre mot de passe" />
      <div class="invalid-feedback">
        Veuillez entrer votre mot de passe.
      </div>
    </div>
    
    <!-- Confirm Password -->
    <div class="mb-3">
      <label for="confirmPassword" class="form-label text-uppercase">Confirmez le mot de passe</label>
      <input type="password" class="form-control border border-black border-2" id="confirmPassword"
        v-model="confirmPassword" required placeholder="Confirmez votre mot de passe" />
      <div class="invalid-feedback">
        Veuillez confirmer votre mot de passe.
      </div>
    </div>
    
    <!-- Role Selection -->
    <div class="mb-3">
      <label for="role" class="form-label text-uppercase">Rôle</label>
      <select id="role" class="form-select border border-black border-2" v-model="role" required>
        <option value="" disabled>Choisissez un rôle</option>
        <option value="Participant">Participant</option>
        <option value="Organizer">Organisateur</option>
      </select>
      <div class="invalid-feedback">
        Veuillez sélectionner un rôle.
      </div>
    </div>

    <!-- Submit Button -->
    <div class="text-center mb-4">
      <button type="submit" class="btn btn-outline-dark text-uppercase border-2">C'est parti</button>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

export default {
  name: "RegisterForm",
  setup() {
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const role = ref(""); // Added role selection
    const error = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();

    const handleRegister = async () => {
      try {
        if (password.value !== confirmPassword.value) {
          error.value = "Les mots de passe ne correspondent pas.";
          return;
        }
        if (!role.value) {
          error.value = "Veuillez sélectionner un rôle.";
          return;
        }
        await authStore.register(username.value, password.value, role.value);
        router.push("/dashboard");
      } catch (err) {
        error.value = "Une erreur s'est produite. Veuillez réessayer.";
      }
    };

    return {
      username,
      password,
      confirmPassword,
      role,
      handleRegister,
      error,
    };
  },
};
</script>

<style scoped>
/* Add any additional custom styles if necessary */
</style>

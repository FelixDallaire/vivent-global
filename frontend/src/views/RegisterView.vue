<template>
  <div class="d-flex justify-content-center align-items-center register-container">
    <div class="register-wrapper m-auto p-4 text-center rounded shadow">
      <h1 class="mb-4 text-uppercase">Inscription</h1>
      <RegisterForm />
      <router-link to="/login" class="text-dark fw-semibold text-decoration-none">
        Déjà inscrit ? <span class="vivent-text-purple">Connectez-vous ici</span>.
      </router-link>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'RegisterView',
  components: {
    RegisterForm
  }
};
</script>

<style scoped>
.register-container {
  height: calc(100vh - var(--navbar-height));
}

.register-wrapper {
  max-width: 400px;
  background-color: #F9F4F1;
}

h1 {
  color: #333;
}
</style>

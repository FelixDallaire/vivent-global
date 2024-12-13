<template>
  <div class="d-flex justify-content-center align-items-center login-container">
    <div class="login-wrapper m-auto p-4 text-center rounded shadow">
      <h1 class="mb-4 text-uppercase">Connexion</h1>
      <LoginForm />
      <router-link to="/register" class="text-dark fw-semibold text-decoration-none">Pas encore inscrit ? <span
          class="vivent-text-purple">Inscrivez-vous ici</span>.</router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.login-container {
  height: calc(100vh - var(--navbar-height));
}

.login-wrapper {
  max-width: 400px;
  background-color: #F9F4F1;
}

h1 {
  color: #333;
}
</style>

<template>
    <div class="login-container">
      <h1 class="mb-4">Connexion</h1>
      <LoginForm />
      <router-link to="/register">Pas encore inscrit ? Inscrivez-vous ici.</router-link>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue'; // Assurez-vous que le chemin est correct
  
  export default {
    name: 'LoginView',
    components: {
      LoginForm
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 50px;
    text-align: center;
  }
  
  h1 {
    color: #333;
  }
  </style>
  
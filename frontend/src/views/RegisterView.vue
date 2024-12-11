<!-- src/views/RegisterView.vue -->
<template>
    <div class="register-container">
      <h1 class="mb-4">Inscription</h1>
      <RegisterForm />
      <router-link to="/login">Déjà inscrit ? Connectez-vous ici.</router-link>
    </div>
  </template>
  
  <script>
  import RegisterForm from '@/components/RegisterForm.vue'; // Vérifiez le chemin
  
  export default {
    name: 'RegisterView',
    components: {
      RegisterForm
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: auto;
    padding: 50px;
    text-align: center;
  }
  
  h1 {
    color: #333;
  }
  </style>
  
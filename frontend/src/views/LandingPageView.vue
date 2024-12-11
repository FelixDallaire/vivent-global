<template>
  <div class="landing-page text-center">
    <div class="container py-5">
      <h1 class="display-4 mb-4">Bienvenue à Notre Application</h1>
      <p class="lead mb-5">
        Gérez vos événements facilement et efficacement. Connectez-vous ou inscrivez-vous dès maintenant pour commencer !
      </p>
      <div>
        <router-link to="/login" class="btn btn-primary btn-lg me-3">
          <i class="bi bi-box-arrow-in-right"></i> Connexion
        </router-link>
        <router-link to="/register" class="btn btn-outline-primary btn-lg">
          <i class="bi bi-person-plus"></i> Inscription
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPageView',
};
</script>

<style scoped>
.landing-page {
  background: url('../assets/landing-background.jpg') no-repeat center center;
  background-size: cover;
  color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-page .container {
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>

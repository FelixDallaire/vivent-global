// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import LandingPageView from '../views/LandingPageView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import EventDetailView from '../views/EventDetailView.vue';
import AddFestivalView from '../views/AddFestivalView.vue';
import { useAuthStore } from '../stores/auth';
import { useUserStore } from '../stores/user';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPageView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventDetailView,
    meta: { requiresAuth: true },
  },
  {
    path: '/add-festival',
    name: 'AddFestival',
    component: AddFestivalView,
    meta: { requiresAuth: true, requiresRole: 'organizer' }, // Correspond à votre modèle backend où le rôle par défaut est 'organizer'
  },
  // Ajoutez d'autres routes ici si nécessaire
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation globale pour protéger les routes nécessitant une authentification et un rôle spécifique
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = userStore.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
    // Rediriger vers le dashboard ou une page d'erreur si le rôle ne correspond pas
    next('/dashboard');
  } else {
    next();
  }
});

export default router;

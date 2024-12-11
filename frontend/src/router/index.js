import { createRouter, createWebHistory } from 'vue-router';
import LandingPageView from '@/views/LandingPageView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import EventDetailView from '@/views/EventDetailView.vue';
import AddEventView from '@/views/AddEventView.vue';
import MapSelectionView from '@/views/MapSelectionView.vue';
import MapEditingView from '@/views/MapEditingView.vue';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { useEventStore } from '@/stores/event';

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
    path: '/add-event',
    name: 'AddEvent',
    component: AddEventView,
    meta: { requiresAuth: true, requiresRole: 'organizer' },
  },
  {
    path: '/edit-event/:id',
    name: 'EditEvent',
    component: AddEventView,
    meta: { requiresAuth: true, requiresRole: 'organizer' },
  },
  {
    path: '/map-selection',
    name: 'MapSelection',
    component: MapSelectionView,
    meta: { requiresAuth: true, requiresRole: 'organizer' }
  },
  {
    path: '/map-editing',
    name: 'MapEditing',
    component: MapEditingView,
    meta: { requiresAuth: true, requiresRole: 'organizer' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const eventStore = useEventStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresRole && to.meta.requiresRole !== userStore.role) {
    next('/dashboard');
  } else if (to.name === 'MapEditing' && !eventStore.selectedMap) {
    next({ name: 'MapSelection' });
  } else {
    next();
  }
});

export default router;
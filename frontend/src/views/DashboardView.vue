<template>
  <div class="m-auto p-3 text-center w-50 text-light">
    <h1>Bienvenue, {{ username }} !</h1>
    <p v-if="isOrganizer">Vous avez la possibilité de gérer et de créer des événements.</p>
    <p v-else>Vous pouvez explorer les événements et interagir avec eux.</p>
    <EventList />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useEventStore } from '@/stores/event';
import { computed, onMounted } from 'vue';
import EventList from '../components/EventList.vue';

export default {
  name: 'DashboardView',
  components: {
    EventList
  },
  setup() {
    const userStore = useUserStore();
    const eventStore = useEventStore();

    const isOrganizer = computed(() => userStore.isOrganizer);
    const username = computed(() => userStore.username);

    onMounted(() => {
      eventStore.fetchEvents();
    });

    return {
      isOrganizer,
      username
    };
  },
};
</script>

<style scoped>
.landing-page {
  height: calc(100vh - var(--navbar-height));
  width: 100%;
}
</style>

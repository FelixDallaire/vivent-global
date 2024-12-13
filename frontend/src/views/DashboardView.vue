<template>
  <div class="m-auto p-3 text-center w-50 text-light">
    <h1>Welcome, {{ username }}!</h1>
    <p v-if="isOrganizer">You have the ability to manage and create Events.</p>
    <p v-else>You can explore events and engage with them.</p>
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

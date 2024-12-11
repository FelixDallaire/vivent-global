<template>
  <div class="dashboard-container">
    <h1>Welcome, {{ username }}!</h1>
    <p v-if="isOrganizer">You have the ability to manage and create festivals.</p>
    <p v-else>You can explore events and engage with them.</p>
    <!-- Event List Component included here -->
    <EventList />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import EventList from '../components/EventList.vue';

export default {
  name: 'DashboardView',
  components: {
    EventList // Registering the EventList component for use
  },
  setup() {
    const userStore = useUserStore();

    const isOrganizer = computed(() => userStore.isOrganizer);
    const username = computed(() => userStore.username);

    return {
      isOrganizer,
      username
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
}
</style>

<template>
  <div class="dashboard-container">
    <h1>Welcome, {{ username }}!</h1>
    <p v-if="isOrganizer">You have the ability to manage and create Events.</p>
    <p v-else>You can explore events and engage with them.</p>
    <!-- Event List Component included here -->
    <EventList />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { useEventStore } from '@/stores/event'; // Import EventStore
import { computed, onMounted } from 'vue';
import EventList from '../components/EventList.vue';

export default {
  name: 'DashboardView',
  components: {
    EventList // Registering the EventList component for use
  },
  setup() {
    const userStore = useUserStore();
    const eventStore = useEventStore(); // Use the EventStore

    const isOrganizer = computed(() => userStore.isOrganizer);
    const username = computed(() => userStore.username);

    // Fetch events when component mounts
    onMounted(() => {
      eventStore.fetchEvents(); // Call fetchEvents from EventStore
    });

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

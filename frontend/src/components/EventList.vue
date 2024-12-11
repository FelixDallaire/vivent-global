<template>
  <div>
    <h2>Event List</h2>
    <!-- Check if there are events and display them; if not, show a message -->
    <div v-if="events.length > 0">
      <EventCard v-for="event in events" :key="event._id" :event="event" />
    </div>
    <div v-else>
      <p>You currently have no events.</p>
    </div>
  </div>
</template>

<script>
import { useEventStore } from '@/stores/event';
import EventCard from './EventCard.vue';

export default {
  components: {
    EventCard
  },
  setup() {
    const eventStore = useEventStore();
    // Fetch events when the component is created
    eventStore.fetchEvents();

    return {
      events: eventStore.events
    };
  }
};
</script>

<style scoped>
/* Styles for the event list container and cards can be added here */
</style>

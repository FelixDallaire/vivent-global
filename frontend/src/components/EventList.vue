<template>
  <div>
    <h2>Liste des événements</h2>
    <div v-if="events.length > 0">
      <EventCard v-for="event in events" :key="event._id" :event="event" />
    </div>
    <div v-else>
      <p>Vous n'avez actuellement aucun événement.</p>
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
    eventStore.fetchEvents();

    return {
      events: eventStore.events
    };
  }
};
</script>

<style scoped></style>

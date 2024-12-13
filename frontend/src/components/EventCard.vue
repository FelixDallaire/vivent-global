<template>
  <div class="event-card" @click="navigateToMapEditing">
    <h3>{{ event.name }}</h3>
    <p>{{ event.description || 'No description provided.' }}</p>
    <div class="date-info">
      <p><strong>Start Date:</strong> {{ formatDate(event.startDate) }}</p>
      <p><strong>End Date:</strong> {{ formatDate(event.endDate) }}</p>
    </div>
    <p><strong>Map Type:</strong> {{ event.mapType }}</p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';

export default {
  props: {
    event: Object
  },
  setup(props) {
    const router = useRouter();
    const { event } = toRefs(props);

    function navigateToMapEditing() {
      if (event.value._id) {
        router.push({ name: 'MapEditing', params: { eventId: event.value._id } });
      } else {
        console.error('Event ID is undefined');
      }
    }

    return { navigateToMapEditing };
  },
  methods: {
    formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer; /* Indicates that the card is clickable */
  transition: transform 0.1s ease, box-shadow 0.1s ease;

  /* Hover effect for better user feedback */
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
}
</style>

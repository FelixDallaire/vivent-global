<template>
  <div class="container mt-5">
    <h1>{{ eventId ? 'Edit Event' : 'Add New Event' }}</h1>
    <EventForm :initialData="event" @form-submit="handleFormSubmit" />
  </div>
</template>

<script>
import EventForm from '@/components/EventForm.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '@/stores/event';

export default {
  components: {
    EventForm
  },
  setup() {
    const eventStore = useEventStore();
    const route = useRoute();
    const router = useRouter();
    const eventId = ref(route.params.id);
    const event = ref({
      _id: null,
      name: '',
      description: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
    });

    onMounted(async () => {
      if (eventId.value) {
        const fetchedEvent = await eventStore.fetchEventById(eventId.value);
        event.value = fetchedEvent || event.value;
      }
    });

    const handleFormSubmit = async (formData) => {
      try {
        const currentEvent = eventId.value
          ? await eventStore.updateEvent(eventId.value, formData)
          : await eventStore.addEvent(formData);
        router.push({ name: 'MapSelection', params: { eventId: currentEvent._id } });
      } catch (error) {
        console.error('Error submitting event:', error);
        alert(error.response?.data?.message || 'An error occurred while submitting the event.');
      }
    };


    return { eventId, event, handleFormSubmit };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>

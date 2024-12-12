<template>
  <div class="map-canvas-container" v-if="event.mapType">
    <MapCanvas :mapType="event.mapType" :eventId="eventId" ref="mapCanvas" />
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import { useEventStore } from '@/stores/event';
import MapCanvas from '@/components/MapEditor/MapCanvas.vue';

export default {
  components: {
    MapCanvas,
  },
  props: {
    eventId: String, // Parent component receives eventId
  },
  setup(props) {
    const eventStore = useEventStore();
    const event = ref({ mapType: null });

    onMounted(async () => {
      if (props.eventId) {
        const fetchedEvent = await eventStore.fetchEventById(props.eventId);
        event.value = fetchedEvent;
      }
    });

    return {
      event,
    };
  },
};
</script>

<style scoped>
.map-canvas-container {
  width: 100vw;
  height: 100vh;
  background-color: salmon;
  overflow: hidden;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>

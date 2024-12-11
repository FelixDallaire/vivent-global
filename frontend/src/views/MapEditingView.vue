<template>
  <div class="map-canvas-container">
    <MapCanvas :mapType="event.mapType" ref="mapCanvas" />
    <MapControls
      @zoom-in="handleZoomIn"
      @zoom-out="handleZoomOut"
      @center-map="handleCenter"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useEventStore } from '@/stores/event';
import MapCanvas from '@/components/MapEditor/MapCanvas.vue';
import MapControls from '@/components/MapEditor/MapControls.vue';

export default {
  components: {
    MapCanvas,
    MapControls,
  },
  props: {
    eventId: String,
  },
  setup(props) {
    const eventStore = useEventStore();
    const event = ref({ mapType: null });
    const mapCanvas = ref(null);

    onMounted(async () => {
      if (props.eventId) {
        const fetchedEvent = await eventStore.fetchEventById(props.eventId);
        event.value = fetchedEvent;
      }
    });

    const handleZoomIn = () => {
      mapCanvas.value.zoomIn();
    };

    const handleZoomOut = () => {
      mapCanvas.value.zoomOut();
    };

    const handleCenter = () => {
      mapCanvas.value.centerMap();
    };

    return {
      event,
      handleZoomIn,
      handleZoomOut,
      handleCenter,
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

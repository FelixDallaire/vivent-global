<template>
  <div class="app-container">
    <div v-if="isLoading" class="loading">
      Chargement des données...
    </div>
    <MapCanvas
      v-else-if="mapType && combinedMarkers.length > 0"
      :markers="combinedMarkers"
      @select-marker="openMarkerSettings"
      :selectedMarker="selectedMarker"
      :mapType="mapType"
    />
    <MarkerSettingsModal
      v-if="showModal"
      :selectedMarker="selectedMarker"
      @close="closeMarkerSettings"
    />

    <MarkerSettingsModal
  :selectedMarker="selectedMarker"
  v-if="selectedMarker"
  @close="closeMarkerSettings"
/>

  </div>
</template>

<script>
import MapCanvas from "../components/MapEditor/MapCanvas.vue";
import MarkerSettingsModal from "../components/MapEditor/MarkerSettingsModal.vue";
import { useMarkerStore } from "@/stores/marker";
import { markerPlaceholders } from "@/configs/markerPlaceholders";
import { useEventStore } from "@/stores/event";

export default {
  name: "MapEditingView",
  components: {
    MapCanvas,
    MarkerSettingsModal,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedMarker: null,
      showModal: false, // Control modal visibility
      combinedMarkers: [],
      eventDetails: null,
      mapType: null,
      isLoading: true,
    };
  },
  methods: {
    async fetchAndCombineMarkers() {
      this.isLoading = true;
      const markerStore = useMarkerStore();
      await markerStore.fetchMarkersForEvent(this.eventId);
      const dynamicMarkers = markerStore.markers;
      const placeholders = markerPlaceholders[this.mapType] || [];
      const mergedMarkers = placeholders.map((placeholder) => {
        const matchingMarker = dynamicMarkers.find(
          (marker) => marker.x === placeholder.x && marker.y === placeholder.y
        );
        return matchingMarker || { ...placeholder, isPlaceholder: true };
      });
      const uniqueDynamicMarkers = dynamicMarkers.filter(
        (marker) =>
          !placeholders.some(
            (placeholder) => placeholder.x === marker.x && placeholder.y === marker.y
          )
      );
      this.combinedMarkers = [...mergedMarkers, ...uniqueDynamicMarkers];
      this.isLoading = false;
    },
    async fetchEventDetails() {
      const eventStore = useEventStore();
      try {
        const event = await eventStore.fetchEventById(this.eventId);
        this.eventDetails = event;
        this.mapType = event.mapType;
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    },
    openMarkerSettings(marker) {
      this.selectedMarker = marker;
      this.showModal = true;
    },
    closeMarkerSettings() {
      this.showModal = false;
      this.selectedMarker = null;
    },
  },
  watch: {
    eventId: {
      immediate: true,
      handler() {
        this.fetchEventDetails().then(() => {
          if (this.mapType) {
            this.fetchAndCombineMarkers();
          }
        });
      },
    },
  },
};
</script>



<style scoped>
.app-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 20px;
}
.loading {
  font-size: 1.2em;
  color: #555;
  text-align: center;
  width: 100%;
}
</style>

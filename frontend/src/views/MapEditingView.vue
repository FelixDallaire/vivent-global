<template>
  <div class="app-container">
    <div v-if="isLoading" class="loading">
      Chargement des données...
    </div>
    <MapCanvas
      v-else-if="mapType && combinedMarkers.length > 0"
      :markers="combinedMarkers"
      @select-marker="selectMarker"
      :selectedMarker="selectedMarker"
      :mapType="mapType"
    />
    <IconSelector
      v-else
      :icons="icons"
      :selectedMarker="selectedMarker"
      @update-marker="updateMarkerIcon"
    />
  </div>
</template>

<script>
import MapCanvas from "../components/MapEditor/MapCanvas.vue";
import IconSelector from "../components/MapEditor/IconSelector.vue";
import { useMarkerStore } from "@/stores/marker";
import { markerPlaceholders } from "@/configs/markerPlaceholders";
import { useEventStore } from "@/stores/event";

export default {
  name: "MapEditingView",
  components: {
    MapCanvas,
    IconSelector,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      icons: ["square", "circle", "triangle"],
      selectedMarker: null,
      combinedMarkers: [], // Combines placeholders and markers from store
      eventDetails: null, // Store fetched event details
      mapType: null, // Dynamically set after fetching event details
      isLoading: true, // Loading state
    };
  },
  methods: {
    async fetchAndCombineMarkers() {
      this.isLoading = true;
      const markerStore = useMarkerStore();

      // Fetch dynamic markers from the store
      await markerStore.fetchMarkersForEvent(this.eventId);
      const dynamicMarkers = markerStore.markers;
      console.log("Dynamic Markers from Store:", dynamicMarkers);

      // Retrieve placeholders for the current map type
      const placeholders = markerPlaceholders[this.mapType] || [];
      console.log("Placeholders for Map Type:", this.mapType, placeholders);

      // Merge placeholders and dynamic markers
      const mergedMarkers = placeholders.map((placeholder) => {
        const matchingMarker = dynamicMarkers.find(
          (marker) => marker.x === placeholder.x && marker.y === placeholder.y
        );
        return matchingMarker || { ...placeholder, isPlaceholder: true };
      });

      // Include custom dynamic markers not matching placeholders
      const uniqueDynamicMarkers = dynamicMarkers.filter(
        (marker) =>
          !placeholders.some(
            (placeholder) => placeholder.x === marker.x && placeholder.y === marker.y
          )
      );

      this.combinedMarkers = [...mergedMarkers, ...uniqueDynamicMarkers];
      console.log("Combined Markers:", this.combinedMarkers);
      this.isLoading = false;
    },
    async fetchEventDetails() {
      const eventStore = useEventStore();
      try {
        const event = await eventStore.fetchEventById(this.eventId);
        this.eventDetails = event;

        // Dynamically set mapType based on fetched event details
        this.mapType = event.mapType;
        console.log("Fetched Event Details:", event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    },
    selectMarker(marker) {
      this.selectedMarker = marker;
    },
    updateMarkerIcon(icon) {
      if (this.selectedMarker) {
        this.selectedMarker.type = icon;
      }
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

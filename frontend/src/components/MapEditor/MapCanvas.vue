<template>
  <div class="map-canvas">
    <!-- Display the SVG map -->
    <img v-if="mapUrl" :src="mapUrl" alt="Map" class="map-image" />

    <!-- Render clickable markers -->
    <svg v-if="placeholders.length" xmlns="http://www.w3.org/2000/svg" class="marker-layer">
      <image
        v-for="placeholder in placeholders"
        :key="placeholder.id"
        :href="getMarkerImageUrl()"
        :x="placeholder.x - 15"
        :y="placeholder.y - 15"
        width="30"
        height="30"
        @click="onMarkerClick(placeholder)"
        class="marker-icon"
      />
      <text
        v-for="placeholder in placeholders"
        :key="`${placeholder.id}-label`"
        :x="placeholder.x + 20"
        :y="placeholder.y"
        font-size="12"
        fill="black"
      >
        {{ placeholder.label }}
      </text>
    </svg>

    <!-- Marker Settings Modal -->
    <MarkerSettingsModal
      v-if="isModalVisible"
      :visible="isModalVisible"
      :marker="selectedMarker"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import { markerPlaceholders } from '@/configs/markerPlaceholders';
import MarkerSettingsModal from '@/components/Mapeditor/MarkerSettingsModal.vue';

export default {
  components: {
    MarkerSettingsModal,
  },
  props: {
    mapType: String,
    eventId: String,
  },
  data() {
    return {
      mapUrl: null, // URL of the SVG map
      placeholders: [], // Marker placeholders for the current map
      isModalVisible: false, // Controls modal visibility
      selectedMarker: null, // Currently selected marker
    };
  },
  watch: {
    mapType: {
      immediate: true,
      handler(newVal) {
        this.loadMap(newVal);
        this.loadPlaceholders(newVal);
      },
    },
  },
  methods: {
    loadMap(mapType) {
      if (mapType) {
        // Construct the URL for the SVG map
        this.mapUrl = `https://felixdallaire.github.io/svg-hosting/maps/${mapType}`;
      }
    },
    loadPlaceholders(mapType) {
      if (markerPlaceholders[mapType]) {
        this.placeholders = markerPlaceholders[mapType];
      } else {
        console.warn(`No marker placeholders found for mapType: ${mapType}`);
        this.placeholders = [];
      }
    },
    getMarkerImageUrl() {
      // Return the URL of the default marker image
      return `https://felixdallaire.github.io/svg-hosting/markers/default.svg`;
    },
    onMarkerClick(marker) {
      console.log(`Marker clicked:`, marker);
      this.selectedMarker = marker; // Set the clicked marker as selected
      this.isModalVisible = true; // Show the modal
    },
    closeModal() {
      this.isModalVisible = false; // Hide the modal
      this.selectedMarker = null; // Reset the selected marker
    },
  },
};
</script>

<style scoped>
.map-canvas {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.map-image {
  width: auto;
  height: 100%;
  display: block;
  object-fit: contain; /* Ensures the map fits while maintaining aspect ratio */
}

.marker-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.marker-icon {
  cursor: pointer;
  pointer-events: all; /* Make markers clickable */
}
</style>

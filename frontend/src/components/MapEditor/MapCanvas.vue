<template>
  <div class="map-container">
    <!-- Display the map -->
    <img :src="mapImageUrl" alt="Map" class="map-image" />

    <!-- Marker Layer -->
    <MarkerLayer
      v-if="markers && markers.length > 0"
      :markers="markers"
      :selectedMarker="selectedMarker"
      @select-marker="handleMarkerSelect"
    />

    <!-- Display a message if no markers are present -->
    <div v-else>Chargement des marqueurs...</div>
  </div>
</template>

<script>
import MarkerLayer from "./MarkerLayer.vue";

export default {
  name: "MapCanvas",
  components: {
    MarkerLayer,
  },
  props: {
    markers: {
      type: Array,
      required: true,
    },
    mapType: {
      type: String,
      required: true,
    },
    selectedMarker: {
      type: Object,
      default: null,
    },
  },
  computed: {
    mapImageUrl() {
      console.log("Map Type (computed):", this.mapType);
      return `https://felixdallaire.github.io/svg-hosting/maps/${this.mapType}`;
    },
  },
  watch: {
    markers: {
      immediate: true,
      handler(newMarkers) {
        console.log("Markers updated in MapCanvas:", newMarkers);
      },
    },
    mapType: {
      immediate: true,
      handler(newType) {
        console.log("Map Type updated in MapCanvas:", newType);
      },
    },
  },
  methods: {
    handleMarkerSelect(marker) {
      console.log("Marker selected in MapCanvas:", marker);
      this.$emit("select-marker", marker);
    },
  },
  mounted() {
    console.log("Markers (mounted in MapCanvas):", this.markers);
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

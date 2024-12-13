<template>
  <div class="map-container">
    <img :src="mapImageUrl" alt="Map" class="map-image" />
    <MarkerLayer
      v-if="markers && markers.length > 0"
      :markers="markers"
      :selectedMarker="selectedMarker"
      @select-marker="handleMarkerSelect"
    />
    <div v-else>Chargement des marqueurs...</div>
  </div>
</template>

<script>
import MarkerLayer from "@/components/MapEditor/MarkerLayer.vue";

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
    selectedMarker: {
      type: Object,
      default: null,
    },
    mapType: {
      type: String,
      required: true,
    },
  },
  computed: {
    mapImageUrl() {
      return `https://felixdallaire.github.io/svg-hosting/maps/${this.mapType}`;
    },
  },
  methods: {
    handleMarkerSelect(marker) {
      this.$emit("select-marker", marker);
    },
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

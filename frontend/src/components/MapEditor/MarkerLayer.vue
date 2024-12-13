<template>
  <div class="marker-layer">
    <div
      v-for="marker in markers"
      :key="marker.id"
      class="marker"
      :style="markerStyle(marker)"
      @click="handleClick(marker)"
    >
      <img :src="getMarkerIconUrl(marker.type)" :alt="marker.type" class="marker-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkerLayer",
  props: {
    markers: {
      type: Array,
      required: true,
    },
    selectedMarker: {
      type: Object,
      default: null,
    },
  },
  methods: {
    markerStyle(marker) {
      return {
        position: "absolute",
        left: `${marker.x}%`,
        top: `${marker.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
      };
    },
    getMarkerIconUrl(markerType) {
      const defaultIcon = "default.svg";
      return `https://felixdallaire.github.io/svg-hosting/markers/${markerType || defaultIcon}`;
    },
    handleClick(marker) {
      this.$emit("select-marker", marker);
    },
  },
};
</script>

<style scoped>
.marker-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.marker {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: all;
}
.marker-icon {
  width: 25px;
  height: 25px;
  object-fit: contain;
}
</style>

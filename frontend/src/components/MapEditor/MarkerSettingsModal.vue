<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Marker Settings</h2>
      <p>Selected Marker ID: {{ selectedMarker.id }}</p>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>

  
</template>

<script>
export default {
  name: "MarkerSettingsModal",
  props: {
    selectedMarker: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
</style>

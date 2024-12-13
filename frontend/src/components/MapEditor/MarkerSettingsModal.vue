<template>
  <div class="modal fade" id="markerSettingsModal" tabindex="-1" role="dialog"
    aria-labelledby="markerSettingsModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="markerSettingsModalLabel">Marker Settings</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Selected Marker ID: {{ selectedMarker?.id || "No marker selected" }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarkerSettingsModal",
  props: {
    selectedMarker: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for the modal if needed */
</style>

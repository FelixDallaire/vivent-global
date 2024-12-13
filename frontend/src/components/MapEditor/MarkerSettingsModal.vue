<template>
  <div class="modal fade" id="markerSettingsModal" tabindex="-1" role="dialog"
    aria-labelledby="markerSettingsModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="markerSettingsModalLabel">Marker Settings</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="mb-3">
              <label for="markerName" class="form-label">Marker Name</label>
              <input type="text" id="markerName" class="form-control" v-model="editableMarker.name" />
            </div>
            <div class="mb-3">
              <label for="markerDescription" class="form-label">Marker Description</label>
              <textarea id="markerDescription" class="form-control" v-model="editableMarker.description"></textarea>
            </div>
            <div class="mb-3">
              <label for="markerType" class="form-label">Marker Type</label>
              <select id="markerType" class="form-select" v-model="editableMarker.type">
                <option v-for="icon in availableIcons" :key="icon" :value="icon">
                  {{ icon }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">
                Close
              </button>
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
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
  data() {
    return {
      editableMarker: { ...this.selectedMarker }, // Clone selected marker for editing
      availableIcons: [
        "big_stage.svg",
        "default.svg",
        "tent_big.svg",
        "tent_medium.svg",
        "tent_medium_long.svg",
        "tent_small.svg",
      ],
    };
  },
  watch: {
    selectedMarker: {
      immediate: true,
      handler(newMarker) {
        this.editableMarker = { ...newMarker }; // Update editableMarker when selectedMarker changes
      },
    },
  },
  methods: {
    saveChanges() {
      this.$emit("update-marker", this.editableMarker); // Emit updated marker to parent
      this.$emit("close"); // Close modal
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for the modal if needed */
</style>

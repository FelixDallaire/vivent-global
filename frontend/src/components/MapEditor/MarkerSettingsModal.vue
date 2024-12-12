<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>Marker Settings</h2>
  
        <!-- Marker Name -->
        <div class="form-group">
          <label for="markerName">Marker Name</label>
          <input
            id="markerName"
            type="text"
            v-model="markerName"
            placeholder="Enter marker name"
          />
        </div>
  
        <!-- Icon Selection -->
        <div class="form-group">
          <label for="markerIcon">Marker Icon</label>
          <div class="icon-grid">
            <img
              v-for="icon in availableIcons"
              :key="icon"
              :src="getIconUrl(icon)"
              :alt="icon"
              class="icon-option rounded-circle p-1"
              :class="{ selected: selectedIcon === icon }"
              @click="selectedIcon = icon"
            />
          </div>
        </div>
  
        <!-- Additional Information -->
        <div class="form-group">
          <label for="markerDescription">Description</label>
          <textarea
            id="markerDescription"
            v-model="markerDescription"
            placeholder="Enter description"
          ></textarea>
        </div>
  
        <!-- Modal Actions -->
        <div class="modal-actions">
          <button @click="saveSettings">Save</button>
          <button @click="cancelSettings">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      marker: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        markerName: this.marker.name || '',
        selectedIcon: this.marker.icon || '',
        markerDescription: this.marker.description || '',
        availableIcons: ['tent_small.svg', 'tent_medium.svg', 'tent_medium_long.svg', 'tent_big.svg', 'big_stage.svg'], // Example icons
      };
    },
    methods: {
      getIconUrl(icon) {
        return `https://felixdallaire.github.io/svg-hosting/markers/${icon}`;
      },
      saveSettings() {
        const updatedMarker = {
          name: this.markerName,
          icon: this.selectedIcon,
          description: this.markerDescription,
        };
        this.$emit('save', updatedMarker);
      },
      cancelSettings() {
        this.$emit('cancel');
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
    width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .icon-grid {
    display: flex;
    gap: 10px;
  }
  
  .icon-option {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 5px;
  }
  
  .icon-option.selected {
    border-color: blue;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  button {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>
  
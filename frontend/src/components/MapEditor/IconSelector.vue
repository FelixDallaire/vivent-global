<template>
    <div class="modal fade" id="iconSelectorModal" tabindex="-1" aria-labelledby="iconSelectorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="iconSelectorModalLabel">Select Marker Icon</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="icon-grid">
              <svg v-for="icon in icons" :key="icon" @click="selectIcon(icon)"
                   class="icon-image" :class="{ selected: selectedIcon === icon }"
                   width="50" height="50" viewBox="0 0 24 24">
                <path v-if="icon === 'square'" d="M3 3h18v18H3z"/>
                <circle v-if="icon === 'circle'" cx="12" cy="12" r="9"/>
                <polygon v-if="icon === 'triangle'" points="12 2 22 22 2 22"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from "bootstrap"; // Importing Bootstrap's modal functionality
  
  export default {
    props: {
      icons: {
        type: Array,
        required: true,
      },
      selectedMarker: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        selectedIcon: this.selectedMarker?.type || null,
        modalInstance: null, // To store the Bootstrap modal instance
      };
    },
    methods: {
      selectIcon(icon) {
        this.selectedIcon = icon;
        const updatedMarker = {
          ...this.selectedMarker,
          type: icon,
        };
        this.$emit("update-marker", updatedMarker);
        this.closeModal();
      },
      openModal() {
        const modalEl = document.getElementById("iconSelectorModal");
        this.modalInstance = new Modal(modalEl);
        this.modalInstance.show();
      },
      closeModal() {
        if (this.modalInstance) {
          this.modalInstance.hide();
        }
      },
    },
    watch: {
      selectedMarker: {
        immediate: true,
        deep: true,
        handler(newMarker) {
          this.selectedIcon = newMarker?.type || null;
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .icon-image {
    cursor: pointer;
    transition: transform 0.3s;
  }
  .icon-image:hover {
    transform: scale(1.1);
  }
  .icon-image.selected {
    border: 2px solid blue;
    padding: 2px;
  }
  </style>
  
<template>
  <div class="map-container">
    <!-- SVG Map -->
    <svg
      class="map-image"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Map Background -->
      <image
        :href="'https://felixdallaire.github.io/svg-hosting/maps/' + mapType"
        width="100%"
        height="100%"
      />

      <!-- Markers -->
      <g v-for="marker in markers" :key="marker.id || marker.placeholderId">
        <!-- Circle Background -->
        <circle
          :cx="(marker.x / 100) * 800"
          :cy="(marker.y / 100) * 600"
          r="30"
          fill="whitesmoke"
        />
        <!-- Marker Icon -->
        <image
          :x="(marker.x / 100) * 800 - 25"
          :y="(marker.y / 100) * 600 - 25"
          width="50"
          height="50"
          :href="'https://felixdallaire.github.io/svg-hosting/markers/' + (marker.type || 'default.svg')"
          :alt="marker.name"
          class="marker"
          @click.stop="selectMarker(marker)"
          data-bs-toggle="modal"
          data-bs-target="#markerModal"
        />
      </g>
    </svg>

    <!-- Bootstrap Modal -->
    <div
      class="modal fade"
      id="markerModal"
      tabindex="-1"
      aria-labelledby="markerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedMarker">
          <div class="modal-header">
            <h5 class="modal-title" id="markerModalLabel">Edit Marker</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Marker Name -->
            <div class="mb-3">
              <label for="markerName" class="form-label">Marker Name</label>
              <input
                type="text"
                id="markerName"
                v-model="selectedMarker.name"
                class="form-control"
              />
            </div>

            <!-- Marker Description -->
            <div class="mb-3">
              <label for="markerDescription" class="form-label">Marker Description</label>
              <textarea
                id="markerDescription"
                v-model="selectedMarker.description"
                class="form-control"
              ></textarea>
            </div>

            <!-- Marker Type -->
            <div>
              <label class="form-label">Marker Type</label>
              <div class="d-flex flex-wrap gap-2">
                <img
                  v-for="type in markerTypes"
                  :key="type"
                  :src="'https://felixdallaire.github.io/svg-hosting/markers/' + type"
                  :alt="type"
                  class="marker-type-option"
                  :class="{ selected: selectedMarker.type === type }"
                  @click="selectMarkerType(type)"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveMarker">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMarkerStore } from "@/stores/marker";
import { markerPlaceholders } from "@/configs/markerPlaceholders";

export default {
  name: "MapWithMarkers",
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mapType: "map1.svg",
      markers: [],
      selectedMarker: null,
      markerTypes: [
        "big_stage.svg",
        "default.svg",
        "tent_big.svg",
        "tent_medium.svg",
        "tent_medium_long.svg",
        "tent_small.svg",
      ],
    };
  },
  async mounted() {
    try {
      console.log("[mounted] Fetching markers...");
      await this.fetchMarkers();
    } catch (error) {
      console.error("[mounted] Error during initialization:", error);
    }
  },
  methods: {
    async fetchMarkers() {
      const markerStore = useMarkerStore();
      try {
        console.log("[fetchMarkers] Fetching markers for event ID:", this.eventId);
        await markerStore.fetchMarkersForEvent(this.eventId);

        console.log("[fetchMarkers] Fetched markers from store:", markerStore.markers);

        const placeholders = markerPlaceholders[this.mapType] || [];
        console.log("[fetchMarkers] Placeholders for map type:", this.mapType, placeholders);

        this.markers = placeholders
          .map((placeholder) => {
            const fetchedMarker = markerStore.markers.find(
              (m) => m.x === placeholder.x && m.y === placeholder.y
            );
            return fetchedMarker
              ? { ...fetchedMarker, id: fetchedMarker._id }
              : { ...placeholder, isPlaceholder: true, placeholderId: placeholder.id };
          })
          .filter((marker) => marker !== undefined);

        console.log("[fetchMarkers] Combined markers:", this.markers);
      } catch (error) {
        console.error("[fetchMarkers] Error fetching markers:", error);
      }
    },
    selectMarker(marker) {
      if (!marker) {
        console.error("[selectMarker] Cannot select marker: marker is undefined");
        return;
      }
      console.log("[selectMarker] Selected marker:", marker);
      this.selectedMarker = { ...marker };
    },
    selectMarkerType(type) {
      if (!this.selectedMarker) {
        console.error("[selectMarkerType] Cannot select type: No marker selected");
        return;
      }
      console.log("[selectMarkerType] Changing marker type to:", type);
      this.selectedMarker.type = type;
    },
    async saveMarker() {
  try {
    console.log("[saveMarker] Saving marker:", this.selectedMarker);
    const markerStore = useMarkerStore();

    if (this.selectedMarker.isPlaceholder) {
      console.log("[saveMarker] Creating new marker...");
      const newMarker = await markerStore.addMarker({
        eventId: this.eventId,
        x: this.selectedMarker.x,
        y: this.selectedMarker.y,
        type: this.selectedMarker.type,
        name: this.selectedMarker.name,
        description: this.selectedMarker.description,
      });

      if (!newMarker) {
        console.error("[saveMarker] Failed to create new marker");
        return;
      }

      console.log("[saveMarker] Created new marker:", newMarker);

      const index = this.markers.findIndex(
        (marker) => marker.placeholderId === this.selectedMarker.placeholderId
      );
      if (index !== -1) {
        this.markers[index] = { ...newMarker, id: newMarker._id };
      }
    } else {
      if (!this.selectedMarker.id) {
        console.error("[saveMarker] Marker ID is undefined for update");
        return;
      }

      console.log("[saveMarker] Updating existing marker...");
      await markerStore.updateMarker(this.selectedMarker.id, {
        name: this.selectedMarker.name,
        description: this.selectedMarker.description,
        type: this.selectedMarker.type,
      });

      const index = this.markers.findIndex((marker) => marker.id === this.selectedMarker.id);
      if (index !== -1) {
        this.markers[index] = { ...this.selectedMarker };
      }
    }

    // Close the modal programmatically
    const modal = bootstrap.Modal.getInstance(document.getElementById("markerModal"));
    if (modal) {
      modal.hide();
    }
  } catch (error) {
    console.error("[saveMarker] Error saving marker:", error);
  }
}
,
  },
};
</script>

<style scoped>
.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: red;
}

.map-image {
  width: 100%;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  display: block;
  object-fit: contain;
}

.marker-type-option {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  object-fit: contain;
}

.marker-type-option.selected {
  border-color: blue;
}

.marker:hover {
  opacity: 0.75;
  cursor: pointer;
}
</style>

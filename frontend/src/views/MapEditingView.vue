<template>
  <div class="map-container">
    <div v-if="isLoading" class="loading-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <div v-else class="map-content rounded-4 shadow">
      <svg class="map-image rounded-4 shadow" :viewBox="'0 0 360 280'" preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg">
        <image :href="'https://felixdallaire.github.io/svg-hosting/maps/' + mapType" width="360" height="280" />

        <g v-for="marker in markers" :key="marker.id || marker.placeholderId">
          <circle :cx="marker.x * 3.6" :cy="marker.y * 2.8" r="11" fill="whitesmoke" />
          <image :x="marker.x * 3.6 - 10" :y="marker.y * 2.8 - 10" width="20" height="20"
            :href="'https://felixdallaire.github.io/svg-hosting/markers/' + (marker.type || 'default.svg')"
            :alt="marker.name" class="marker" @click.stop="selectMarker(marker)" />
        </g>
      </svg>
    </div>

    <button class="save-dashboard-button btn rounded shadow-sm z-3 px-4 py-2 fw-semibold text-light text-uppercase"
      @click="saveAndGoToDashboard">
      Sauvegarder
    </button>

    <div class="modal fade" id="markerModal" tabindex="-1" aria-labelledby="markerModalLabel" aria-hidden="true"
      ref="markerModal">
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedMarker">
          <div class="modal-header">
            <h5 class="modal-title" id="markerModalLabel">Modifier le marqueur</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="markerName" class="form-label text-uppercase">Nom du marqueur</label>
              <input type="text" id="markerName" v-model="selectedMarker.name"
                class="form-control border border-black border-2" />
            </div>

            <div class="mb-3">
              <label for="markerDescription" class="form-label text-uppercase">Description du marqueur</label>
              <textarea id="markerDescription" v-model="selectedMarker.description"
                class="form-control border border-black border-2"></textarea>
            </div>

            <div>
              <label class="form-label">Type de marqueur</label>
              <div class="d-flex flex-wrap gap-2">
                <img v-for="type in markerTypes" :key="type"
                  :src="'https://felixdallaire.github.io/svg-hosting/markers/' + type" :alt="type"
                  class="marker-type-option rounded-circle p-1" :class="{ selected: selectedMarker.type === type }"
                  @click="selectMarkerType(type)" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger border-2 text-uppercase"
              @click="closeModal">Fermer</button>
            <button type="button" class="btn btn-outline-dark fw-bold border-2 text-uppercase" @click="saveMarker">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMarkerStore } from "@/stores/marker";
import { useEventStore } from "@/stores/event";
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
      mapType: null,
      markers: [],
      selectedMarker: null,
      isLoading: true,
      markerTypes: [
        "default.svg",
        "tent_small.svg",
        "tent_medium.svg",
        "tent_medium_long.svg",
        "tent_big.svg",
        "big_stage.svg",
      ],
      modalInstance: null,
    };
  },
  async mounted() {
    try {
      await this.fetchEvent();
      await this.fetchMarkers();

      const modalElement = this.$refs.markerModal;
      this.modalInstance = new bootstrap.Modal(modalElement);

      this.isLoading = false;
    } catch (error) {
      console.error("[mounted] Erreur lors de l'initialisation :", error);
      this.isLoading = false;
    }
  },
  methods: {
    async fetchEvent() {
      const eventStore = useEventStore();
      try {
        const event = await eventStore.fetchEventById(this.eventId);

        if (event) {
          if (event.mapType) {
            this.mapType = event.mapType;
          } else {
            console.warn("[fetchEvent] Aucun type de carte trouvé. Redirection vers la sélection de carte...");
            this.$router.push({ name: 'MapSelection', params: { eventId: this.eventId } });
          }
        } else {
          console.error("[fetchEvent] Événement non trouvé.");
          alert("Événement non trouvé.");
        }
      } catch (error) {
        console.error("[fetchEvent] Erreur lors de la récupération de l'événement :", error);
        alert("Une erreur est survenue lors de la récupération de l'événement.");
      }
    },
    async fetchMarkers() {
      const markerStore = useMarkerStore();
      try {
        await markerStore.fetchMarkersForEvent(this.eventId);
        const placeholders = markerPlaceholders[this.mapType] || [];

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

      } catch (error) {
        console.error("[fetchMarkers] Erreur lors de la récupération des marqueurs :", error);
      }
    },
    selectMarker(marker) {
      if (!marker) {
        console.error("[selectMarker] Impossible de sélectionner le marqueur : marqueur indéfini");
        return;
      }
      this.selectedMarker = { ...marker };

      this.modalInstance.show();
    },
    closeModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
    selectMarkerType(type) {
      if (!this.selectedMarker) {
        console.error("[selectMarkerType] Impossible de sélectionner un type : aucun marqueur sélectionné");
        return;
      }
      console.log("[selectMarkerType] Changement du type de marqueur en :", type);
      this.selectedMarker.type = type;
    },
    async saveMarker() {
      try {
        console.log("[saveMarker] Sauvegarde du marqueur :", this.selectedMarker);
        const markerStore = useMarkerStore();

        if (this.selectedMarker.isPlaceholder) {
          console.log("[saveMarker] Création d'un nouveau marqueur...");
          const newMarker = await markerStore.addMarker({
            eventId: this.eventId,
            x: this.selectedMarker.x,
            y: this.selectedMarker.y,
            type: this.selectedMarker.type,
            name: this.selectedMarker.name,
            description: this.selectedMarker.description,
          });

          if (!newMarker) {
            console.error("[saveMarker] Échec de la création du nouveau marqueur");
            return;
          }

          console.log("[saveMarker] Nouveau marqueur créé :", newMarker);

          const index = this.markers.findIndex(
            (marker) => marker.placeholderId === this.selectedMarker.placeholderId
          );
          if (index !== -1) {
            this.markers[index] = { ...newMarker, id: newMarker._id };
          }
        } else {
          if (!this.selectedMarker.id) {
            console.error("[saveMarker] ID du marqueur indéfini pour la mise à jour");
            return;
          }

          console.log("[saveMarker] Mise à jour du marqueur existant...");
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

        this.closeModal();
      } catch (error) {
        console.error("[saveMarker] Erreur lors de la sauvegarde du marqueur :", error);
      }
    },
    async saveAndGoToDashboard() {
      try {
        this.$router.push({ name: 'Dashboard' });
      } catch (error) {
        console.error("[saveAndGoToDashboard] Erreur lors de la redirection vers le tableau de bord :", error);
        alert("Une erreur est survenue lors de la sauvegarde et de la redirection.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  overflow: hidden;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - var(--navbar-height));
  overflow: hidden;
}

.map-content {
  height: 90%;
  aspect-ratio: 360 / 280;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map-image {
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background-color: #f8f9fa;
  z-index: 10;
}

.marker:hover {
  cursor: pointer;
  opacity: 0.8;
}

.marker-type-option {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  object-fit: contain;
}

.marker-type-option.selected {
  border-color: #5c0083;
}

.save-dashboard-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: #1d1a18;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: rgba(92, 0, 131, 1);
    color: rgba(255, 255, 255, 0.9);
  }

  &:active {
    background-color: rgba(161, 77, 216, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: none;
  }
}

.modal-content {
  background-color: #F9F4F1 !important;
}
</style>

import { defineStore } from "pinia";
import {
  listMarkersForEvent,
  createMarker,
  updateMarker,
  updateMultipleMarkers,
} from "@/services/markerService";

export const useMarkerStore = defineStore("marker", {
  state: () => ({
    markers: [],
    eventId: null,
  }),
  actions: {
    async fetchMarkersForEvent(eventId) {
      try {
        this.eventId = eventId;
        const markers = await listMarkersForEvent(eventId);
        this.markers = markers;
        console.log(
          "[fetchMarkersForEvent] Markers fetched and stored:",
          this.markers
        );
      } catch (error) {
        console.error("[fetchMarkersForEvent] Failed to fetch markers:", error);
        throw new Error("Failed to fetch markers");
      }
    },

    async addMarker(markerData) {
      if (!this.eventId) {
        throw new Error("Event ID is not set");
      }

      try {
        const newMarker = await createMarker(this.eventId, markerData);
        this.markers.push({ ...newMarker, id: newMarker._id });
        console.log(
          "[addMarker] New marker created and added to state:",
          newMarker
        );
        return newMarker;
      } catch (error) {
        console.error("[addMarker] Failed to add marker:", error);
        throw new Error("Failed to add marker");
      }
    },

    async updateMarker(markerId, updatedData) {
      try {
        const updatedMarker = await updateMarker(markerId, updatedData);

        const index = this.markers.findIndex(
          (marker) => marker.id === markerId || marker._id === markerId
        );
        if (index !== -1) {
          this.markers[index] = { ...updatedMarker, id: updatedMarker._id };
          console.log("[updateMarker] Marker updated in state:", updatedMarker);
        }
        return updatedMarker;
      } catch (error) {
        console.error("[updateMarker] Failed to update marker:", error);
        throw new Error("Failed to update marker");
      }
    },

    async updateMultipleMarkers(markersData) {
      if (!this.eventId) {
        throw new Error("Event ID is not set");
      }

      try {
        const updatedMarkers = await updateMultipleMarkers(
          this.eventId,
          markersData
        );
        this.markers = updatedMarkers.map((marker) => ({
          ...marker,
          id: marker._id,
        }));
        console.log(
          "[updateMultipleMarkers] Markers updated in state:",
          this.markers
        );
      } catch (error) {
        console.error(
          "[updateMultipleMarkers] Failed to update multiple markers:",
          error
        );
        throw new Error("Failed to update multiple markers");
      }
    },

    clearMarkers() {
      console.log("[clearMarkers] Clearing marker state");
      this.markers = [];
      this.eventId = null;
    },
  },
  persist: true,
});

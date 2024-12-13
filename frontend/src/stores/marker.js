import { defineStore } from 'pinia';
import {
  listMarkersForEvent,
  createMarker,
  updateMarker,
  updateMultipleMarkers,
} from '@/services/markerService';

export const useMarkerStore = defineStore('marker', {
  state: () => ({
    markers: [], // Array to store markers
    eventId: null, // Currently selected event ID
  }),
  actions: {
    /**
     * Fetches all markers for a specific event and stores them in the state
     * @param {String} eventId - The ID of the event
     */
    async fetchMarkersForEvent(eventId) {
      try {
        this.eventId = eventId;
        const markers = await listMarkersForEvent(eventId);
        this.markers = markers;
        console.log('[fetchMarkersForEvent] Markers fetched and stored:', this.markers);
      } catch (error) {
        console.error('[fetchMarkersForEvent] Failed to fetch markers:', error);
        throw new Error('Failed to fetch markers');
      }
    },

    /**
     * Adds a new marker to the current event and updates the state
     * @param {Object} markerData - Data for the new marker
     * @returns {Object} The newly created marker
     */
    async addMarker(markerData) {
      if (!this.eventId) {
        throw new Error('Event ID is not set');
      }

      try {
        const newMarker = await createMarker(this.eventId, markerData);
        this.markers.push({ ...newMarker, id: newMarker._id }); // Ensure `id` is accessible
        console.log('[addMarker] New marker created and added to state:', newMarker);
        return newMarker; // Return the created marker
      } catch (error) {
        console.error('[addMarker] Failed to add marker:', error);
        throw new Error('Failed to add marker');
      }
    },

    /**
     * Updates an existing marker and reflects the change in the state
     * @param {String} markerId - The ID of the marker to update
     * @param {Object} updatedData - The updated data for the marker
     * @returns {Object} The updated marker
     */
    async updateMarker(markerId, updatedData) {
      try {
        const updatedMarker = await updateMarker(markerId, updatedData);

        // Update the local state
        const index = this.markers.findIndex((marker) => marker.id === markerId || marker._id === markerId);
        if (index !== -1) {
          this.markers[index] = { ...updatedMarker, id: updatedMarker._id }; // Ensure `id` is accessible
          console.log('[updateMarker] Marker updated in state:', updatedMarker);
        }
        return updatedMarker; // Return the updated marker
      } catch (error) {
        console.error('[updateMarker] Failed to update marker:', error);
        throw new Error('Failed to update marker');
      }
    },

    /**
     * Updates multiple markers for the current event and reflects the changes in the state
     * @param {Array<Object>} markersData - Array of marker updates
     */
    async updateMultipleMarkers(markersData) {
      if (!this.eventId) {
        throw new Error('Event ID is not set');
      }

      try {
        const updatedMarkers = await updateMultipleMarkers(this.eventId, markersData);
        this.markers = updatedMarkers.map((marker) => ({ ...marker, id: marker._id })); // Ensure `id` is accessible
        console.log('[updateMultipleMarkers] Markers updated in state:', this.markers);
      } catch (error) {
        console.error('[updateMultipleMarkers] Failed to update multiple markers:', error);
        throw new Error('Failed to update multiple markers');
      }
    },

    /**
     * Clears the current state
     */
    clearMarkers() {
      console.log('[clearMarkers] Clearing marker state');
      this.markers = [];
      this.eventId = null;
    },
  },
  persist: true, // Enables state persistence
});

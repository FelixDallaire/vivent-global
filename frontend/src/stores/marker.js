// src/store/marker.js
import { defineStore } from 'pinia';
import {
  createMarker,
  listMarkersForEvent,
  updateMarker,
  updateMultipleMarkers,
} from '@/services/markerService';

export const useMarkerStore = defineStore('marker', {
  state: () => ({
    markers: [], // Array of markers
  }),
  actions: {
    /**
     * Fetches all markers for a specific event and updates the state.
     * @param {String} eventId - The ID of the event to fetch markers for.
     */
    async fetchMarkersForEvent(eventId) {
      try {
        const markers = await listMarkersForEvent(eventId);
        this.markers = markers;
      } catch (error) {
        console.error('Failed to fetch markers:', error);
        throw new Error('Failed to fetch markers');
      }
    },

    /**
     * Adds a new marker to a specific event and updates the state.
     * @param {String} eventId - The ID of the event to add the marker to.
     * @param {Object} markerData - The data for the new marker.
     * @returns {Promise<Object>} The newly created marker.
     */
    async addMarker(eventId, markerData) {
      try {
        const newMarker = await createMarker(eventId, markerData);
        this.markers.push(newMarker);
        return newMarker;
      } catch (error) {
        console.error('Failed to add marker:', error);
        throw new Error('Failed to add marker');
      }
    },

    /**
     * Updates a specific marker in the state.
     * @param {String} markerId - The ID of the marker to update.
     * @param {Object} updatedData - The updated data for the marker.
     * @returns {Promise<Object>} The updated marker.
     */
    async updateMarker(markerId, updatedData) {
      try {
        const updatedMarker = await updateMarker(markerId, updatedData);
        const index = this.markers.findIndex(marker => marker._id === markerId);
        if (index !== -1) {
          this.markers[index] = { ...this.markers[index], ...updatedMarker };
        }
        return updatedMarker;
      } catch (error) {
        console.error('Failed to update marker:', error);
        throw new Error('Failed to update marker');
      }
    },

    /**
     * Updates multiple markers for a specific event and updates the state.
     * @param {String} eventId - The ID of the event.
     * @param {Array<Object>} markersData - The array of markers to update.
     * @returns {Promise<Array>} The updated markers.
     */
    async updateMarkersForEvent(eventId, markersData) {
      try {
        const updatedMarkers = await updateMultipleMarkers(eventId, markersData);
        updatedMarkers.forEach(updatedMarker => {
          const index = this.markers.findIndex(marker => marker._id === updatedMarker._id);
          if (index !== -1) {
            this.markers[index] = { ...this.markers[index], ...updatedMarker };
          } else {
            this.markers.push(updatedMarker); // Add it if it doesn't exist
          }
        });
        return updatedMarkers;
      } catch (error) {
        console.error('Failed to update markers:', error);
        throw new Error('Failed to update markers');
      }
    },

    /**
     * Resets the marker state.
     */
    resetMarkers() {
      this.markers = [];
    },
  },
  persist: {
    key: 'marker-store',
    storage: window.localStorage,
    paths: ['markers'],
  },
});

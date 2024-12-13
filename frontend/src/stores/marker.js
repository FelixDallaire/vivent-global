import { defineStore } from 'pinia';
import { listMarkersForEvent } from '@/services/markerService';

export const useMarkerStore = defineStore('marker', {
  state: () => ({
    markers: [], // Array of markers
  }),
  actions: {
    async fetchMarkersForEvent(eventId) {
      try {
        const markers = await listMarkersForEvent(eventId);
        this.markers = markers;
      } catch (error) {
        console.error('Failed to fetch markers:', error);
        throw new Error('Failed to fetch markers');
      }
    },
  },
  persist: false, // Disable persistence for this store
});

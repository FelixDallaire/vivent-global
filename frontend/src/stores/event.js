import { defineStore } from 'pinia';
import { listEvents, getEventById, createEvent, updateEvent } from '@/services/EventService';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [], // Events will be persisted
  }),
  actions: {
    async fetchEvents() {
      try {
        const events = await listEvents();
        this.events = events; // Update the state with the fetched events
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },

    async fetchEventById(id) {
      try {
        const event = await getEventById(id);
        return event;
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    },

    async addEvent(eventData) {
      try {
        const newEvent = await createEvent(eventData);
        this.events.push(newEvent); // Add the new event to the state
      } catch (error) {
        console.error('Failed to add event:', error);
      }
    },

    async updateEvent(id, eventData) {
      try {
        const updatedEvent = await updateEvent(id, eventData);
        const index = this.events.findIndex(event => event._id === id);
        if (index !== -1) {
          this.events[index] = { ...this.events[index], ...updatedEvent }; // Update the event in the state
        }
      } catch (error) {
        console.error('Failed to update event:', error);
      }
    },
  },
  persist: {
    key: 'event-store', // Unique key to store the events in localStorage
    storage: window.localStorage, // Persist data in localStorage
    paths: ['events'], // Persist only the `events` state
  },
});

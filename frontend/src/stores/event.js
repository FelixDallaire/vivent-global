// src/store/event.js

import { defineStore } from 'pinia';
import EventService from '../services/EventService';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: []
  }),
  actions: {
    async fetchEvents() {
      try {
        const response = await EventService.listEvents();
        this.events = response.data;
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    },

    async fetchEventById(id) {
      try {
        const response = await EventService.getEventById(id);
        // You might want to do something with this single event or add to a different state
        return response.data;
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    },

    async addEvent(eventData) {
      try {
        const response = await EventService.createEvent(eventData);
        this.events.push(response.data);
      } catch (error) {
        console.error('Failed to add event:', error);
      }
    },

    async updateEvent(id, eventData) {
      try {
        const response = await EventService.updateEvent(id, eventData);
        const index = this.events.findIndex(event => event._id === id);
        if (index !== -1) {
          this.events[index] = {...this.events[index], ...response.data};
        }
      } catch (error) {
        console.error('Failed to update event:', error);
      }
    }
  }
});

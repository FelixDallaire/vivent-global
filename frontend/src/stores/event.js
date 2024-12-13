import { defineStore } from "pinia";
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
} from "@/services/EventService";

export const useEventStore = defineStore("event", {
  state: () => ({
    events: [],
  }),
  actions: {
    async fetchEvents() {
      try {
        const events = await listEvents();
        this.events = events;
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    },
    async fetchEventById(id) {
      try {
        return await getEventById(id);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    },
    async addEvent(eventData) {
      try {
        const newEvent = await createEvent(eventData);
        this.events.push(newEvent);
        return newEvent;
      } catch (error) {
        console.error("Failed to add event:", error);
        throw new Error("Failed to add event");
      }
    },
    async updateEvent(id, eventData) {
      try {
        const updatedEvent = await updateEvent(id, eventData);
        const index = this.events.findIndex((event) => event._id === id);
        if (index !== -1) {
          this.events[index] = { ...this.events[index], ...updatedEvent };
        }
        return updatedEvent;
      } catch (error) {
        console.error("Failed to update event:", error);
        throw new Error("Failed to update event");
      }
    },
    resetEvents() {
      this.events = [];
    },
  },
  persist: {
    key: "event-store",
    storage: window.localStorage,
    paths: ["events"],
  },
});

// src/services/markerService.js

import api from './api';

/**
 * Adds a new marker to a specific event
 * @param {String} eventId - The ID of the event
 * @param {Object} markerData - The data for the new marker
 * @returns {Promise<Object>} Newly created marker data
 */
export async function createMarker(eventId, markerData) {
  const response = await api.post(`/events/${eventId}/markers`, markerData);
  return response.data;
}

/**
 * Retrieves all markers for a specific event
 * @param {String} eventId - The ID of the event
 * @returns {Promise<Array>} Array of markers
 */
export async function listMarkersForEvent(eventId) {
  const response = await api.get(`/events/${eventId}/markers`);
  return response.data;
}

/**
 * Updates a specific marker
 * @param {String} markerId - The ID of the marker to update
 * @param {Object} updatedData - The updated data for the marker
 * @returns {Promise<Object>} Updated marker data
 */
export async function updateMarker(markerId, updatedData) {
  const response = await api.patch(`/markers/${markerId}`, updatedData);
  return response.data;
}

/**
 * Updates multiple markers for a specific event
 * @param {String} eventId - The ID of the event
 * @param {Array<Object>} markersData - Array of marker updates
 * @returns {Promise<Array>} Updated markers
 */
export async function updateMultipleMarkers(eventId, markersData) {
  const response = await api.patch(`/events/${eventId}/markers`, markersData);
  return response.data;
}

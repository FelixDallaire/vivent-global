import api from './api';

/**
 * Retrieves a list of all events
 * @returns {Promise<Object>} Array of events
 */
export async function listEvents() {
  const response = await api.get('/events');
  return response.data;
}

/**
 * Retrieves a single event by its ID
 * @param {String} id - The ID of the event to retrieve
 * @returns {Promise<Object>} Event data
 */
export async function getEventById(id) {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

/**
 * Creates a new event
 * @param {Object} data - The data for the new event
 * @returns {Promise<Object>} Newly created event data
 */
export async function createEvent(data) {
  const response = await api.post('/events', data);
  return response.data;
}

/**
 * Updates an existing event
 * @param {String} id - The ID of the event to update
 * @param {Object} data - Updated data for the event
 * @returns {Promise<Object>} Updated event data
 */
export async function updateEvent(id, data) {
  const response = await api.patch(`/events/${id}`, data);
  return response.data;
}

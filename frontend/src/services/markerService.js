import api from "./api";

export async function createMarker(eventId, markerData) {
  const response = await api.post(`/events/${eventId}/markers`, markerData);
  return response.data;
}

export async function listMarkersForEvent(eventId) {
  const response = await api.get(`/events/${eventId}/markers`);
  return response.data;
}

export async function updateMarker(markerId, updatedData) {
  const response = await api.patch(`/markers/${markerId}`, updatedData);
  return response.data;
}

export async function updateMultipleMarkers(eventId, markersData) {
  const response = await api.patch(`/events/${eventId}/markers`, markersData);
  return response.data;
}

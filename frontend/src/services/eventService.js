import api from "./api";

export async function listEvents() {
  const response = await api.get("/events");
  return response.data;
}

export async function getEventById(id) {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

export async function createEvent(data) {
  const response = await api.post("/events", data);
  return response.data;
}

export async function updateEvent(id, data) {
  const response = await api.patch(`/events/${id}`, data);
  return response.data;
}

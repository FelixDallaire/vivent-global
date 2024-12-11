import axios from 'axios';

const API_URL = '/api/events';

export default {
  listEvents() {
    return axios.get(API_URL);
  },
  getEventById(id) {
    return axios.get(`${API_URL}/${id}`);
  },
  createEvent(data) {
    return axios.post(API_URL, data);
  },
  updateEvent(id, data) {
    return axios.patch(`${API_URL}/${id}`, data);
  }
};

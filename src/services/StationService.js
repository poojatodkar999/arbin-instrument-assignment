import api from './api';

export const StationService = {
  async getAll() {
    // Endpoint: /Station/getAllStations
    const response = await api.get('/Station/getAllStations');
    return response.data;
  },

  async create(stationData) {
    // Endpoint: POST /Station/station
    const response = await api.post('/Station/station', stationData);
    return response.data;
  },

  async update(id, updates) {
    // Endpoint: PUT /Station/station
    // Assuming backend expects the full object or object with ID in body since URL has no ID
    const response = await api.put('/Station/station', { id, ...updates });
    return response.data;
  },

  async getById(id) {
    // Endpoint: GET /Station/station/{id}
    const response = await api.get(`/Station/station/${id}`);
    return response.data;
  },

  async delete(id) {
    // Endpoint: DELETE /Station/station/{stationId}
    const response = await api.delete(`/Station/station/${id}`);
    return response.data;
  }
};

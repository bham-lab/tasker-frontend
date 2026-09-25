import api from "../config/api"




export const todoService = {

  async getAll(params = {}) {
    const res = await api.get("/todo", { params });
    return res.data

  },
  async getById(id) {
    const res = await api.get(`/todo/${id}`);
    return res.data

  },
  async create(text) {
    const res = await api.post("/todo", { text });
    return res.data

  },



  async update(id, data) {
    const res = await api.patch(`/todo/${id}`, data);
    return res.data

  },

  async delete(id) {
    const res = await api.delete(`/todo/${id}`);
    return res.data

  },
  async getStats() {
   const res = await api.get("/todo/stats")
   return res.data
  }
}
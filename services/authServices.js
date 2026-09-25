import api from "../config/api.js"


export const authService = {

  async register(data) { const res = await api.post("/auth/register", data); return res.data },
  async login(data) { const res = await api.post("/auth/login", data); return res.data },
  async forgetPasword(email) { const res = await api.post("/auth/forget-password", { email }); return res.data },

  async getMe() { const res = await api.get("/auth/me"); return res.data },

  async resetPassword(token, password) { const res = await api.patch(`/auth/reset-password/${token}`, { password }); return res.data }

}





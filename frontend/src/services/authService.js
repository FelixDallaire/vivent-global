import api from "./api";

export async function registerUser(username, password, role) {
  const response = await api.post("/auth/register", {
    username,
    password,
    role,
  });
  return response.data;
}

export async function loginUser(username, password) {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
}

export async function logoutUser() {
  const response = await api.post("/auth/logout");
  return response.data;
}

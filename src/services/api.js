import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  withCredentials: true, // To include cookies in requests
});

export const getUsers = () => api.get("/api/v1/get-all");
export const getMessages = (userId) => api.get(`/message/${userId}`);
export const sendMessage = (userId, message) =>
  api.post(`/message/send/${userId}`, { message });

export default api;

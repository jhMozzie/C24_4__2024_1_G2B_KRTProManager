// src/libs/axios.js
import axios from "axios";
import { useAuthStore } from "../store/auth";

const axiosAuth = axios.create({
  baseURL: "http://localhost:4040/",
  withCredentials: true,
});

// Interceptor para incluir el token de autorización en las solicitudes
axiosAuth.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token; // Obtener el token desde el estado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;

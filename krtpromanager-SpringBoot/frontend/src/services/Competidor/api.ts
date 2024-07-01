import axios from "../../libs/axios";
import { Competidor } from "../../interfaces/competidor";

export const CompetidoresObtener = async () => {
  try {
    const response = await axios.get("competidores/all");
    console.log("Datos recibidos desde API:", response.data.competidorList); // Para debugging
    return response.data.competidorList;
  } catch (error) {
    console.error("Error al obtener competidores:", error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};

export const CompetidoresObtenerid = async (id: number) => {
  try {
    const response = await axios.get(`competidores/${id}`);
    return response.data.competidor;
  } catch (error) {
    console.error("Error al obtener el competidor:", error);
    throw error;
  }
};

export const CompetidoresEliminar = async (id: number) => {
  await axios.delete(`competidores/${id}`);
};

export const Competidorescreate = async (data: Competidor) => {
  try {
    const response = await axios.post("competidores/create", data);
    return response.data.competidor;
  } catch (error) {
    console.error("Error al crear el competidor:", error);
    throw error;
  }
};

export const Competidoresupdate = async (data: Competidor) => {
  try {
    const response = await axios.put(`competidores/${data.id}/`, data);
    return response.data.competidor;
  } catch (error) {
    console.error("Error al actualizar el competidor:", error);
    throw error;
  }
};

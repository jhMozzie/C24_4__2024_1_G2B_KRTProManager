// services/Usuario/api.ts
import axios from "../../libs/axios";

export const campeonatosObtener = async () => {
  const response = await axios.get("campeonatos/all");
  return response.data.campeonatoList; // Ajustado para devolver solo la lista de campeonatos
};

export const campeonatosObtenerId = async (id: number) => {
  const response = await axios.get(`campeonatos/${id}`);
  return response.data.campeonato; // Ajustado para devolver solo el objeto de campeonato
};

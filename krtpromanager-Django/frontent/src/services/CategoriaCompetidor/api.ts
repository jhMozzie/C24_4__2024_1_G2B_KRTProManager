import {DetalleCategoriaCompetidor } from "../../interfaces/index";
import axios from '../../libs/axios';

export const detallecategoriacompetidorObtener = async () => (await axios.get('detallecategoriacompetidor/')).data;

export const detallecategoriacompetidorObtenerid = async (id:number) => (await axios.get(`detallecategoriacompetidor/${id}`)).data;

export const detallecategoriacompetidorEliminar = async (id: number) => {
    await axios.delete(`detallecategoriacompetidor/${id}`);
};

export const detallecategoriacompetidorcreate = async (data: DetalleCategoriaCompetidor) => {
    await axios.post("detallecategoriacompetidor/", data);
};

export const detallecategoriacompetidorupdate = async (data: DetalleCategoriaCompetidor) => {
    await axios.put(`detallecategoriacompetidor/${data.id}/`, data);
};

import { Competidor } from "../../interfaces/competidores";
import axios from '../../libs/axios';

export const CompetidoresObtener = async () => (await axios.get('competidores/')).data;

export const CompetidoresObtenerid = async (id:number) => (await axios.get(`competidores/${id}`)).data;

export const CompetidoresEliminar = async (id: number) => {
    await axios.delete(`competidores/${id}`);
};

export const Competidorescreate = async (data: Competidor) => {
    await axios.post("competidores/", data);
};

export const Competidoresupdate = async (data: Competidor) => {
    await axios.put(`competidores/${data.id}/`, data);
};

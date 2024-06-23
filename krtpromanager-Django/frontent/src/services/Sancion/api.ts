import { Sanciones  } from "../../interfaces/index";
import axios from '../../libs/axios';

export const sancionesObtener = async () => (await axios.get('sanciones/')).data;

export const sancionesObtenerid = async (id:number) => (await axios.get(`sanciones/${id}`)).data;

export const sancionesEliminar = async (id: number) => {
    await axios.delete(`sanciones/${id}`);
};

export const sancionescreate = async (data: Sanciones) => {
    await axios.post("sanciones/", data);
};

export const sancionesupdate = async (data: Sanciones) => {
    await axios.put(`sanciones/${data.id}/`, data);
};

import { Dojos } from "../../interfaces/dojos";
import axios from '../../libs/axios';

export const dojosObtener = async () => (await axios.get('dojos/')).data;

export const dojosObtenerid = async (id:number) => (await axios.get(`dojos/${id}`)).data;

export const dojosEliminar = async (id: number) => {
    await axios.delete(`dojos/${id}`);
};

export const dojoscreate = async (data: Dojos) => {
    await axios.post("dojos/", data);
};

export const dojosupdate = async (data: Dojos) => {
    await axios.put(`dojos/${data.id}/`, data);
};

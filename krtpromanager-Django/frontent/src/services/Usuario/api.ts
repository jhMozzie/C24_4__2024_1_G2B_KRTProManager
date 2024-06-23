import { Usuario } from "../../interfaces/index";
import axios from '../../libs/axios';

export const usuariosObtener = async () => (await axios.get('usuarios/')).data;

export const usuariosObtenerid = async (id:number) => (await axios.get(`usuarios/${id}`)).data;

export const usuariosEliminar = async (id: number) => {
    await axios.delete(`usuarios/${id}`);
};

export const usuarioscreate = async (data: Usuario) => {
    await axios.post("usuarios/", data);
};

export const usuariosupdate = async (data: Usuario) => {
    await axios.put(`usuarios/${data.id}/`, data);
};


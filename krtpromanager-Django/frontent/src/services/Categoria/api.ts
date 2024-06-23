import {Categoria } from "../../interfaces/index";
import axios from '../../libs/axios';

export const categoriasObtener = async () => (await axios.get('categorias/')).data;

export const categoriasObtenerid = async (id:number) => (await axios.get(`categorias/${id}`)).data;

export const categoriasEliminar = async (id: number) => {
    await axios.delete(`categorias/${id}`);
};

export const categoriascreate = async (data: Categoria) => {
    await axios.post("categorias/", data);
};

export const categoriasupdate = async (data: Categoria) => {
    await axios.put(`categorias/${data.id}/`, data);
};

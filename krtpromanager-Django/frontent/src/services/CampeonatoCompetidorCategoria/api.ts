import {DetallecampeonatocompetidorCategoria } from "../../interfaces/index";
import axios from '../../libs/axios';

export const detallecampeonatocompetidorCategoriaObtener = async () => (await axios.get('detallecampeonatocompetidorCategoria/')).data;

export const detallecampeonatocompetidorCategoriaObtenerid = async (id:number) => (await axios.get(`detallecampeonatocompetidorCategoria/${id}`)).data;

export const detallecampeonatocompetidorCategoriaEliminar = async (id: number) => {
    await axios.delete(`detallecampeonatocompetidorCategoria/${id}`);
};

export const detallecampeonatocompetidorCategoriacreate = async (data: DetallecampeonatocompetidorCategoria) => {
    await axios.post("detallecampeonatocompetidorCategoria/", data);
};

export const detallecampeonatocompetidorCategoriaupdate = async (data: DetallecampeonatocompetidorCategoria) => {
    await axios.put(`detallecampeonatocompetidorCategoria/${data.id}/`, data);
};




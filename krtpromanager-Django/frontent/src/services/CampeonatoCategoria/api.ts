import {DetalleCampeonatoCategoria } from "../../interfaces/index";
import axios from '../../libs/axios';

export const detallecampeonatocategoriaObtener = async () => (await axios.get('detallecampeonatocategoria/')).data;

export const detallecampeonatocategoriaObtenerid = async (id:number) => (await axios.get(`detallecampeonatocategoria/${id}`)).data;

export const detallecampeonatocategoriaEliminar = async (id: number) => {
    await axios.delete(`detallecampeonatocategoria/${id}`);
};

export const detallecampeonatocategoriacreate = async (data: DetalleCampeonatoCategoria) => {
    await axios.post("detallecampeonatocategoria/", data);
};

export const detallecampeonatocategoriaupdate = async (data: DetalleCampeonatoCategoria) => {
    await axios.put(`detallecampeonatocategoria/${data.id}/`, data);
};

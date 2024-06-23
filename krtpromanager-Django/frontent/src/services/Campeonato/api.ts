import { Campeonato } from "../../interfaces/index";
import axios from '../../libs/axios';

export const campeonatosObtener = async () => (await axios.get('campeonatos/')).data;

export const campeonatosObtenerid = async (id: number) => (await axios.get(`campeonatos/${id}`)).data;

export const campeonatosEliminar = async (id: number) => {
    await axios.delete(`campeonatos/${id}`);
};

export const campeonatoscreate = async (data: Campeonato) => {
     await axios.post("campeonatos/", data);
};

export const campeonatosupdate = async (data: FormData) => {
     await axios.put(`campeonatos/${data.get('id')}/`, data, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });
   };
   
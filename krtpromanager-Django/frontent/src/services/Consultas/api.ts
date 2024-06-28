import axios from '../../libs/axios';



export const obtenerCompetidoresPorCategoria = async (nombre:string, fecha:string) => {
    const response = await axios.post('competidoresporcategoria', {
      "campeonato_nombre": nombre,
      "campeonato_fecha": fecha
    });
    return response.data;
};

export const obtenerCampeonatos = async () => {
    const response = await axios.get('campeonatos/');
    return response.data;
};

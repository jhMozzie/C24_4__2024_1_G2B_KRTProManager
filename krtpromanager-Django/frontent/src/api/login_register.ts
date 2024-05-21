import axios from '../libs/axios';

interface UserLogin{
    username: string;
    password: string;
}



export const loginPost = async (userData: UserLogin) => (await axios.post('login', userData)).data;
export const CompetidoresObtener = async () => (await axios.get('competidores/')).data;


// export const loginPost = async (userData: UserLogin) => {
//     try {
//         const response = await axios.post('login', userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error en la solicitud de inicio de sesión:', error);
//         throw error; 
//     }
// };
//estos accions no me pediran eso xd el header los otros si l otengo que hacer con eso  aca tpdas las que no sean jwt
import axios from "axios";
import { Register } from "../interfaces/index";
interface UserLogin {
  username: string;
  password: string;
}

const axiosAuth = axios.create({
  baseURL: "http://localhost:4040/auth/",
});

//export const loginPosts = async (userData: UserLogin) => (await axiosAuth.post('login', userData)).data;
export const RegisterPost = async (RegisterData: Register) =>
  (await axiosAuth.post("register", RegisterData)).data;
export const loginPost = async (userData: UserLogin) =>
  (await axiosAuth.post("login", userData)).data;

//metodo get para obtener xd

// export const loginPost = async (userData: UserLogin) => {
//     try {
//         const response = await axios.post('login', userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error en la solicitud de inicio de sesión:', error);
//         throw error;
//     }
// };

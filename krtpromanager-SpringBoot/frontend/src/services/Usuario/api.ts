// import { Usuario } from "../../interfaces/usuario";
import axios from "../../libs/axios";

export const UsuarioInfo = async () => {
  const response = await axios.get("users/my-info");
  return response.data.usuario; // Ajuste para devolver solo el objeto de usuario
};

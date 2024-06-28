import axios, { AxiosResponse } from "axios";

// Define the LoginResponse interface
interface LoginResponse {
  username: string;
  password: string;
  token: string;
}

// Define the UserData interface for registration
interface UserData {
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  rol: string;
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  username: string;
  password: string;
  rol: string;
}

// Define the RegisterResponse interface
interface RegisterResponse {
  statusCode: number;
  message: string;
  usuario: Usuario;
}

class UsersService {
  static BASE_URL = "http://localhost:8080";

  static async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${UsersService.BASE_URL}/auth/login`,
      { username, password }
    );
    return response.data;
  }

  static async register(
    userData: UserData,
    token: string
  ): Promise<RegisterResponse> {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${UsersService.BASE_URL}/auth/register`,
      userData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

export default UsersService;

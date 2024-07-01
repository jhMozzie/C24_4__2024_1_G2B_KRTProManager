export interface Usuario {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

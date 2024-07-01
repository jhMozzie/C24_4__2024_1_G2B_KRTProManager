import { Dojo } from "./dojo";

export interface Competidor {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
  dojo: Dojo;
}

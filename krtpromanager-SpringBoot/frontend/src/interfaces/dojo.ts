import { Usuario } from "./usuario";
import { Campeonato } from "./campeonato";

export interface Dojo {
  id: number;
  nombreDojo: string;
  senseiDojo: string;
  usuario: Usuario;
  campeonatos: Campeonato;
}

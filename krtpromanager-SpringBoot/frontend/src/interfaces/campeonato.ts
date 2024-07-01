import { Dojo } from "./dojo";

export interface Campeonato {
  id: number;
  dojo_nombre?: string;
  nombre: string;
  fecha: string;
  local: string;
  provincia: string;
  distrito: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  url_bases: any;
  dojo: Dojo;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagen: any;
}

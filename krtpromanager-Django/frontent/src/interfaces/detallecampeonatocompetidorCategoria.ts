export interface DetallecampeonatocompetidorCategoria {
    id:                     number;
    Categoria_nombre:       string;
    Categoria_genero:       string;
    Categoria_modelidad:    string;
    Categoria_grado:        string;
    Campeonato_nombre:      string;
    Campeonato_fecha:       Date;
    Competidor_nombre:      string;
    Competidor_apellido:    string;
    Competidor_dojo_nombre: string;
    categoria_campeonato:   number;
    competidor:             number;
}

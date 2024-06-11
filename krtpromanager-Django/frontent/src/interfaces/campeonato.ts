export interface Campeonato {
    id:          number;
    dojo_nombre?: string;
    nombre:      string;
    fecha:       string;
    local:       string;
    provincia:   string;
    distrito:    string;
    url_bases:   null | File;
    dojo:        number| [];
}

export interface Token {
    token:         string;
    refresh_token: string;
    user:          User;
}

export interface User {
    id:        number;
    username:  string;
    nombres:   string;
    apellidos: string;
    email:     string;
    rol:       string;
}

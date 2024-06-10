export interface Usuario {
    id: number;
    username:  string;
    nombres:   string;
    apellidos: string;
    email:     string;
    password:  string;
    confirmPassword?:  string;
}

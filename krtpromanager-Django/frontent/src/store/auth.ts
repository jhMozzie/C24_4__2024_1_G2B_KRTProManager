import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
    token: string;
    isAuth: boolean;
};

type Actions = {
    setToken: (token: string) => void;
    logout: () => void;
};

export const useAuthStore = create(
    persist<State & Actions>((set) => ({
        token: "",
        isAuth: false,
        setToken: (token: string) => set({ token, isAuth: true }), // Actualiza el token y establece isAuth a true
        logout: () => set({ token: "", isAuth: false }), // Limpia el token y establece isAuth a false
    }), 
    { 
        name: "auth", // El estado se guardará con el nombre 'auth' en el almacenamiento local
    })
);

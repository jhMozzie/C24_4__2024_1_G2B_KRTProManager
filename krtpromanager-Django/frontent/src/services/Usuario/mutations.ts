import { usuariosEliminar, usuarioscreate, usuariosupdate } from "./api";
import { Usuario } from "../../interfaces/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Usuario) => usuarioscreate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Usuario creado!', {
        icon: '👏',
      });
    },
    onError: () => {
      console.log("error");
      toast.error("Error al crear el usuario");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      }
    },
  });
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Usuario) => usuariosupdate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Usuario actualizado!', {
        icon: '↻',
      });
    },
    onError: () => {
      console.log("error");
      toast.error("Error al actualizar el usuario");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
        await queryClient.invalidateQueries({ queryKey: ["usuarios", { id: variables.id }] });
      }
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => usuariosEliminar(id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
      toast.error("Error al eliminar el usuario");
    },
    onSuccess: () => {
      console.log("success");
      toast('Usuario eliminado!', {
        icon: '🗑',
      });
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      }
    },
  });
}

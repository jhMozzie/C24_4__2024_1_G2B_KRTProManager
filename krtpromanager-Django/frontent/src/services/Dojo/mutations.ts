import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dojosEliminar, dojoscreate, dojosupdate } from "./api";
import { Dojos } from "../../interfaces/dojos";
import { toast } from "react-hot-toast";

export function useCreateDojo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Dojos) => dojoscreate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Dojo creado!', {
        icon: '👏',
      });
    },
    onError: () => {
      console.log("error");
      toast.error("Error al crear el dojo");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["dojos"] });
      }
    },
  });
}

export function useUpdateDojo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Dojos) => dojosupdate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Dojo actualizado!', {
        icon: '↻',
      });
    },
    onError: () => {
      console.log("error");
      toast.error("Error al actualizar el dojo");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["dojos"] });
        await queryClient.invalidateQueries({ queryKey: ["dojos", { id: variables.id }] });
      }
    },
  });
}

export function useDeleteDojo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => dojosEliminar(id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
      toast.error("Error al eliminar el dojo");
    },
    onSuccess: () => {
      console.log("success");
      toast('Dojo eliminado!', {
        icon: '🗑',
      });
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["dojos"] });
      }
    },
  });
}

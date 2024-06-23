import { useMutation, useQueryClient } from "@tanstack/react-query";
import { campeonatosEliminar, campeonatoscreate, campeonatosupdate } from "./api";
// import { Campeonato } from "../../interfaces/campeonato";
import { toast } from "react-hot-toast";
type CustomError = {
    response: {
      data: any;
    };
  };
export function useCreateCampeonato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => campeonatoscreate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Campeonato creado!', {
        icon: '👏',
      });
    },
    onError: (error: CustomError) => {
        console.log("error", error.response.data);
        toast.error("Error al crear el campeonato");
      },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["campeonatos"] });
      }
    },
  });
}

export function useUpdateCampeonato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => campeonatosupdate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Campeonato actualizado!', {
        icon: '↻',
      });
    },
    onError: (error: CustomError) => {
      console.log("error", error.response?.data);
      toast.error("Error al actualizar el campeonato");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error, variables) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["campeonatos"] });
        await queryClient.invalidateQueries({ queryKey: ["campeonatos", { id: variables.id }] });
      }
    },
  });
}

export function useDeleteCampeonato() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => campeonatosEliminar(id),
    onMutate: () => {
      console.log("mutate");
    },
    onError: (error: CustomError) => {
      console.log("error", error.response?.data);
      toast.error("Error al eliminar el campeonato");
    },
    onSuccess: () => {
      console.log("success");
      toast('Campeonato eliminado!', {
        icon: '🗑',
      });
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["campeonatos"] });
      }
    },
  });
}
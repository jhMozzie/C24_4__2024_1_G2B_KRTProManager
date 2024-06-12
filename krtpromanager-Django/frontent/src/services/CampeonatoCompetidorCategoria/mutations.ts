// services/DetalleCampeonatoCompetidorCategoria/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detallecampeonatocompetidorCategoriacreate, detallecampeonatocompetidorCategoriaupdate, detallecampeonatocompetidorCategoriaEliminar } from "./api";
import { DetallecampeonatocompetidorCategoria } from "../../interfaces";
import toast from "react-hot-toast";

export function useCreateDetallecampeonatocompetidorCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DetallecampeonatocompetidorCategoria) => detallecampeonatocompetidorCategoriacreate(data),
    onMutate: () => {
      console.log("mutate");
      toast('Detalle creado !', {
        icon: '👏',
      });
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocompetidorCategoria"] });
      }
    },
  });
}

export function useUpdateDetallecampeonatocompetidorCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => {
      console.log("mutate");
      toast('Detalle actualizado !', {
        icon: '↻',
      });
    },
    mutationFn: (data: DetallecampeonatocompetidorCategoria) => detallecampeonatocompetidorCategoriaupdate(data),
    onSettled: async (_, error, variables) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocompetidorCategoria"] });
        await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocompetidorCategoria", { id: variables.id }] });
      }
    },
  });
}

export function useDeleteDetallecampeonatocompetidorCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => detallecampeonatocompetidorCategoriaEliminar(id),
    onSuccess: () => {
      toast('Detalle eliminado !', {
        icon: '🗑',
      });
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocompetidorCategoria"] });
      }
    },
  });
}

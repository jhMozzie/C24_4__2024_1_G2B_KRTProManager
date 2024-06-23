import { detallecampeonatocategoriaEliminar, detallecampeonatocategoriacreate, detallecampeonatocategoriaupdate } from "./api";
import { DetalleCampeonatoCategoria } from "../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateDetalleCampeonatoCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (data: DetalleCampeonatoCategoria) => detallecampeonatocategoriacreate(data),
      onMutate: () => {
          toast('Detalle de Campeonato-Categoría creado!', {
            icon: '👏',
          });      
        },
      onError: () => {
          toast('Error al crear Detalle de Campeonato-Categoría', {
            icon: '❌',
          });
      },
      onSuccess: () => {
          toast('Detalle de Campeonato-Categoría creado con éxito!', {
            icon: '✅',
          });
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocategoria"] });
          }
      },
  });
}

export function useUpdateDetalleCampeonatoCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DetalleCampeonatoCategoria) => detallecampeonatocategoriaupdate(data),
    onMutate: () => {
        toast('Detalle de Campeonato-Categoría actualizado!', {
          icon: '↻',
        });      
      },
    onError: () => {
        toast('Error al actualizar Detalle de Campeonato-Categoría', {
          icon: '❌',
        });
    },
    onSettled: async (_, error, variables) => {
        if (error) {
            console.log(error);
        } else {
            await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocategoria"] });
            await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocategoria", { id: variables.id }]});
        }
    },
  });
}

export function useDeleteDetalleCampeonatoCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => detallecampeonatocategoriaEliminar(id),
      onSuccess: () => {
        toast('Detalle de Campeonato-Categoría eliminado!', {
            icon: '🗑',
          });   
      },
      onError: () => {
          toast('Error al eliminar Detalle de Campeonato-Categoría', {
            icon: '❌',
          });
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["detallecampeonatocategoria"] });
          }
      },
  });
}

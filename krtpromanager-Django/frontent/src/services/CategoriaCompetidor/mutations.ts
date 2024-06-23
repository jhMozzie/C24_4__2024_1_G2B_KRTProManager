import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { 
  detallecategoriacompetidorcreate, 
  detallecategoriacompetidorupdate, 
  detallecategoriacompetidorEliminar 
} from "./api";
import { DetalleCategoriaCompetidor } from "../../interfaces";

export function useCreateDetalleCategoriaCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (data: DetalleCategoriaCompetidor) => detallecategoriacompetidorcreate(data),
      onMutate: () => {
          toast('Detalle de Categoría-Competidor creado!', {
            icon: '👏',
          });      
        },
      onError: () => {
          toast('Error al crear Detalle de Categoría-Competidor', {
            icon: '❌',
          });
      },
      onSuccess: () => {
          toast('Detalle de Categoría-Competidor creado con éxito!', {
            icon: '✅',
          });
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["detallecategoriacompetidor"] });
          }
      },
  });
}

export function useUpdateDetalleCategoriaCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DetalleCategoriaCompetidor) => detallecategoriacompetidorupdate(data),
    onMutate: () => {
        toast('Detalle de Categoría-Competidor actualizado!', {
          icon: '↻',
        });      
      },
    onError: () => {
        toast('Error al actualizar Detalle de Categoría-Competidor', {
          icon: '❌',
        });
    },
    onSettled: async (_, error, variables) => {
        if (error) {
            console.log(error);
        } else {
            await queryClient.invalidateQueries({ queryKey: ["detallecategoriacompetidor"] });
            await queryClient.invalidateQueries({ queryKey: ["detallecategoriacompetidor", { id: variables.id }]});
        }
    },
  });
}

export function useDeleteDetalleCategoriaCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => detallecategoriacompetidorEliminar(id),
      onSuccess: () => {
        toast('Detalle de Categoría-Competidor eliminado!', {
            icon: '🗑',
          });   
      },
      onError: () => {
          toast('Error al eliminar Detalle de Categoría-Competidor', {
            icon: '❌',
          });
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["detallecategoriacompetidor"] });
          }
      },
  });
}
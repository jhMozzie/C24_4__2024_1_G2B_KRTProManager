import {CompetidoresEliminar,Competidorescreate,Competidoresupdate} from "./api"
import {Competidor} from "../../interfaces/competidores"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (data: Competidor) => Competidorescreate(data),
      onMutate: () => {
          console.log("mutate");
          toast('Competidor creado !', {
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
              await queryClient.invalidateQueries({ queryKey: ["competidores"] });
          }
      },
  });
}

export function useUpdateCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => {
        console.log("mutate");
        toast('Competidor actualizado !', {
          icon: '↻',
        });      
      },
      mutationFn: (data: Competidor) => Competidoresupdate(data),
      onSettled: async (_, error, variables) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["competidores" ] });
              await queryClient.invalidateQueries({ queryKey: ["competidores", { id: variables.id }],});
          }
      },
  });
}

export function useDeleteCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => CompetidoresEliminar(id),
      onSuccess: () => {
        toast('Competidor actualizado !', {
            icon: '🗑',
          });   
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["competidores"] });
          }
      },
  });
}
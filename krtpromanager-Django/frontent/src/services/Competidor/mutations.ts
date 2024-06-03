import {CompetidoresEliminar,Competidorescreate,Competidoresupdate} from "./api"
import {Competidor} from "../../interfaces/competidores"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCompetidor() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (data: Competidor) => Competidorescreate(data),
      onMutate: () => {
          console.log("mutate");
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
          console.log("deleted successfully");
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
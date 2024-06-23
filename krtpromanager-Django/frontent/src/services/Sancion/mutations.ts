import { sancionesEliminar, sancionescreate, sancionesupdate } from "./api";
import { Sanciones } from "../../interfaces/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateSancion() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (data: Sanciones) => sancionescreate(data),
      onMutate: () => {
          console.log("mutate");
          toast('Sanción creada !', {
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
              await queryClient.invalidateQueries({ queryKey: ["sanciones"] });
          }
      },
  });
}

export function useUpdateSancion() {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: () => {
        console.log("mutate");
        toast('Sanción actualizada !', {
          icon: '↻',
        });      
      },
      mutationFn: (data: Sanciones) => sancionesupdate(data),
      onSettled: async (_, error, variables) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["sanciones" ] });
              await queryClient.invalidateQueries({ queryKey: ["sanciones", { id: variables.id }],});
          }
      },
  });
}

export function useDeleteSancion() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => sancionesEliminar(id),
      onSuccess: () => {
        toast('Sanción eliminada !', {
            icon: '🗑',
          });   
      },
      onSettled: async (_, error) => {
          if (error) {
              console.log(error);
          } else {
              await queryClient.invalidateQueries({ queryKey: ["sanciones"] });
          }
      },
  });
}
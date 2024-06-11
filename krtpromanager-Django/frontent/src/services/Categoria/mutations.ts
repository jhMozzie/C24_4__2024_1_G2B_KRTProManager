import { categoriasEliminar, categoriascreate, categoriasupdate } from "./api";
import { Categoria } from "../../interfaces/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Categoria) => categoriascreate(data),
    onMutate: () => {
      toast('Categoría creada!', { icon: '👏' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: () => {
      toast('Error al crear categoría', { icon: '❌' });
    }
  });
}

export function useUpdateCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Categoria) => categoriasupdate(data),
    onMutate: () => {
      toast('Categoría actualizada!', { icon: '↻' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: () => {
      toast('Error al actualizar categoría', { icon: '❌' });
    }
  });
}

export function useDeleteCategoria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriasEliminar(id),
    onSuccess: () => {
      toast('Categoría eliminada!', { icon: '🗑' });
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: () => {
      toast('Error al eliminar categoría', { icon: '❌' });
    }
  });
}

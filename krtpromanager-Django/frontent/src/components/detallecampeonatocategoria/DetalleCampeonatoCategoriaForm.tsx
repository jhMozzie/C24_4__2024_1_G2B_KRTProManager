import { useForm } from "react-hook-form";
import { DetalleCampeonatoCategoria, Campeonato, Categoria } from "../../interfaces";
import { useCreateDetalleCampeonatoCategoria, useUpdateDetalleCampeonatoCategoria } from "../../services/CampeonatoCategoria/mutations";
import { useQuery } from "@tanstack/react-query";
import { campeonatosObtener } from "../../services/Campeonato/api";
import { categoriasObtener } from "../../services/Categoria/api";
import { useEffect } from "react";

interface DetalleCampeonatoCategoriaFormProps {
  onClose: () => void;
  existingDetalle?: DetalleCampeonatoCategoria;
}

export const DetalleCampeonatoCategoriaForm = ({ onClose, existingDetalle }: DetalleCampeonatoCategoriaFormProps) => {
  const { data: campeonatosData } = useQuery<Campeonato[]>({
    queryKey: ["campeonatos"],
    queryFn: campeonatosObtener,
  });

  const { data: categoriasData } = useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: categoriasObtener,
  });

  const createDetalleMutation = useCreateDetalleCampeonatoCategoria();
  const updateDetalleMutation = useUpdateDetalleCampeonatoCategoria();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DetalleCampeonatoCategoria>();

  useEffect(() => {
    if (existingDetalle) {
      setValue('Campeonato', existingDetalle.Campeonato);
      setValue('categoria', existingDetalle.categoria);
    }
  }, [existingDetalle, setValue]);

  const onSubmit = (data: DetalleCampeonatoCategoria) => {
    if (existingDetalle) {
      updateDetalleMutation.mutate({ ...data, id: existingDetalle.id });
    } else {
      createDetalleMutation.mutate(data);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="Campeonato" className="block text-sm font-medium text-gray-700">Campeonato</label>
            <select {...register('Campeonato', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona un campeonato</option>
              {campeonatosData?.map((campeonato) => (
                <option key={campeonato.id} value={campeonato.id}>
                  {`${campeonato.nombre} - ${new Date(campeonato.fecha).toLocaleDateString()} - ${campeonato.local}`}
                </option>
              ))}
            </select>
            {errors.Campeonato && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría</label>
            <select {...register('categoria', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona una categoría</option>
              {categoriasData?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {`${categoria.nombre} - ${categoria.genero} - ${categoria.modalidad} - ${categoria.grado}`}
                </option>
              ))}
            </select>
            {errors.categoria && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Guardar</button>
            <button type="button" onClick={onClose} className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

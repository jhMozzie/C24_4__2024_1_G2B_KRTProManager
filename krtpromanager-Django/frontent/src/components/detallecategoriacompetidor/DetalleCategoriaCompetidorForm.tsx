// src/components/detallecategoriacompetidor/DetalleCategoriaCompetidorForm.tsx
import { useForm } from "react-hook-form";
import { DetalleCategoriaCompetidor, Categoria, Competidor } from "../../interfaces";
import { useCreateDetalleCategoriaCompetidor, useUpdateDetalleCategoriaCompetidor } from "../../services/CategoriaCompetidor/mutations";
import { useQuery } from "@tanstack/react-query";
import { categoriasObtener } from "../../services/Categoria/api";
import { CompetidoresObtener } from "../../services/Competidor/api";
import { useEffect } from "react";

interface DetalleCategoriaCompetidorFormProps {
  onClose: () => void;
  existingDetalle?: DetalleCategoriaCompetidor;
}

export const DetalleCategoriaCompetidorForm = ({ onClose, existingDetalle }: DetalleCategoriaCompetidorFormProps) => {
  const { data: categoriasData } = useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: categoriasObtener,
  });

  const { data: competidoresData } = useQuery<Competidor[]>({
    queryKey: ["competidores"],
    queryFn: CompetidoresObtener,
  });

  const createDetalleMutation = useCreateDetalleCategoriaCompetidor();
  const updateDetalleMutation = useUpdateDetalleCategoriaCompetidor();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DetalleCategoriaCompetidor>();

  useEffect(() => {
    if (existingDetalle) {
      setValue('categoria', existingDetalle.categoria);
      setValue('competidor', existingDetalle.competidor);
    }
  }, [existingDetalle, setValue]);

  const onSubmit = (data: DetalleCategoriaCompetidor) => {
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
          <div className="mb-4">
            <label htmlFor="competidor" className="block text-sm font-medium text-gray-700">Competidor</label>
            <select {...register('competidor', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona un competidor</option>
              {competidoresData?.map((competidor) => (
                <option key={competidor.id} value={competidor.id}>
                  {`${competidor.nombre} ${competidor.apellido} - ${competidor.dojo_nombre}`}
                </option>
              ))}
            </select>
            {errors.competidor && <span className="text-red-500">Este campo es requerido</span>}
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

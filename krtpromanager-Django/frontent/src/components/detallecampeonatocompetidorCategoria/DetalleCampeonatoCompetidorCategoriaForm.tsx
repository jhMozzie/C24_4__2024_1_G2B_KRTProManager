// components/detallecampeonatocompetidorCategoria/DetalleCampeonatoCompetidorCategoriaForm.tsx
import { useForm } from "react-hook-form";
import { DetallecampeonatocompetidorCategoria, Competidor, DetalleCampeonatoCategoria } from "../../interfaces";
import { useCreateDetallecampeonatocompetidorCategoria, useUpdateDetallecampeonatocompetidorCategoria } from "../../services/CampeonatoCompetidorCategoria/mutations";
import { useQuery } from "@tanstack/react-query";
import { CompetidoresObtener } from "../../services/Competidor/api";
import { detallecampeonatocategoriaObtener } from "../../services/CampeonatoCategoria/api";
import { useEffect } from "react";

interface DetalleCampeonatoCompetidorCategoriaFormProps {
  onClose: () => void;
  existingDetalle?: DetallecampeonatocompetidorCategoria;
}

export const DetalleCampeonatoCompetidorCategoriaForm = ({ onClose, existingDetalle }: DetalleCampeonatoCompetidorCategoriaFormProps) => {
  const { data: competidoresData } = useQuery<Competidor[]>({
    queryKey: ["competidores"],
    queryFn: CompetidoresObtener,
  });

  const { data: detalleCampeonatoCategoriaData } = useQuery<DetalleCampeonatoCategoria[]>({
    queryKey: ["detallecampeonatocategoria"],
    queryFn: detallecampeonatocategoriaObtener,
  });

  const createDetalleMutation = useCreateDetallecampeonatocompetidorCategoria();
  const updateDetalleMutation = useUpdateDetallecampeonatocompetidorCategoria();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DetallecampeonatocompetidorCategoria>();

  useEffect(() => {
    if (existingDetalle) {
      setValue('categoria_campeonato', existingDetalle.categoria_campeonato);
      setValue('competidor', existingDetalle.competidor);
    }
  }, [existingDetalle, setValue]);

  const onSubmit = (data: DetallecampeonatocompetidorCategoria) => {
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
            <label htmlFor="categoria_campeonato" className="block text-sm font-medium text-gray-700">Campeonato-Categoría</label>
            <select {...register('categoria_campeonato', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona una categoría campeonato</option>
              {detalleCampeonatoCategoriaData?.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {`${categoria.Campeonato_nombre} ${new Date(categoria.Campeonato_fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })} ${new Date(categoria.Campeonato_fecha).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} - ${categoria.Categoria_nombre} ${categoria.Categoria_genero} ${categoria.Categoria_modelidad} ${categoria.Categoria_grado}`}
                </option>
              ))}
            </select>
            {errors.categoria_campeonato && <span className="text-red-500">Este campo es requerido</span>}
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

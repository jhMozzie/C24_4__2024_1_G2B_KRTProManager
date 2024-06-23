import { useForm } from "react-hook-form";
import { Sanciones, DetallecampeonatocompetidorCategoria } from "../../interfaces/index";
import { useCreateSancion, useUpdateSancion } from "../../services/Sancion/mutations";
import { useQuery } from "@tanstack/react-query";
import { detallecampeonatocompetidorCategoriaObtener } from "../../services/CampeonatoCompetidorCategoria/api";
import { useEffect } from "react";

interface SancionFormProps {
  onClose: () => void;
  existingSancion?: Sanciones;
}

export const SancionForm = ({ onClose, existingSancion }: SancionFormProps) => {
  const { data: competidoresData } = useQuery<DetallecampeonatocompetidorCategoria[]>({
    queryKey: ["competidores"],
    queryFn: detallecampeonatocompetidorCategoriaObtener,
  });

  const createSancionMutation = useCreateSancion();
  const updateSancionMutation = useUpdateSancion();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Sanciones>();

  useEffect(() => {
    if (existingSancion) {
      setValue('competidor', existingSancion.competidor);
      setValue('motivo', existingSancion.motivo);
    }
  }, [existingSancion, setValue]);

  const onSubmit = (data: Sanciones) => {
    if (existingSancion) {
      updateSancionMutation.mutate({ ...data, id: existingSancion.id });
    } else {
      createSancionMutation.mutate(data);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="competidor" className="block text-sm font-medium text-gray-700">Competidor</label>
            <select {...register('competidor', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona un competidor</option>
              {competidoresData?.map((competidor) => (
                <option key={competidor.id} value={competidor.id}>
                  {`${competidor.Competidor_nombre} ${competidor.Competidor_apellido} - ${competidor.Competidor_dojo_nombre}`}
                </option>
              ))}
            </select>
            {errors.competidor && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">Motivo</label>
            <input type="text" {...register('motivo', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.motivo && <span className="text-red-500">Este campo es requerido</span>}
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
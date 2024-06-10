import { useForm } from "react-hook-form";
import { Dojos } from "../../interfaces/index";
import { useCreateDojo, useUpdateDojo } from "../../services/Dojo/mutations";
import { useQuery } from "@tanstack/react-query";
import { usuariosObtener } from "../../services/Usuario/api";
import { useEffect } from "react";
import { Usuario } from "../../interfaces/index";

interface DojoFormProps {
  onClose: () => void;
  existingDojo?: Dojos;
}

export const DojoForm = ({ onClose, existingDojo }: DojoFormProps) => {
  const { data: usuariosData } = useQuery<Usuario[]>({
    queryKey: ["usuarios"],
    queryFn: usuariosObtener,
  });

  const createDojoMutation = useCreateDojo();
  const updateDojoMutation = useUpdateDojo();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Dojos>();

  useEffect(() => {
    if (existingDojo) {
      setValue('nombreDojo', existingDojo.nombreDojo);
      setValue('senseiDojo', existingDojo.senseiDojo);
      setValue('Usuario', existingDojo.Usuario);
    }
  }, [existingDojo, setValue]);

  const onSubmit = (data: Dojos) => {
    if (existingDojo) {
      updateDojoMutation.mutate({ ...data, id: existingDojo.id });
    } else {
      createDojoMutation.mutate(data);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="nombreDojo" className="block text-sm font-medium text-gray-700">Nombre Dojo</label>
            <input 
              type="text" 
              {...register('nombreDojo', { required: true, minLength: 3 })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.nombreDojo && errors.nombreDojo.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.nombreDojo && errors.nombreDojo.type === "minLength" && (
              <span className="text-red-500">El nombre del dojo debe tener al menos 3 caracteres</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="senseiDojo" className="block text-sm font-medium text-gray-700">Sensei Dojo</label>
            <input 
              type="text" 
              {...register('senseiDojo', { required: true })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.senseiDojo && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="Usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
            <select 
              {...register('Usuario', { required: true })} 
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona un usuario</option>
              {usuariosData?.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.username}
                </option>
              ))}
            </select>
            {errors.Usuario && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
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

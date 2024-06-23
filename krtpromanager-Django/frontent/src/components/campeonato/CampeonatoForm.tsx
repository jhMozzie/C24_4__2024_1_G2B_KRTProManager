import { useForm } from "react-hook-form";
import { Campeonato } from "../../interfaces/index";
import { useCreateCampeonato, useUpdateCampeonato } from "../../services/Campeonato/mutations";
import { useQuery } from "@tanstack/react-query";
import { dojosObtener } from "../../services/Dojo/api";
import { useEffect } from "react";
import { Dojos } from "../../interfaces/index";

interface CampeonatoFormProps {
  onClose: () => void;
  existingCampeonato?: Campeonato;
}

export const CampeonatoForm = ({ onClose, existingCampeonato }: CampeonatoFormProps) => {
  const { data: DojosData } = useQuery<Dojos[]>({
    queryKey: ["dojos"],
    queryFn: dojosObtener,
  });

  const createCampeonatoMutation = useCreateCampeonato();
  const updateCampeonatoMutation = useUpdateCampeonato();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Campeonato>();

  useEffect(() => {
    if (existingCampeonato) {
      setValue('nombre', existingCampeonato.nombre);
      setValue('fecha', new Date(existingCampeonato.fecha).toISOString().split("T")[0]);
      setValue('local', existingCampeonato.local);
      setValue('provincia', existingCampeonato.provincia);
      setValue('distrito', existingCampeonato.distrito);
      setValue('url_bases', existingCampeonato.url_bases || null);
      setValue('dojo', existingCampeonato.dojo);
      setValue('imagen', existingCampeonato.imagen);  
    }
  }, [existingCampeonato, setValue]);

  const onSubmit = (data: Campeonato) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('fecha', data.fecha);
    formData.append('local', data.local);
    formData.append('provincia', data.provincia);
    formData.append('distrito', data.distrito);
    formData.append('dojo', data.dojo.toString());

    if (data.url_bases && data.url_bases[0] instanceof File) {
      formData.append('url_bases', data.url_bases[0]);
    }
    
    if (data.imagen && data.imagen[0] instanceof File) {
      formData.append('imagen', data.imagen[0]);  
    }
    

    if (existingCampeonato) {
      formData.append('id', existingCampeonato.id.toString());
      updateCampeonatoMutation.mutate(formData);
    } else {
      createCampeonatoMutation.mutate(formData);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" {...register('nombre', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.nombre && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
            <input type="date" {...register('fecha', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.fecha && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="local" className="block text-sm font-medium text-gray-700">Local</label>
            <input type="text" {...register('local', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.local && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">Provincia</label>
            <input type="text" {...register('provincia', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.provincia && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="distrito" className="block text-sm font-medium text-gray-700">Distrito</label>
            <input type="text" {...register('distrito', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.distrito && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="url_bases" className="block text-sm font-medium text-gray-700">URL Bases</label>
            <input type="file" {...register('url_bases')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" accept=".xlsx, .xls" />
          </div>
          <div className="mb-4">
            <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">Imagen</label>
            <input type="file" {...register('imagen')} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" accept="image/*" />
          </div>
          <div className="mb-4">
            <label htmlFor="dojo" className="block text-sm font-medium text-gray-700">Dojo</label>
            <select {...register('dojo', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona un dojo</option>
              {DojosData?.map((dojo) => (
                <option key={dojo.id} value={dojo.id}>
                  {dojo.nombreDojo}
                </option>
              ))}
            </select>
            {errors.dojo && <span className="text-red-500">Este campo es requerido</span>}
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

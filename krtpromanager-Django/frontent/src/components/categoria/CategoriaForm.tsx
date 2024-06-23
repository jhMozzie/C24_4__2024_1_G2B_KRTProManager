import { useForm } from "react-hook-form";
import { Categoria } from "../../interfaces/index";
import { useCreateCategoria, useUpdateCategoria } from "../../services/Categoria/mutations";
import { useEffect } from "react";

interface CategoriaFormProps {
  onClose: () => void;
  existingCategoria?: Categoria;
}

export const CategoriaForm = ({ onClose, existingCategoria }: CategoriaFormProps) => {
  const createCategoriaMutation = useCreateCategoria();
  const updateCategoriaMutation = useUpdateCategoria();

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<Categoria>();

  useEffect(() => {
    if (existingCategoria) {
      setValue('nombre', existingCategoria.nombre);
      setValue('descripcion', existingCategoria.descripcion);
      setValue('genero', existingCategoria.genero);
      setValue('grado', existingCategoria.grado);
      setValue('modalidad', existingCategoria.modalidad);
    }
  }, [existingCategoria, setValue]);

  const onSubmit = (data: Categoria) => {
    if (existingCategoria) {
      updateCategoriaMutation.mutate({ ...data, id: existingCategoria.id });
    } else {
      createCategoriaMutation.mutate(data);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" {...register('nombre', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.nombre && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <input type="text" {...register('descripcion', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.descripcion && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="genero" className="block text-sm font-medium text-gray-700">Género</label>
            <select {...register('genero', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            {errors.genero && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="grado" className="block text-sm font-medium text-gray-700">Grado</label>
            <input type="text" {...register('grado', { required: true })} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            {errors.grado && <span className="text-red-500">Este campo es requerido</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="modalidad" className="block text-sm font-medium text-gray-700">Modalidad</label>
            <select {...register('modalidad', { required: true })} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Selecciona una modalidad</option>
              <option value="Kata">Kata</option>
              <option value="Kumite">Kumite</option>
            </select>
            {errors.modalidad && <span className="text-red-500">Este campo es requerido</span>}
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

import { useForm } from "react-hook-form";
import { Competidor } from "../../interfaces/competidor";
import {
  useCreateCompetidor,
  useUpdateCompetidor,
} from "../../services/Competidor/mutation";
import { useEffect } from "react";

interface CompetidorFormProps {
  onClose: () => void;
  existingCompetidor?: Competidor;
}

export const CompetidorForm = ({
  onClose,
  existingCompetidor,
}: CompetidorFormProps) => {
  const createCompetidorMutation = useCreateCompetidor();
  const updateCompetidorMutation = useUpdateCompetidor();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Competidor>();

  useEffect(() => {
    if (existingCompetidor) {
      setValue("nombre", existingCompetidor.nombre);
      setValue("apellido", existingCompetidor.apellido);
      setValue("edad", existingCompetidor.edad);
      setValue("genero", existingCompetidor.genero);
      // Optional: if you want to reset form state as well
      reset(existingCompetidor);
    }
  }, [existingCompetidor, setValue, reset]);

  const onSubmit = (data: Competidor) => {
    if (existingCompetidor) {
      updateCompetidorMutation.mutate({ ...data, id: existingCompetidor.id });
    } else {
      createCompetidorMutation.mutate(data);
    }
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              {...register("nombre", { required: true })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.nombre && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="apellido"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido
            </label>
            <input
              type="text"
              {...register("apellido", { required: true })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.apellido && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="edad"
              className="block text-sm font-medium text-gray-700"
            >
              Edad
            </label>
            <input
              type="number"
              {...register("edad", { required: true })}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.edad && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="genero"
              className="block text-sm font-medium text-gray-700"
            >
              Género
            </label>
            <select
              {...register("genero", { required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            {errors.genero && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

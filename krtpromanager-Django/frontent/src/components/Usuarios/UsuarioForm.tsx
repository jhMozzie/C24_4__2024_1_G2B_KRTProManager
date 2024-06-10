import { useForm } from "react-hook-form";
import { Usuario } from "../../interfaces/index";
import { useCreateUsuario, useUpdateUsuario } from "../../services/Usuario/mutations";
import { useEffect } from "react";

interface UsuarioFormProps {
  onClose: () => void;
  existingUsuario?: Usuario;
}

export const UsuarioForm = ({ onClose, existingUsuario }: UsuarioFormProps) => {
  const createUsuarioMutation = useCreateUsuario();
  const updateUsuarioMutation = useUpdateUsuario();

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<Usuario>();

  useEffect(() => {
    if (existingUsuario) {
      setValue('username', existingUsuario.username);
      setValue('nombres', existingUsuario.nombres);
      setValue('apellidos', existingUsuario.apellidos);
      setValue('email', existingUsuario.email);
      setValue('password', existingUsuario.password);
      setValue('confirmPassword', existingUsuario.password);
    }
  }, [existingUsuario, setValue]);

  const onSubmit = (data: Usuario) => {
    if (existingUsuario) {
      updateUsuarioMutation.mutate({ ...data, id: existingUsuario.id });
    } else {
      createUsuarioMutation.mutate(data);
    }
    reset();
    onClose();
  };

  const password = watch("password", "");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
            <input 
              type="text" 
              {...register('username', { required: true, minLength: 3 })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.username && errors.username.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.username && errors.username.type === "minLength" && (
              <span className="text-red-500">El nombre de usuario debe tener al menos 3 caracteres</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres</label>
            <input 
              type="text" 
              {...register('nombres', { required: true })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.nombres && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>
            <input 
              type="text" 
              {...register('apellidos', { required: true })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.apellidos && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input 
              type="email" 
              {...register('email', { 
                required: "El correo electrónico es requerido", 
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Formato de correo electrónico inválido" 
                }
              })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              {...register('password', { required: true, minLength: 6 })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span className="text-red-500">La contraseña debe tener al menos 6 caracteres</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
            <input 
              type="password" 
              {...register('confirmPassword', {
                required: true,
                validate: value => value === password || "Las contraseñas no coinciden"
              })} 
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            {errors.confirmPassword && (
              <span className="text-red-500">{errors.confirmPassword.message}</span>
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

import { useForm } from "react-hook-form";
import { Register } from "../interfaces/index";
import {RegisterPost} from "../services/login_register"
export const RegistrarForm = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<Register>();

  const onSubmit = (data: Register) => {
    const { confirmPassword, ...submitData } = data;  // Excluir el campo confirmPassword
    RegisterPost(submitData);
    reset();
  };

  // Watch the password field for matching validation
  const password = watch("password", "");

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-orange-400 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Registrar Usuarios</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre para logiarse</label>
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
            <button type="button" onClick={() => reset()} className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Resetear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

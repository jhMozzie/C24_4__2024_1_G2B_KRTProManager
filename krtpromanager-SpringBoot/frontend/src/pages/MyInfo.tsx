// components/pages/MyInfoPage.tsx o MyInfoPage.jsx
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UsuarioInfo } from "../services/Usuario/api";

export const MyInfo = () => {
  const {
    data: usuario,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["usuario"],
    queryFn: UsuarioInfo,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!usuario) {
    return <div>No hay información del usuario para mostrar</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Mi Información</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID:
          </label>
          <p className="text-gray-900">{usuario.id}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de usuario:
          </label>
          <p className="text-gray-900">{usuario.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <p className="text-gray-900">{usuario.nombre}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellido:
          </label>
          <p className="text-gray-900">{usuario.apellido}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-900">{usuario.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rol:
          </label>
          <p className="text-gray-900">{usuario.rol}</p>
        </div>
      </div>
    </div>
  );
};

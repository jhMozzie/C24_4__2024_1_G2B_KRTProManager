import { useState } from "react";
import { Usuario } from "../interfaces/index";
import { usuariosObtener, usuariosObtenerid } from "../services/Usuario/api";
import { useQuery } from '@tanstack/react-query';
import { useDeleteUsuario } from "../services/Usuario/mutations";
import { UsuarioForm } from "../components/Usuarios/UsuarioForm";
import { Toaster } from "react-hot-toast";
import { XCircle } from 'lucide-react';

export const CrudUsuarios = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState<Usuario | undefined>(undefined);

  const { data: usuariosData, error, isLoading } = useQuery<Usuario[]>({
    queryKey: ['usuarios'],
    queryFn: usuariosObtener,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredUsuarios = usuariosData
    ? usuariosData.filter((usuario) =>
        usuario.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const deleteUsuarioMutation = useDeleteUsuario();

  const handleDelete = (id: number) => {
    deleteUsuarioMutation.mutate(id);
  };

  const handleUpdateClick = async (id: number) => {
    const usuario = await usuariosObtenerid(id);
    setCurrentUsuario(usuario);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!usuariosData) {
    return <div>No hay usuarios para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-gray-600">Para administrar las cuentas de usuario del sistema.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentUsuario(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Usuario
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre de usuario"
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <XCircle
            className="h-6 w-6 text-gray-400 absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
        </div>
      </div>

      {isFormVisible && (
        <UsuarioForm onClose={() => setFormVisible(false)} existingUsuario={currentUsuario} />
      )}

      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre de usuario</th>
              <th className="border px-4 py-4">Nombres</th>
              <th className="border px-4 py-4">Apellidos</th>
              <th className="border px-4 py-4">Email</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.map((usuario) => (
              <tr key={usuario.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{usuario.id}</td>
                <td className="border px-4 py-2">{usuario.username}</td>
                <td className="border px-4 py-2">{usuario.nombres}</td>
                <td className="border px-4 py-2">{usuario.apellidos}</td>
                <td className="border px-4 py-2">{usuario.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(usuario.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 ml-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

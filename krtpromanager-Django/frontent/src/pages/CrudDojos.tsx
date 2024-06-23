import { useState } from "react";
// Importando interfaces
import { Dojos } from "../interfaces/index";
// Importando el API
import { dojosObtener, dojosObtenerid } from "../services/Dojo/api";
// Importando React Query
import { useQuery } from '@tanstack/react-query';
import { useDeleteDojo } from "../services/Dojo/mutations";
// Componente de formulario
import { DojoForm } from "../components/dojo/DojoForm";
// Haciendo el toaster
import { Toaster } from "react-hot-toast";
// Iconos
import { XCircle } from 'lucide-react';

export const CrudDojos = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentDojo, setCurrentDojo] = useState<Dojos | undefined>(undefined);

  // Usando el query para traer la data
  const { data: dojosData, error, isLoading } = useQuery<Dojos[]>({
    queryKey: ['dojos'],
    queryFn: dojosObtener,
  });

  // Añadiendo el buscar
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDojos = dojosData
    ? dojosData.filter((dojo) =>
        dojo.nombreDojo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Usando el mutate para ejecutar el eliminar
  const deleteDojoMutation = useDeleteDojo();

  // Funcionalidad para eliminar, recibe de parámetro el id
  const handleDelete = (id: number) => {
    deleteDojoMutation.mutate(id);
  };

  // Controlando el click para el update, recibe el id para después pasarlo al componente el objeto de dojo uno solo
  const handleUpdateClick = async (id: number) => {
    const dojo = await dojosObtenerid(id);
    setCurrentDojo(dojo);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!dojosData) {
    return <div>No hay dojos para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Portal de Gestión de Dojos</h1>
        <p className="text-gray-600">Aquí puedes gestionar la lista de dojos. Agrega, actualiza o elimina dojos según sea necesario.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentDojo(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Dojo
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre"
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
        <DojoForm onClose={() => setFormVisible(false)} existingDojo={currentDojo} />
      )}

      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre Dojo</th>
              <th className="border px-4 py-4">Sensei Dojo</th>
              <th className="border px-4 py-4">Usuario</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDojos.map((dojo) => (
              <tr key={dojo.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{dojo.id}</td>
                <td className="border px-4 py-2">{dojo.nombreDojo}</td>
                <td className="border px-4 py-2">{dojo.senseiDojo}</td>
                <td className="border px-4 py-2">{dojo.usuario_nombre}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(dojo.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(dojo.id)}
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
};

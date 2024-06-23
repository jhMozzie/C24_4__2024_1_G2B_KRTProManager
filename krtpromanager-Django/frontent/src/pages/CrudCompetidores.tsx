import { useState } from "react";
// Importando interfaces
import { Competidor } from "../interfaces/index";
// Importando el API
import { CompetidoresObtener,CompetidoresObtenerid } from "../services/Competidor/api";
// Importando React Query
import { useQuery } from '@tanstack/react-query';
import { useDeleteCompetidor } from "../services/Competidor/mutations";
//aca mi componente de formulario
import { CompetidorForm } from "../components/competidor/CompetidorForm";
//haciendo el toaster
import {Toaster} from "react-hot-toast"
//iconos
import { XCircle } from 'lucide-react';
// Componente de la tabla de competidores
export const CrudCompetidores = () => {
 //para que se vea o no 
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentCompetidor, setCurrentCompetidor] = useState<Competidor | undefined>(undefined);

  //usando el query para traer la data
  const { data: competidoresData, error, isLoading } = useQuery<Competidor[]>({
    queryKey: ['competidores'],
    queryFn: CompetidoresObtener,
  });

  //añadiendo el buscar /////////////////////////
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredCompetidores = competidoresData
  ? competidoresData.filter((competidor) =>
      competidor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
  ///////////////////////////////////////////
  //una manera de usar los mutable basicamente para ejecutar el eliminar
  const deleteCompetidorMutation = useDeleteCompetidor();

  //funcionalidad para eliminar resive de parametro el id
  const handleDelete = (id: number) => {
    deleteCompetidorMutation.mutate(id);
  };

  //controlando el click para el update resive el id para despues pasarlo al componente el objeto de competidor uno solo
  const handleUpdateClick = async (id: number) => {
    const competidor = await CompetidoresObtenerid(id);
    //guardandolo en un usestate para poder despues mandarlo 
    setCurrentCompetidor(competidor);
    //hago se muestre el componente
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!competidoresData) {
    return <div>No hay competidores para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Portal de Gestión de Competidores</h1>
        <p className="text-gray-600">Aquí puedes gestionar la lista de competidores. Agrega, actualiza o elimina competidores según sea necesario.</p>
      </div>
  
  <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
  <button
    onClick={() => {
      setCurrentCompetidor(undefined);
      setFormVisible(true);
    }}
    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
  >
    Crear Competidor
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
        <CompetidorForm onClose={() => setFormVisible(false)} existingCompetidor={currentCompetidor} />
      )}
  
      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre</th>
              <th className="border px-4 py-4">Apellido</th>
              <th className="border px-4 py-4">Edad</th>
              <th className="border px-4 py-4">Género</th>
              <th className="border px-4 py-4">Dojo</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetidores.map((competidor) => (
              <tr key={competidor.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{competidor.id}</td>
                <td className="border px-4 py-2">{competidor.nombre}</td>
                <td className="border px-4 py-2">{competidor.apellido}</td>
                <td className="border px-4 py-2">{competidor.edad}</td>
                <td className="border px-4 py-2">{competidor.genero}</td>
                <td className="border px-4 py-2">{competidor.dojo_nombre}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(competidor.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(competidor.id)}
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
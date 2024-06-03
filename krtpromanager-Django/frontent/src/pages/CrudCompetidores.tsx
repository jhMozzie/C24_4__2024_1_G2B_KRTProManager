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
    <div className="mt-20">
      <button onClick={() => { setCurrentCompetidor(undefined); setFormVisible(true); }} className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Crear Competidor</button>

      {isFormVisible && <CompetidorForm onClose={() => setFormVisible(false)} existingCompetidor={currentCompetidor} />}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellido</th>
            <th className="border px-4 py-2">Edad</th>
            <th className="border px-4 py-2">Género</th>
            <th className="border px-4 py-2">Dojo</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {competidoresData.map(competidor => (
            <tr key={competidor.id}>
              <td className="border px-4 py-2">{competidor.id}</td>
              <td className="border px-4 py-2">{competidor.nombre}</td>
              <td className="border px-4 py-2">{competidor.apellido}</td>
              <td className="border px-4 py-2">{competidor.edad}</td>
              <td className="border px-4 py-2">{competidor.genero}</td>
              <td className="border px-4 py-2">{competidor.dojo_nombre}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleUpdateClick(competidor.id)} className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700">Actualizar</button>
                <button onClick={() => handleDelete(competidor.id)} className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 ml-2">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
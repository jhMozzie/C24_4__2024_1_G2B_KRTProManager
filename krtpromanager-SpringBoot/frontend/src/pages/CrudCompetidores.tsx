import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompetidorForm } from "../components/Competidor/CompetidorForm";
import {
  CompetidoresObtener,
  CompetidoresObtenerid,
} from "../services/Competidor/api";
import { useDeleteCompetidor } from "../services/Competidor/mutation";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Competidor } from "../interfaces/competidor";

export const CrudCompetidores = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentCompetidor, setCurrentCompetidor] = useState<
    Competidor | undefined
  >(undefined);

  const {
    data: competidoresData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["competidores"],
    queryFn: CompetidoresObtener,
  });

  const deleteCompetidorMutation = useDeleteCompetidor();

  const handleDelete = (id: number) => {
    deleteCompetidorMutation.mutate(id);
    toast.success("Competidor eliminado con éxito");
  };

  const handleUpdateClick = async (id: number) => {
    const competidor = await CompetidoresObtenerid(id);
    setCurrentCompetidor(competidor);
    setFormVisible(true);
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!Array.isArray(competidoresData)) {
    return (
      <div>
        Error: Los datos recibidos no son un arreglo -{" "}
        {JSON.stringify(competidoresData)}
      </div>
    );
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold">Gestión de Competidores</h1>
        <p>Ver, agregar, actualizar o eliminar competidores.</p>
        <button
          onClick={() => {
            setCurrentCompetidor(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          <Plus /> Crear Competidor
        </button>
      </div>
      {isFormVisible && (
        <CompetidorForm
          onClose={() => setFormVisible(false)}
          existingCompetidor={currentCompetidor}
        />
      )}
      <table className="w-full border-collapse text-center shadow-lg">
        <thead className="bg-gray-200">
          <tr>
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
          {competidoresData.map((competidor) => (
            <tr
              key={competidor.id}
              className="even:bg-gray-100 odd:bg-white hover:bg-gray-50 transition-colors"
            >
              <td className="border px-4 py-2">{competidor.id}</td>
              <td className="border px-4 py-2">{competidor.nombre}</td>
              <td className="border px-4 py-2">{competidor.apellido}</td>
              <td className="border px-4 py-2">{competidor.edad}</td>
              <td className="border px-4 py-2">{competidor.genero}</td>
              <td className="border px-4 py-2">{competidor.dojo.nombreDojo}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdateClick(competidor.id)}
                  className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                >
                  <Edit2 /> Actualizar
                </button>
                <button
                  onClick={() => handleDelete(competidor.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 ml-2"
                >
                  <Trash2 /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

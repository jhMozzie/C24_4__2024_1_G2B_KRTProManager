import { useState } from "react";
import { DetalleCategoriaCompetidor } from "../interfaces/index";
import { useQuery } from "@tanstack/react-query";
import { detallecategoriacompetidorObtener, detallecategoriacompetidorObtenerid } from "../services/CategoriaCompetidor/api";
import { useDeleteDetalleCategoriaCompetidor } from "../services/CategoriaCompetidor/mutations";
import { DetalleCategoriaCompetidorForm } from "./../components/detallecategoriacompetidor/DetalleCategoriaCompetidorForm";
import { Toaster } from "react-hot-toast";

export const CrudCategoriaCompetidor = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentDetalle, setCurrentDetalle] = useState<DetalleCategoriaCompetidor | undefined>(undefined);

  const { data: detallesData, error, isLoading } = useQuery<DetalleCategoriaCompetidor[]>({
    queryKey: ["detallecategoriacompetidor"],
    queryFn: detallecategoriacompetidorObtener,
  });

  const deleteDetalleMutation = useDeleteDetalleCategoriaCompetidor();

  const handleDelete = (id: number) => {
    deleteDetalleMutation.mutate(id);
  };

  const handleUpdateClick = async (id: number) => {
    const detalle = await detallecategoriacompetidorObtenerid(id);
    setCurrentDetalle(detalle);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!detallesData) {
    return <div>No hay detalles para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Gestión de Detalles de Categoría-Competidor</h1>
        <p className="text-gray-600">Aquí puedes gestionar la lista de detalles de categoría-competidor. Agrega, actualiza o elimina detalles según sea necesario.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentDetalle(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Detalle
        </button>
      </div>

      {isFormVisible && (
        <DetalleCategoriaCompetidorForm onClose={() => setFormVisible(false)} existingDetalle={currentDetalle} />
      )}

      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Competidor</th>
              <th className="border px-4 py-4">Categoría</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {detallesData.map((detalle) => (
              <tr key={detalle.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{detalle.id}</td>
                <td className="border px-4 py-2">{`${detalle.Competidor_nombre} ${detalle.Competidor_apellido} ${detalle.Competidor_dojo_nombre}`}</td>
                <td className="border px-4 py-2">{`${detalle.Categoria_nombre} ${detalle.Categoria_genero} ${detalle.Categoria_modelidad} ${detalle.Categoria_grado}`}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(detalle.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(detalle.id)}
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
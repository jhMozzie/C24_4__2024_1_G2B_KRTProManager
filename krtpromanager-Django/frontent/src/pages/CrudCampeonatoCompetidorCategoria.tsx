// components/detallecampeonatocompetidorCategoria/CrudCampeonatoCompetidorCategoria.tsx
import { useState } from "react";
import { DetallecampeonatocompetidorCategoria } from "../interfaces/detallecampeonatocompetidorCategoria";
import { detallecampeonatocompetidorCategoriaObtener, detallecampeonatocompetidorCategoriaObtenerid } from "../services/CampeonatoCompetidorCategoria/api";
import { useQuery } from "@tanstack/react-query";
import { useDeleteDetallecampeonatocompetidorCategoria } from "../services/CampeonatoCompetidorCategoria/mutations";
import { DetalleCampeonatoCompetidorCategoriaForm } from "../components/detallecampeonatocompetidorCategoria/DetalleCampeonatoCompetidorCategoriaForm";
import { Toaster } from "react-hot-toast";
import { XCircle } from "lucide-react";

export const CrudCampeonatoCompetidorCategoria = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentDetalle, setCurrentDetalle] = useState<DetallecampeonatocompetidorCategoria | undefined>(undefined);

  const { data: detallesData, error, isLoading } = useQuery<DetallecampeonatocompetidorCategoria[]>({
    queryKey: ["detallecampeonatocompetidorCategoria"],
    queryFn: detallecampeonatocompetidorCategoriaObtener,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredDetalles = detallesData
    ? detallesData.filter((detalle) =>
        `${detalle.Competidor_nombre} ${detalle.Competidor_apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const deleteDetalleMutation = useDeleteDetallecampeonatocompetidorCategoria();

  const handleDelete = (id: number) => {
    deleteDetalleMutation.mutate(id);
  };

  const handleUpdateClick = async (id: number) => {
    const detalle = await detallecampeonatocompetidorCategoriaObtenerid(id);
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
        <h1 className="text-3xl font-bold mb-2">Portal de Gestión de Detalles Campeonato Competidor Categoría</h1>
        <p className="text-gray-600">Aquí puedes gestionar la lista de detalles. Agrega, actualiza o elimina detalles según sea necesario.</p>
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
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre de competidor"
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
        <DetalleCampeonatoCompetidorCategoriaForm onClose={() => setFormVisible(false)} existingDetalle={currentDetalle} />
      )}
      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Competidor</th>
              <th className="border px-4 py-4">Dojo Competidor</th>
              <th className="border px-4 py-4">Categoria</th>
              <th className="border px-4 py-4">Detalle categoria</th>
              <th className="border px-4 py-4"> Campeonato - fecha</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetalles.map((detalle) => (
              <tr key={detalle.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{detalle.id}</td>
                <td className="border px-4 py-2">{`${detalle.Competidor_nombre}  ${detalle.Competidor_apellido}`}</td>
                <td className="border px-4 py-2">{detalle.Competidor_dojo_nombre}</td>
                <td className="border px-4 py-2">{detalle.Categoria_nombre}</td>
                <td className="border px-4 py-2">{`${detalle.Categoria_genero} - ${detalle.Categoria_modelidad} - ${detalle.Categoria_grado}`}</td>
                <td className="border px-4 py-2">{`${detalle.Campeonato_nombre} -/- ${new Date(detalle.Campeonato_fecha).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })} ${new Date(detalle.Campeonato_fecha).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}`}</td>
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

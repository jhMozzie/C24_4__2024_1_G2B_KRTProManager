import { useState } from "react";
// Importando interfaces
import { Sanciones } from "../interfaces/index";
// Importando el API
import { sancionesObtener, sancionesObtenerid } from "../services/Sancion/api";
// Importando React Query
import { useQuery } from "@tanstack/react-query";
import { useDeleteSancion } from "../services/Sancion/mutations";
// Componente de formulario
import { SancionForm } from "../components/Sancion/SancionForm";
// Haciendo el toaster
import { Toaster } from "react-hot-toast";
// Iconos
import { XCircle } from "lucide-react";

// Componente de la tabla de sanciones
export const CrudSanciones = () => {
  // Para que se vea o no
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentSancion, setCurrentSancion] = useState<Sanciones | undefined>(undefined);

  // Usando el query para traer la data
  const { data: sancionesData, error, isLoading } = useQuery<Sanciones[]>({
    queryKey: ['sanciones'],
    queryFn: sancionesObtener,
  });

  // Añadiendo el buscar
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredSanciones = sancionesData
    ? sancionesData.filter((sancion) =>
        `${sancion.Competidor_nombre} ${sancion.Competidor_apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Una manera de usar los mutable basicamente para ejecutar el eliminar
  const deleteSancionMutation = useDeleteSancion();

  // Funcionalidad para eliminar recibe de parámetro el id
  const handleDelete = (id: number) => {
    deleteSancionMutation.mutate(id);
  };

  // Controlando el click para el update recibe el id para después pasarlo al componente el objeto de sancion uno solo
  const handleUpdateClick = async (id: number) => {
    const sancion = await sancionesObtenerid(id);
    // Guardándolo en un usestate para poder después mandarlo
    setCurrentSancion(sancion);
    // Hago se muestre el componente
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sancionesData) {
    return <div>No hay sanciones para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Portal de Gestión de Sanciones</h1>
        <p className="text-gray-600">Aquí puedes gestionar la lista de sanciones. Agrega, actualiza o elimina sanciones según sea necesario.</p>
      </div>
      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentSancion(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Sanción
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
        <SancionForm onClose={() => setFormVisible(false)} existingSancion={currentSancion} />
      )}
      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre Competidor</th>
              <th className="border px-4 py-4">Apellido Competidor</th>
              <th className="border px-4 py-4">Dojo Competidor</th>
              <th className="border px-4 py-4">Motivo</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSanciones.map((sancion) => (
              <tr key={sancion.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{sancion.id}</td>
                <td className="border px-4 py-2">{sancion.Competidor_nombre}</td>
                <td className="border px-4 py-2">{sancion.Competidor_apellido}</td>
                <td className="border px-4 py-2">{sancion.Competidor_dojo_nombre}</td>
                <td className="border px-4 py-2">{sancion.motivo}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(sancion.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(sancion.id)}
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
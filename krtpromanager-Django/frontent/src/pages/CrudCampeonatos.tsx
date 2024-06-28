import { useState } from "react";
import { Campeonato } from "../interfaces/index";
import { campeonatosObtener, campeonatosObtenerid } from "../services/Campeonato/api";
import { useQuery } from '@tanstack/react-query';
import { useDeleteCampeonato } from "../services/Campeonato/mutations";
import { CampeonatoForm } from "../components/campeonato/CampeonatoForm";
import { Toaster } from "react-hot-toast";
import { XCircle } from 'lucide-react';

export const CrudCampeonatos = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentCampeonato, setCurrentCampeonato] = useState<Campeonato | undefined>(undefined);

  const { data: campeonatosData, error, isLoading } = useQuery<Campeonato[]>({
    queryKey: ['campeonatos'],
    queryFn: campeonatosObtener,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampeonatos = campeonatosData
    ? campeonatosData.filter((campeonato) =>
        campeonato.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const deleteCampeonatoMutation = useDeleteCampeonato();

  const handleDelete = (id: number) => {
    deleteCampeonatoMutation.mutate(id);
  };

  const handleUpdateClick = async (id: number) => {
    const campeonato = await campeonatosObtenerid(id);
    console.log(campeonato);
    setCurrentCampeonato(campeonato);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!campeonatosData) {
    return <div>No hay campeonatos para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Gestión de Campeonatos</h1>
        <p className="text-gray-600"> Para organizar y administrar campeonatos.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentCampeonato(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Campeonato
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
        <CampeonatoForm onClose={() => setFormVisible(false)} existingCampeonato={currentCampeonato} />
      )}

      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre</th>
              <th className="border px-4 py-4">Fecha Y Hora</th>
              <th className="border px-4 py-4">Local</th>
              <th className="border px-4 py-4">Provincia</th>
              <th className="border px-4 py-4">Distrito</th>
              <th className="border px-4 py-4">Dojo</th>
              <th className="border px-4 py-4">Imagen</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
  {filteredCampeonatos.map((campeonato) => (
    <tr key={campeonato.id} className="even:bg-gray-100 odd:bg-white">
      <td className="border px-4 py-2">{campeonato.id}</td>
      <td className="border px-4 py-2">{campeonato.nombre}</td>
      <td className="border px-4 py-2">{new Date(campeonato.fecha).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })} {new Date(campeonato.fecha).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </td><td className="border px-4 py-2">{campeonato.local}</td><td className="border px-4 py-2">{campeonato.provincia}</td><td className="border px-4 py-2">{campeonato.distrito}</td><td className="border px-4 py-2">{campeonato.dojo_nombre}</td><td className="border px-4 py-2">
        {campeonato.imagen && typeof campeonato.imagen === 'string' ? (
          <img src={campeonato.imagen} alt={campeonato.nombre} className="w-16 h-16 object-cover mx-auto" />
        ) : null}
      </td><td className="border px-4 py-2">
        <button
          onClick={() => handleUpdateClick(campeonato.id)}
          className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
        >
          Actualizar
        </button>
        <button
          onClick={() => handleDelete(campeonato.id)}
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

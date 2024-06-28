import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { obtenerCompetidoresPorCategoria, obtenerCampeonatos } from '../services/Consultas/api';
import { consulta, Campeonato } from "../interfaces/index";

export const ResumenCampeonatos = () => {
  const [selectedCampeonato, setSelectedCampeonato] = useState<number | null>(null);
  const [selectedFecha, setSelectedFecha] = useState<string | null>(null);
  const [totalCompetidores, setTotalCompetidores] = useState<number>(0);

  const { data: campeonatosData, error: campeonatosError, isLoading: campeonatosLoading } = useQuery<Campeonato[]>({
    queryKey: ['campeonatos'],
    queryFn: obtenerCampeonatos,
  });

  const { data: competidoresData, error: competidoresError, isLoading: competidoresLoading } = useQuery<consulta[]>({
    queryKey: ['competidoresPorCategoria', selectedCampeonato, selectedFecha],
    queryFn: () => obtenerCompetidoresPorCategoria(campeonatosData!.find(c => c.id === selectedCampeonato)!.nombre, selectedFecha!),
    enabled: !!selectedCampeonato && !!selectedFecha,
  });

  useEffect(() => {
    if (campeonatosData && campeonatosData.length > 0) {
      const firstCampeonato = campeonatosData[0];
      setSelectedCampeonato(firstCampeonato.id);
      setSelectedFecha(firstCampeonato.fecha);
    }
  }, [campeonatosData]);

  useEffect(() => {
    if (competidoresData) {
      const total = competidoresData.reduce((sum, item) => sum + item.cantidad_competidores, 0);
      setTotalCompetidores(total);
    }
  }, [competidoresData]);

  const handleCampeonatoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(e.target.value);
    const campeonato = campeonatosData?.find(c => c.id === selectedId);
    if (campeonato) {
      setSelectedCampeonato(selectedId);
      setSelectedFecha(campeonato.fecha);
    }
  };

  if (campeonatosLoading) {
    return <div>Cargando campeonatos...</div>;
  }

  if (campeonatosError) {
    return <div>Error al cargar campeonatos: {campeonatosError.message}</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Resumen de Campeonatos</h1>
        <p className="text-gray-600"> Para ver un resumen de los campeonatos realizados.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex items-center justify-between">
        <select onChange={handleCampeonatoChange} value={selectedCampeonato || ''} className="px-4 py-2 border border-gray-300 rounded-md">
          {campeonatosData?.map(campeonato => (
            <option key={campeonato.id} value={campeonato.id}>
              {campeonato.nombre} - {new Date(campeonato.fecha).toLocaleDateString('es-ES')}
            </option>
          ))}
        </select>
        <div className="text-lg font-medium">
          Total de Inscripciones: {totalCompetidores}
        </div>
      </div>

      {competidoresLoading && <div>Cargando Inscripciones...</div>}

      {competidoresError && <div>Error al cargar Inscripciones: {competidoresError.message}</div>}

      {competidoresData && (
        <div className="w-full max-w-7xl">
          <table className="min-w-full divide-y divide-gray-200 shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modalidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad de Inscripciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {competidoresData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.categoria_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.categoria_modalidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.cantidad_competidores}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// components/pages/ListaCampeonatos.tsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import {
  campeonatosObtener,
  campeonatosObtenerId,
} from "../services/Campeonato/api";
import { Campeonato } from "../interfaces/index";

const ListaCampeonatos: React.FC = () => {
  const [selectedCampeonato, setSelectedCampeonato] =
    useState<Campeonato | null>(null);

  const {
    data: campeonatos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["campeonatos"],
    queryFn: campeonatosObtener,
  });

  const { data: campeonato, refetch: fetchCampeonatoById } = useQuery({
    queryKey: ["campeonato"],
    queryFn: () => campeonatosObtenerId(selectedCampeonato?.id || 0),
    enabled: !!selectedCampeonato,
  });

  useEffect(() => {
    if (campeonatos) {
      console.log("Campeonatos:", campeonatos);
    }
  }, [campeonatos]);

  useEffect(() => {
    if (campeonato) {
      console.log("Campeonato:", campeonato);
    }
  }, [campeonato]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  }

  const handleCardClick = (id: number) => {
    setSelectedCampeonato(
      campeonatos.find((camp: Campeonato) => camp.id === id) || null
    );
    fetchCampeonatoById();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Lista de Campeonatos
        </h1>
        <p className="text-center mb-12">
          Aquí puedes ver una lista de todos los campeonatos disponibles.
        </p>
        {selectedCampeonato ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCampeonato.nombre}
            </h2>
            <p className="text-gray-700 mb-2">
              Fecha: {new Date(selectedCampeonato.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              Local: {selectedCampeonato.local}
            </p>
            <p className="text-gray-700 mb-2">
              Provincia: {selectedCampeonato.provincia}
            </p>
            <p className="text-gray-700 mb-2">
              Distrito: {selectedCampeonato.distrito}
            </p>
            <p className="text-gray-700 mb-2">
              Dojo: {selectedCampeonato.dojo.nombreDojo}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSelectedCampeonato(null)}
            >
              Volver a la lista
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
            {campeonatos?.map((campeonato: Campeonato) => (
              <div
                key={campeonato.id}
                className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
                onClick={() => handleCardClick(campeonato.id)}
              >
                <h2 className="text-2xl font-bold mb-2">{campeonato.nombre}</h2>
                <p className="text-gray-700 mb-2">
                  Fecha: {new Date(campeonato.fecha).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">Local: {campeonato.local}</p>
                <p className="text-gray-700 mb-2">
                  Provincia: {campeonato.provincia}
                </p>
                <p className="text-gray-700 mb-2">
                  Distrito: {campeonato.distrito}
                </p>
                <p className="text-gray-700 mb-2">
                  Dojo: {campeonato.dojo.nombreDojo}
                </p>
                {/* Puedes agregar más campos según sea necesario */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaCampeonatos;

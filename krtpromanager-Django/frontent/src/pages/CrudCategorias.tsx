import { useState } from "react";
import { Categoria } from "../interfaces/index";
import { categoriasObtener, categoriasObtenerid } from "../services/Categoria/api";
import { useQuery } from "@tanstack/react-query";
import { useDeleteCategoria } from "../services/Categoria/mutations";
import { CategoriaForm } from "../components/categoria/CategoriaForm";
import { Toaster } from "react-hot-toast";
import { XCircle } from "lucide-react";

export const CrudCategorias = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState<Categoria | undefined>(undefined);

  const { data: categoriasData, error, isLoading } = useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: categoriasObtener,
  });

  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredCategorias = categoriasData
    ? categoriasData.filter((categoria) =>
        categoria.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const deleteCategoriaMutation = useDeleteCategoria();

  const handleDelete = (id: number) => {
    deleteCategoriaMutation.mutate(id);
  };

  const handleUpdateClick = async (id: number) => {
    const categoria = await categoriasObtenerid(id);
    setCurrentCategoria(categoria);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!categoriasData) {
    return <div>No hay categorías para mostrar</div>;
  }

  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="w-full max-w-7xl mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Gestión de Categorías</h1>
        <p className="text-gray-600"> Para definir y gestionar las categorías de competencia.</p>
      </div>

      <div className="w-full max-w-7xl mb-6 flex justify-start items-center">
        <button
          onClick={() => {
            setCurrentCategoria(undefined);
            setFormVisible(true);
          }}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
        >
          Crear Categoría
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por descripción"
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
        <CategoriaForm onClose={() => setFormVisible(false)} existingCategoria={currentCategoria} />
      )}

      <div className="w-full max-w-7xl">
        <table className="w-full border-collapse text-center shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-4">ID</th>
              <th className="border px-4 py-4">Nombre</th>
              <th className="border px-4 py-4">Descripción</th>
              <th className="border px-4 py-4">Género</th>
              <th className="border px-4 py-4">Grado</th>
              <th className="border px-4 py-4">Modalidad</th>
              <th className="border px-4 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategorias.map((categoria) => (
              <tr key={categoria.id} className="even:bg-gray-100 odd:bg-white">
                <td className="border px-4 py-2">{categoria.id}</td>
                <td className="border px-4 py-2">{categoria.nombre}</td>
                <td className="border px-4 py-2">{categoria.descripcion}</td>
                <td className="border px-4 py-2">{categoria.genero}</td>
                <td className="border px-4 py-2">{categoria.grado}</td>
                <td className="border px-4 py-2">{categoria.modalidad}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleUpdateClick(categoria.id)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
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

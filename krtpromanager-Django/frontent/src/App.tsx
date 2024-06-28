import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form_login } from './components/Usuarios/Form_login.tsx';
import { Selogeounpapu } from './components/Usuarios/Selogeounpapu.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { useAuthStore } from "./store/auth.ts";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import {  LifeBuoy, PersonStanding ,User,Trophy,Medal,LandPlot,UsersRound,HardHat ,Handshake,ContactRound ,ScanSearch     } from "lucide-react";
import { CrudCompetidores } from './pages/CrudCompetidores.tsx';
import { RegistrarForm } from './pages/RegistrarForm.tsx';
import { CrudUsuarios } from './pages/CrudUsuarios.tsx';
import { CrudDojos } from './pages/CrudDojos.tsx';
import { CrudCampeonatos } from './pages/CrudCampeonatos.tsx';
import { CrudCategorias } from './pages/CrudCategorias.tsx';
import { CrudDetalleCampeonatoCategoria } from './pages/CrudCampeonatoCategoria.tsx';
import { CrudCampeonatoCompetidorCategoria } from './pages/CrudCampeonatoCompetidorCategoria.tsx';
import { CrudCategoriaCompetidor } from './pages/CrudCategoriaCompetidor.tsx';
import { CrudSanciones } from './pages/CrudSanciones.tsx';
import { ResumenCampeonatos } from './pages/ResumenCampeonatos.tsx';

const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);

  if (location.pathname === '/login') {
    return <Form_login />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<LifeBuoy size={20} />} text="Registro de Competidores" to="/register" />
        <SidebarItem icon={<User size={20} />} text="Gestión de Usuarios" to="/usuario" />
        <SidebarItem icon={<Medal size={20} />} text="Gestión de Dojos" to="/dojos" />
        <SidebarItem icon={<PersonStanding size={20} />} text="Gestión de Competidores" to="/competidores" />
        <SidebarItem icon={<Trophy size={20} />} text="Gestión de Campeonatos" to="/campeonatos" />
        <SidebarItem icon={<ContactRound  size={20} />} text="Gestión de Categorías" to="/categorias" />
        <SidebarItem icon={<UsersRound  size={20} />} text="Asignación de Categorías a Campeonatos" to="/DetalleCampeonatoCategoria" />
        <SidebarItem icon={<HardHat  size={20} />} text="Asignación de Competidores a Categorías y Campeonatos" to="/DetalleCampeonatoCompetidorCategoria" />
        <SidebarItem icon={<Handshake  size={20} />} text="Gestión de Categorías y Competidores" to="/DetalleCategoriaCompetidor" />
        <SidebarItem icon={<LandPlot size={20} />} text="Gestión de Sanciones" to="/Sansion" />
        <SidebarItem icon={<ScanSearch  size={20} />} text="Resumen de Campeonatos" to="/ResumenCampeonatos" />
      </Sidebar>
      <main className="flex-1 p-4 ml-64">
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Form_login />} />
          <Route path="/avere" element={<Selogeounpapu />} />
          
          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/competidores" element={<CrudCompetidores /> } />
            <Route path="/register" element={<RegistrarForm /> } />
            <Route path="/usuario" element={<CrudUsuarios /> } />
            <Route path="/dojos" element={<CrudDojos /> } />
            <Route path="/campeonatos" element={<CrudCampeonatos /> } />
            <Route path="/categorias" element={<CrudCategorias /> } />
            <Route path="/DetalleCampeonatoCategoria" element={<CrudDetalleCampeonatoCategoria /> } />
            <Route path="/DetalleCampeonatoCompetidorCategoria" element={<CrudCampeonatoCompetidorCategoria /> } />
            <Route path="/DetalleCategoriaCompetidor" element={<CrudCategoriaCompetidor /> } />
            <Route path="/Sansion" element={<CrudSanciones /> } />
            <Route path="/ResumenCampeonatos" element={<ResumenCampeonatos /> } />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

// Componente Wrapper para el Router
export const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;

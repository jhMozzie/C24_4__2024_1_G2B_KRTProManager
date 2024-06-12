import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form_login } from './components/Usuarios/Form_login.tsx';
import { Selogeounpapu } from './components/Usuarios/Selogeounpapu.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { useAuthStore } from "./store/auth.ts";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { LayoutDashboard, StickyNote, Layers, Flag, Calendar, LifeBuoy, Settings, PersonStanding } from "lucide-react";
import { CrudCompetidores } from './pages/CrudCompetidores.tsx';
import { RegistrarForm } from './pages/RegistrarForm.tsx';
import { CrudUsuarios } from './pages/CrudUsuarios.tsx';
import { CrudDojos } from './pages/CrudDojos.tsx';
import { CrudCampeonatos } from './pages/CrudCampeonatos.tsx';
import { CrudCategorias } from './pages/CrudCategorias.tsx';
import { CrudDetalleCampeonatoCategoria } from './pages/CrudCampeonatoCategoria.tsx';
import { CrudCampeonatoCompetidorCategoria } from './pages/CrudCampeonatoCompetidorCategoria.tsx';
import { CrudCategoriaCompetidor } from './pages/CrudCategoriaCompetidor.tsx';

const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);

  if (location.pathname === '/login') {
    return <Form_login />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<PersonStanding size={20} />} text="Competidores" to="/competidores" />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" />
        <SidebarItem icon={<StickyNote size={20} />} text="Projects" to="/projects" />
        <SidebarItem icon={<Calendar size={20} />} text="Calendar" to="/calendar" />
        <SidebarItem icon={<Layers size={20} />} text="Tasks" to="/tasks" />
        <SidebarItem icon={<Flag size={20} />} text="Reporting" to="/reporting" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="/help" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Registrar" to="/register" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Usuarios" to="/usuario" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Dojos" to="/dojos" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Campeonatos" to="/campeonatos" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Categorias" to="/categorias" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Campeonato-Categoria" to="/DetalleCampeonatoCategoria" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Campeonato-Competidor-Categoria" to="/DetalleCampeonatoCompetidorCategoria" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Categoria-Competidor" to="/DetalleCategoriaCompetidor" />
      </Sidebar>
      <main className="flex-1 p-4">
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
          </Route>
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
          <Route path="/projects" element={<div>Projects Page</div>} />
          <Route path="/calendar" element={<div>Calendar Page</div>} />
          <Route path="/tasks" element={<div>Tasks Page</div>} />
          <Route path="/reporting" element={<div>Reporting Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
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

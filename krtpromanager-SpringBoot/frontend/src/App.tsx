import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LifeBuoy } from "lucide-react";
import { FormLogin } from "./pages/FormLogin";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { MyInfo } from "./pages/MyInfo";
import ListaCampeonatos from "./pages/ListaCampeonatos";
import { CrudCompetidores } from "./pages/CrudCompetidores";

const App = () => {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <FormLogin />;
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Informacion Personal"
          to="/my-info"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Campeonatos"
          to="/campeonatos"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Competidores"
          to="/competidores"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Categorias del Campeonato"
          to="/detallecampeonatocategoria"
        />
      </Sidebar>
      <main className="flex-1 p-4 ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/my-info" element={<MyInfo />} />
          <Route path="/campeonatos" element={<ListaCampeonatos />} />
          <Route path="/competidores" element={<CrudCompetidores />} />
        </Routes>
      </main>
    </div>
  );
};

export const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;

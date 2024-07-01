import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LifeBuoy } from "lucide-react";
import { FormLogin } from "./components/pages/FormLogin";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { MyInfo } from "./components/pages/MyInfo";

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
          text="Competidores"
          to="/competidores"
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Informacion Personal"
          to="/my-info"
        />
      </Sidebar>
      <main className="flex-1 p-4 ml-64">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/my-info" element={<MyInfo />} />
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

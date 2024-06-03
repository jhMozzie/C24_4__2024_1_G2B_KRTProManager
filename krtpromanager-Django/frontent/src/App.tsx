import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Form_login } from './components/Usuarios/Form_login.tsx';
import { Selogeounpapu } from './components/Usuarios/Selogeounpapu.tsx';
import { Navigation } from './components/Navigation.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { useAuthStore } from "./store/auth.ts";

const App = () => {
  const location = useLocation();
  const isAuth = useAuthStore(state => state.isAuth);

  return (
    <>
      {location.pathname !== '/login' && <Navigation />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Form_login />} />
        {/* Rutas sin protección */}
        <Route path="/avere" element={<Selogeounpapu />} />

        {/* Rutas con protección */}
        <Route element={<ProtectedRoute isAllowed={isAuth} />}>
          <Route path="/aver" element={<Selogeounpapu />} />
        </Route>
      </Routes>
    </>
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

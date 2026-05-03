import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { getRoles } from "../auth/Roles";
import Loader from "../components/atoms/Loader";

const ProtectedRoute = ({ children, role, unauthorizedOnly = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redirige a la pagina de inicio de sesion si no esta autenticado
  }

  const roles = getRoles(user);

  // solo permite entrar a /unauthorized si el usuario no tiene el rol requerido
  if (unauthorizedOnly) {
    if (roles.includes("ADMIN") || roles.includes("ANALISTA")) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  if (role && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // redirige a una pagina de acceso denegado si el usuario no tiene el rol requerido
  }

  return children;
};

export default ProtectedRoute;

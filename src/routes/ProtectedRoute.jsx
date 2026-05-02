import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { getRoles } from "../auth/Roles";
import Loader from "../components/atoms/Loader";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redirige a la pagina de inicio de sesion si no esta autenticado
  }

  const roles = getRoles(user);

  if (role && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // redirige a una pagina de acceso denegado si el usuario no tiene el rol requerido
  }

  return children;
};

export default ProtectedRoute;

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { getRoles } from "../auth/Roles";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) {
    return <h1>Cargnado...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redirige a la pagina de inicio de sesion si no está autenticado
  }

  const roles = getRoles(user);

  if (role && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // redirige a una pagina de acceso denegado si el usuario no tiene el rol requerido
  }

  return children;
};

export default ProtectedRoute;

// replace es para evitar que el usuario pueda volver a la pagina protegida
// usando el boton de atras del navegador despues de ser redirigido.

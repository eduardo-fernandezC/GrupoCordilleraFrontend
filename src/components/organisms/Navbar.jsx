import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { getRoles } from "../../auth/Roles";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  const roles = getRoles(user);
  const isAdmin = roles.includes("ADMIN");

  return (
    <nav>
      <Link to="/" className="">
        Grupo cordillera
      </Link>
      <Link to="/ventasHoy" className="">
        Ventas de Hoy
      </Link>
      <Link to="/ventasMes" className="">
        Ventas del Mes
      </Link>
      <Link to="/productos" className="">
        Productos
      </Link>
      {isAuthenticated && isAdmin && (
        <>
          <Link to="/ventasCrecimiento" className="">
            Crecimiento
          </Link>
          <Link to="/sucursal" className="">
            Sucursal
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

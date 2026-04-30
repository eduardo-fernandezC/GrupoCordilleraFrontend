import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { getRoles } from "../../auth/Roles";
import "../../styles/components/organisms/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();

  const roles = getRoles(user);
  const isAdmin = roles.includes("ADMIN"); // rutas de admin

  return (
    <nav className="site-navbar" aria-label="Navegación principal">
      <Link to="/" className="site-navbar__brand">
        <span className="site-navbar__brand-mark" aria-hidden="true">
          GC
        </span>
        <span>Grupo Cordillera</span>
      </Link>

      <div className="site-navbar__links">
        <Link to="/ventasHoy" className="site-navbar__link">
          Ventas de Hoy
        </Link>
        <Link to="/ventasMes" className="site-navbar__link">
          Ventas del Mes
        </Link>
        <Link to="/productos" className="site-navbar__link">
          Productos
        </Link>

        {isAuthenticated && isAdmin && (
          <>
            <Link
              to="/ventasCrecimiento"
              className="site-navbar__link site-navbar__link--accent"
            >
              Crecimiento
            </Link>
            <Link
              to="/sucursal"
              className="site-navbar__link site-navbar__link--accent"
            >
              Sucursal
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

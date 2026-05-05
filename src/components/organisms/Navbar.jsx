import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getRoles } from "../../auth/Roles";
import "../../styles/components/organisms/Navbar.css";
import LogoutButton from "../molecules/LogoutButton.jsx";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);

  const roles = getRoles(user);
  const isAdmin = roles.includes("ADMIN");

  const handleClick = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="site-navbar" aria-label="Navegación principal">
      <Link to="/" className="site-navbar__brand">
        <span className="site-navbar__brand-mark" aria-hidden="true">
          GC
        </span>
        <span>Grupo Cordillera</span>
      </Link>

      {/* menu escritorio */}
      <div className="site-navbar__links site-navbar__desktop">
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
            <Link
              to="/AdminProductos"
              className="site-navbar__link site-navbar__link--accent"
              onClick={handleClick}
            >
              Crud Productos
            </Link>
          </>
        )}

        <LogoutButton />
      </div>

      {/* boton hamburguesa */}
      <button
        type="button"
        className="site-navbar__toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* menu */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="site-navbar__backdrop"
            aria-label="Cerrar menu"
            onClick={handleClick}
          />

          <div className="site-navbar__mobile-panel" id="mobile-navigation">
            <div className="site-navbar__mobile-header">
              <span className="site-navbar__mobile-kicker">Navegacion</span>
              <span className="site-navbar__mobile-title">Menu</span>
            </div>

            <div className="site-navbar__mobile-links">
              <Link
                to="/ventasHoy"
                className="site-navbar__link"
                onClick={handleClick}
              >
                Ventas de Hoy
              </Link>

              <Link
                to="/ventasMes"
                className="site-navbar__link"
                onClick={handleClick}
              >
                Ventas del Mes
              </Link>

              <Link
                to="/productos"
                className="site-navbar__link"
                onClick={handleClick}
              >
                Productos
              </Link>

              {isAuthenticated && isAdmin && (
                <>
                  <Link
                    to="/ventasCrecimiento"
                    className="site-navbar__link site-navbar__link--accent"
                    onClick={handleClick}
                  >
                    Crecimiento
                  </Link>

                  <Link
                    to="/AdminProductos"
                    className="site-navbar__link site-navbar__link--accent"
                    onClick={handleClick}
                  >
                    Crud Productos
                  </Link>

                  <Link
                    to="/sucursal"
                    className="site-navbar__link site-navbar__link--accent"
                    onClick={handleClick}
                  >
                    Sucursal
                  </Link>
                </>
              )}
            </div>

            <div className="site-navbar__mobile-actions">
              <LogoutButton />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

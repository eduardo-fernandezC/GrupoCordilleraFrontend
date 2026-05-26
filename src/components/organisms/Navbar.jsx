import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Text from "../atoms/Text";
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
      <NavLink to="/" className="site-navbar__brand">
        <Text
          variant="span"
          className="site-navbar__brand-mark"
          aria-hidden="true"
        >
          GC
        </Text>
        <Text variant="span">Grupo Cordillera</Text>
      </NavLink>

      {/* menu escritorio */}
      <div className="site-navbar__links site-navbar__desktop">
        <NavLink
          to="/ventasHoy"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "site-navbar__link"
          }
        >
          Ventas de Hoy
        </NavLink>
        <NavLink
          to="/ventasMes"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "site-navbar__link"
          }
        >
          Ventas del Mes
        </NavLink>
        <NavLink
          to="/productos"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "site-navbar__link"
          }
        >
          Estadisticas Productos
        </NavLink>

        {isAuthenticated && isAdmin && (
          <>
            <NavLink
              to="/ventasCrecimiento"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "site-navbar__link site-navbar__link--accent"
              }
            >
              Crecimiento
            </NavLink>
            <NavLink
              to="/sucursal"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "site-navbar__link site-navbar__link--accent"
              }
            >
              Sucursal
            </NavLink>
            <NavLink
              to="/adminVentas"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "site-navbar__link site-navbar__link--accent"
              }
            >
              Reporte de Ventas
            </NavLink>
            <NavLink
              to="/adminProductos"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "site-navbar__link site-navbar__link--accent"
              }
              onClick={handleClick}
            >
              Productos
            </NavLink>
            <NavLink
              to="/adminUsuarios"
              className={({ isActive }) =>
                isActive
                  ? "nav-link active"
                  : "site-navbar__link site-navbar__link--accent"
              }
              onClick={handleClick}
            >
              Usuarios
            </NavLink>
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
              <Text variant="span" className="site-navbar__mobile-kicker">
                Navegacion
              </Text>
              <Text variant="span" className="site-navbar__mobile-title">
                Menu
              </Text>
            </div>

            <div className="site-navbar__mobile-links">
              <NavLink
                to="/ventasHoy"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "site-navbar__link"
                }
                onClick={handleClick}
              >
                Ventas de Hoy
              </NavLink>

              <NavLink
                to="/ventasMes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "site-navbar__link"
                }
                onClick={handleClick}
              >
                Ventas del Mes
              </NavLink>

              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "site-navbar__link"
                }
                onClick={handleClick}
              >
                Estadisticas Productos
              </NavLink>

              {isAuthenticated && isAdmin && (
                <>
                  <NavLink
                    to="/ventasCrecimiento"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "site-navbar__link site-navbar__link--accent"
                    }
                    onClick={handleClick}
                  >
                    Crecimiento
                  </NavLink>

                  <NavLink
                    to="/adminVentas"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "site-navbar__link site-navbar__link--accent"
                    }
                    onClick={handleClick}
                  >
                    Reporte de Ventas
                  </NavLink>

                  <NavLink
                    to="/AdminProductos"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "site-navbar__link site-navbar__link--accent"
                    }
                    onClick={handleClick}
                  >
                    Productos
                  </NavLink>

                  <NavLink
                    to="/sucursal"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "site-navbar__link site-navbar__link--accent"
                    }
                    onClick={handleClick}
                  >
                    Sucursal
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "site-navbar__link site-navbar__link--accent"
                    }
                    onClick={handleClick}
                  >
                    Usuarios
                  </NavLink>
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
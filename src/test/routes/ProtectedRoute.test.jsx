import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

const mocks = vi.hoisted(() => ({
  auth0State: {
    isAuthenticated: false,
    user: {},
    isLoading: false,
  },
  roles: [],
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => mocks.auth0State,
}));

vi.mock("../../auth/Roles", () => ({
  getRoles: () => mocks.roles,
}));

import ProtectedRoute from "../../routes/ProtectedRoute";

const renderProtectedRoute = (props = {}) => {
  return render(
    <MemoryRouter initialEntries={["/ruta-protegida"]}>
      <Routes>
        <Route path="/" element={<p>Página de login</p>} />

        <Route path="/unauthorized" element={<p>Página no autorizada</p>} />

        <Route
          path="/ruta-protegida"
          element={
            <ProtectedRoute {...props}>
              <p>Contenido protegido</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mocks.auth0State = {
      isAuthenticated: false,
      user: {},
      isLoading: false,
    };

    mocks.roles = [];
  });

  it("muestra el loader cuando Auth0 está cargando", () => {
    mocks.auth0State = {
      isAuthenticated: false,
      user: {},
      isLoading: true,
    };

    renderProtectedRoute();

    expect(
      screen.getByRole("status", {
        name: "Cargando contenido",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("redirige al login cuando el usuario no está autenticado", () => {
    mocks.auth0State = {
      isAuthenticated: false,
      user: {},
      isLoading: false,
    };

    renderProtectedRoute();

    expect(screen.getByText("Página de login")).toBeInTheDocument();

    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });

  it("muestra el contenido cuando el usuario está autenticado y no se requiere rol", () => {
    mocks.auth0State = {
      isAuthenticated: true,
      user: { name: "Usuario Test" },
      isLoading: false,
    };

    renderProtectedRoute();

    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });

  it("muestra el contenido cuando el usuario tiene el rol requerido", () => {
    mocks.auth0State = {
      isAuthenticated: true,
      user: { name: "Admin Test" },
      isLoading: false,
    };

    mocks.roles = ["ADMIN"];

    renderProtectedRoute({ role: "ADMIN" });

    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });

  it("redirige a unauthorized cuando el usuario no tiene el rol requerido", () => {
    mocks.auth0State = {
      isAuthenticated: true,
      user: { name: "Analista Test" },
      isLoading: false,
    };

    mocks.roles = ["ANALISTA"];

    renderProtectedRoute({ role: "ADMIN" });

    expect(screen.getByText("Página no autorizada")).toBeInTheDocument();

    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });

  it("permite ver la ruta unauthorizedOnly cuando el usuario no tiene ADMIN ni ANALISTA", () => {
    mocks.auth0State = {
      isAuthenticated: true,
      user: { name: "Usuario sin rol" },
      isLoading: false,
    };

    mocks.roles = [];

    renderProtectedRoute({ unauthorizedOnly: true });

    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });

  it("redirige al login cuando unauthorizedOnly es true y el usuario tiene rol permitido", () => {
    mocks.auth0State = {
      isAuthenticated: true,
      user: { name: "Admin Test" },
      isLoading: false,
    };

    mocks.roles = ["ADMIN"];

    renderProtectedRoute({ unauthorizedOnly: true });

    expect(screen.getByText("Página de login")).toBeInTheDocument();

    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });
});

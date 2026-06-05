import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../../../components/organisms/Navbar";

const authMock = vi.fn();

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => authMock(),
}));

vi.mock("../../../auth/Roles", () => ({
  getRoles: vi.fn(),
}));

vi.mock("../../../components/molecules/LogoutButton", () => ({
  default: () => <button>Cerrar Sesión</button>,
}));

import { getRoles } from "../../../auth/Roles";

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza enlaces básicos", () => {
    authMock.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    getRoles.mockReturnValue([]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Grupo Cordillera")).toBeInTheDocument();
    expect(screen.getByText("Ventas de Hoy")).toBeInTheDocument();
    expect(screen.getByText("Ventas del Mes")).toBeInTheDocument();
    expect(screen.getByText("Estadisticas Productos")).toBeInTheDocument();
  });

  it("muestra opciones admin", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Crecimiento")).toBeInTheDocument();
    expect(screen.getByText("Sucursal")).toBeInTheDocument();
    expect(screen.getByText("Reportes")).toBeInTheDocument();
    expect(screen.getAllByText("Usuarios")[0]).toBeInTheDocument();
  });

  it("no muestra opciones admin para usuario normal", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "user" },
    });

    getRoles.mockReturnValue(["USER"]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText("Crecimiento")).not.toBeInTheDocument();
    expect(screen.queryByText("Sucursal")).not.toBeInTheDocument();
    expect(screen.queryByText("Reportes")).not.toBeInTheDocument();
  });

  it("abre menú móvil", () => {
    authMock.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    getRoles.mockReturnValue([]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("cierra menú móvil", () => {
    authMock.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    getRoles.mockReturnValue([]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const closeButtons = screen.getAllByLabelText("Cerrar menu");

    fireEvent.click(closeButtons[0]);

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });
});
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

const renderNavbar = (route = "/") => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Navbar />
    </MemoryRouter>,
  );
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    authMock.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    getRoles.mockReturnValue([]);
  });

  it("renderiza enlaces básicos", () => {
    renderNavbar();

    expect(screen.getByText("Grupo Cordillera")).toBeInTheDocument();
    expect(screen.getByText("Ventas de Hoy")).toBeInTheDocument();
    expect(screen.getByText("Ventas del Mes")).toBeInTheDocument();
    expect(screen.getByText("Estadisticas Productos")).toBeInTheDocument();
  });

  it("muestra opciones admin cuando está autenticado y tiene rol ADMIN", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar();

    expect(screen.getByText("Crecimiento")).toBeInTheDocument();
    expect(screen.getByText("Sucursal")).toBeInTheDocument();
    expect(screen.getByText("Reporte de Ventas")).toBeInTheDocument();
    expect(screen.getByText("Reportes")).toBeInTheDocument();
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
  });

  it("no muestra opciones admin para usuario normal", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "user" },
    });

    getRoles.mockReturnValue(["USER"]);

    renderNavbar();

    expect(screen.queryByText("Crecimiento")).not.toBeInTheDocument();
    expect(screen.queryByText("Sucursal")).not.toBeInTheDocument();
    expect(screen.queryByText("Reportes")).not.toBeInTheDocument();
    expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
  });

  it("no muestra opciones admin si no está autenticado aunque tenga rol ADMIN", () => {
    authMock.mockReturnValue({
      isAuthenticated: false,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar();

    expect(screen.queryByText("Crecimiento")).not.toBeInTheDocument();
    expect(screen.queryByText("Sucursal")).not.toBeInTheDocument();
    expect(screen.queryByText("Reportes")).not.toBeInTheDocument();
    expect(screen.queryByText("Usuarios")).not.toBeInTheDocument();
  });

  it("marca como activo un enlace básico de escritorio", () => {
    renderNavbar("/ventasHoy");

    const ventasHoyLink = screen.getByRole("link", {
      name: "Ventas de Hoy",
    });

    expect(ventasHoyLink).toHaveClass("nav-link");
    expect(ventasHoyLink).toHaveClass("active");
  });

  it("marca como activo otro enlace básico de escritorio", () => {
    renderNavbar("/ventasMes");

    const ventasMesLink = screen.getByRole("link", {
      name: "Ventas del Mes",
    });

    expect(ventasMesLink).toHaveClass("nav-link");
    expect(ventasMesLink).toHaveClass("active");
  });

  it("marca como activo un enlace admin de escritorio", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar("/adminVentas");

    const reporteVentasLink = screen.getByRole("link", {
      name: "Reporte de Ventas",
    });

    expect(reporteVentasLink).toHaveClass("nav-link");
    expect(reporteVentasLink).toHaveClass("active");
  });

  it("abre menú móvil", () => {
    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("Navegacion")).toBeInTheDocument();
  });

  it("cierra menú móvil desde el botón hamburguesa", () => {
    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const closeButtons = screen.getAllByLabelText("Cerrar menu");

    fireEvent.click(closeButtons[0]);

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("cierra menú móvil desde el backdrop", () => {
    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const closeButtons = screen.getAllByLabelText("Cerrar menu");

    fireEvent.click(closeButtons[1]);

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("cierra el menú móvil al hacer click en un enlace básico", () => {
    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const ventasMesLinks = screen.getAllByRole("link", {
      name: "Ventas del Mes",
    });

    fireEvent.click(ventasMesLinks[1]);

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("muestra opciones admin en el menú móvil", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    expect(screen.getAllByText("Reportes")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Crecimiento")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Reporte de Ventas")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Productos")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Sucursal")[1]).toBeInTheDocument();
    expect(screen.getAllByText("Usuarios")[1]).toBeInTheDocument();
  });

  it("cierra el menú móvil al hacer click en un enlace admin", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar();

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const reportesLinks = screen.getAllByRole("link", {
      name: "Reportes",
    });

    fireEvent.click(reportesLinks[1]);

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });

  it("marca como activo un enlace admin en móvil", () => {
    authMock.mockReturnValue({
      isAuthenticated: true,
      user: { name: "admin" },
    });

    getRoles.mockReturnValue(["ADMIN"]);

    renderNavbar("/adminReportes");

    fireEvent.click(screen.getByLabelText("Abrir menu"));

    const reportesLinks = screen.getAllByRole("link", {
      name: "Reportes",
    });

    expect(reportesLinks[1]).toHaveClass("nav-link");
    expect(reportesLinks[1]).toHaveClass("active");
  });
});

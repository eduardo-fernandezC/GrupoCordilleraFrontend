import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("../../routes/ProtectedRoute", () => ({
  default: ({ children, role, unauthorizedOnly }) => (
    <div
      data-testid="protected-route"
      data-role={role ?? ""}
      data-unauthorized-only={unauthorizedOnly ? "true" : "false"}
    >
      {children}
    </div>
  ),
}));

vi.mock("../../pages/Login", () => ({
  default: () => <p>Página Login</p>,
}));

vi.mock("../../pages/Unauthorized", () => ({
  default: () => <p>Página Unauthorized</p>,
}));

vi.mock("../../pages/VentasHoyPage", () => ({
  default: () => <p>Página Ventas Hoy</p>,
}));

vi.mock("../../pages/VentasMesPage", () => ({
  default: () => <p>Página Ventas Mes</p>,
}));

vi.mock("../../pages/ProductosPage", () => ({
  default: () => <p>Página Productos</p>,
}));

vi.mock("../../pages/VentasCrecimientoPage", () => ({
  default: () => <p>Página Ventas Crecimiento</p>,
}));

vi.mock("../../pages/SucursalPage", () => ({
  default: () => <p>Página Sucursal</p>,
}));

vi.mock("../../pages/admin/Admin", () => ({
  default: () => <p>Página Admin</p>,
}));

vi.mock("../../pages/admin/SalesReportPage", () => ({
  default: () => <p>Página Admin Ventas</p>,
}));

vi.mock("../../pages/admin/AdminProductsPage", () => ({
  default: () => <p>Página Admin Productos</p>,
}));

vi.mock("../../pages/admin/AdminUsersPage", () => ({
  default: () => <p>Página Admin Usuarios</p>,
}));

vi.mock("../../pages/Analyst", () => ({
  default: () => <p>Página Analista</p>,
}));

vi.mock("../../pages/admin/ReportesPage", () => ({
  default: () => <p>Página Admin Reportes</p>,
}));

vi.mock("../../pages/NotFound", () => ({
  default: () => <p>Página No Encontrada</p>,
}));

import AppRoutes from "../../app/AppRoutes";

const renderRoute = (path) => {
  window.history.pushState({}, "", path);

  return render(<AppRoutes />);
};

describe("AppRoutes", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renderiza la página de login en la ruta principal", () => {
    renderRoute("/");

    expect(screen.getByText("Página Login")).toBeInTheDocument();
  });

  it("renderiza una ruta protegida sin rol requerido", () => {
    renderRoute("/ventasHoy");

    expect(screen.getByText("Página Ventas Hoy")).toBeInTheDocument();

    expect(screen.getByTestId("protected-route")).toHaveAttribute(
      "data-role",
      "",
    );
  });

  it("renderiza una ruta protegida con rol ADMIN", () => {
    renderRoute("/admin");

    expect(screen.getByText("Página Admin")).toBeInTheDocument();

    expect(screen.getByTestId("protected-route")).toHaveAttribute(
      "data-role",
      "ADMIN",
    );
  });

  it("renderiza una ruta protegida con rol ANALISTA", () => {
    renderRoute("/analista");

    expect(screen.getByText("Página Analista")).toBeInTheDocument();

    expect(screen.getByTestId("protected-route")).toHaveAttribute(
      "data-role",
      "ANALISTA",
    );
  });

  it("renderiza la ruta unauthorized como ruta solo para no autorizados", () => {
    renderRoute("/unauthorized");

    expect(screen.getByText("Página Unauthorized")).toBeInTheDocument();

    expect(screen.getByTestId("protected-route")).toHaveAttribute(
      "data-unauthorized-only",
      "true",
    );
  });

  it("renderiza la página de reportes del admin", () => {
    renderRoute("/adminReportes");

    expect(screen.getByText("Página Admin Reportes")).toBeInTheDocument();

    expect(screen.getByTestId("protected-route")).toHaveAttribute(
      "data-role",
      "ADMIN",
    );
  });

  it("renderiza NotFound cuando la ruta no existe", () => {
    renderRoute("/ruta-que-no-existe");

    expect(screen.getByText("Página No Encontrada")).toBeInTheDocument();
  });
});

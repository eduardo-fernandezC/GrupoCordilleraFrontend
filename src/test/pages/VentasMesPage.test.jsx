import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import VentasMesPage from "../../pages/VentasMesPage";
import useDashboardData from "../../hooks/useDashboardData";

vi.mock("../../hooks/useDashboardData");

vi.mock("../../components/templates/LandingTemplate", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../../components/molecules/DashboardHeader", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

vi.mock("../../components/atoms/StatCard", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

vi.mock("../../components/organisms/SalesChart", () => ({
  default: () => <div>SalesChart</div>,
}));

vi.mock("../../components/atoms/Loader", () => ({
  default: () => <div>Loader</div>,
}));

vi.mock("../../components/atoms/ErrorMessage", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

describe("VentasMesPage", () => {
  it("muestra loader", () => {
    useDashboardData.mockReturnValue({
      data: null,
      loading: true,
      error: "",
    });

    render(<VentasMesPage />);

    expect(screen.getByText("Loader")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useDashboardData.mockReturnValue({
      data: null,
      loading: false,
      error: "error",
    });

    render(<VentasMesPage />);

    expect(
      screen.getByText(
        "Error al cargar Dashboard de Ventas del Mes"
      )
    ).toBeInTheDocument();
  });

  it("muestra dashboard", () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: "",
      data: {
        ventasHoy: 100,
        ventasMes: 500,
        cantidadVentasMes: 10,
        promedioVentasMes: 50,
      },
    });

    render(<VentasMesPage />);

    expect(
      screen.getByText("Ventas del Mes")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Ventas Totales Mes")
    ).toBeInTheDocument();
  });
});
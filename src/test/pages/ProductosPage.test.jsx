import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ProductosPage from "../../pages/ProductosPage";
import useDashboardData from "../../hooks/useDashboardData";

vi.mock("../../hooks/useDashboardData");

vi.mock("../../components/templates/LandingTemplate", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../../components/molecules/DashboardHeader", () => ({
  default: ({ title }) => <div>{title}</div>,
}));

vi.mock("../../components/organisms/ProductChart", () => ({
  default: () => <div>ProductChart</div>,
}));

vi.mock("../../components/atoms/Loader", () => ({
  default: () => <div>Loader</div>,
}));

vi.mock("../../components/atoms/ErrorMessage", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

describe("ProductosPage", () => {
  it("muestra loader", () => {
    useDashboardData.mockReturnValue({
      data: null,
      loading: true,
      error: "",
    });

    render(<ProductosPage />);

    expect(screen.getByText("Loader")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useDashboardData.mockReturnValue({
      data: null,
      loading: false,
      error: "error",
    });

    render(<ProductosPage />);

    expect(
      screen.getByText(
        "Error al cargar Dashboard de Estadisticas Productos"
      )
    ).toBeInTheDocument();
  });

  it("muestra dashboard", () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: "",
      data: {
        productoMasVendido: "Laptop",
        productoMenosVendido: "Mouse",
      },
    });

    render(<ProductosPage />);

    expect(
      screen.getByText("Estadisticas Productos")
    ).toBeInTheDocument();

    expect(
      screen.getByText("ProductChart")
    ).toBeInTheDocument();
  });
});
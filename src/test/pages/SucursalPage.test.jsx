import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import SucursalPage from "../../pages/SucursalPage";
import useDashboardData from "../../hooks/useDashboardData";

vi.mock("../../hooks/useDashboardData");

describe("SucursalPage", () => {
  it("muestra loader", () => {
    useDashboardData.mockReturnValue({
      loading: true,
      error: "",
      data: null,
    });

    render(
      <MemoryRouter>
        <SucursalPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: "error",
      data: null,
    });

    render(
      <MemoryRouter>
        <SucursalPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Error al cargar Dashboard/i)
    ).toBeInTheDocument();
  });

  it("renderiza sucursales", () => {
    useDashboardData.mockReturnValue({
      loading: false,
      error: "",
      data: {
        mejorVendedorPorSucursal: [
          {
            sucursal: "Santiago",
            vendedor: "Juan",
          },
        ],
      },
    });

    render(
      <MemoryRouter>
        <SucursalPage />
      </MemoryRouter>
    );

    expect(
      screen.getAllByText(/Sucursales/i)[0]
    ).toBeInTheDocument();
  });
});
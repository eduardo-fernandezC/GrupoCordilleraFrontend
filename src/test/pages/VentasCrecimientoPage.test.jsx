import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import VentasCrecimientoPage from "../../pages/VentasCrecimientoPage";
import useDashboardData from "../../hooks/useDashboardData";

vi.mock("../../hooks/useDashboardData");

describe("VentasCrecimientoPage", () => {
  it("muestra loader", () => {
    useDashboardData.mockReturnValue({
      data: {},
      loading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <VentasCrecimientoPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useDashboardData.mockReturnValue({
      data: {},
      loading: false,
      error: "Error",
    });

    render(
      <MemoryRouter>
        <VentasCrecimientoPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renderiza crecimiento", () => {
    useDashboardData.mockReturnValue({
      data: {
        crecimientoVentas: 15,
      },
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <VentasCrecimientoPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Crecimiento de Ventas")
    ).toBeInTheDocument();

    expect(
      screen.getByText("15%")
    ).toBeInTheDocument();
  });
});
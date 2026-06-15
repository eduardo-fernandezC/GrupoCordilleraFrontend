import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import SalesReportPage from "../../../pages/admin/SalesReportPage";
import useSalesReport from "../../../hooks/useSalesReport";

vi.mock("../../../hooks/useSalesReport");

describe("SalesReportPage", () => {
  it("muestra loader", () => {
    useSalesReport.mockReturnValue({
      loading: true,
    });

    render(
      <MemoryRouter>
        <SalesReportPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useSalesReport.mockReturnValue({
      loading: false,
      error: "Error",
    });

    render(
      <MemoryRouter>
        <SalesReportPage />
      </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renderiza reporte", () => {
    useSalesReport.mockReturnValue({
      ventas: [],
      selectedVentaId: null,
      loading: false,
      error: null,
      handleSelectVenta: vi.fn(),
    });

    render(
      <MemoryRouter>
        <SalesReportPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Reporte de Ventas")
    ).toBeInTheDocument();
  });
});
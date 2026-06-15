import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SalesReportList from "../../../components/organisms/SalesReportList";

vi.mock("../../../services/salesReportService", () => ({
  formatCurrency: (value) => `$${value}`,
}));

describe("SalesReportList Component", () => {
  const ventas = [
    {
      idVenta: 1,
      fecha: "2026-01-01",
      total: 50000,
      sucursal: {
        nombre: "Santiago",
      },
      empleado: {
        nombre: "Rocio",
      },
    },
  ];

  it("renderiza la venta", () => {
    render(
      <SalesReportList
        ventas={ventas}
        selectedVentaId={null}
        onSelectVenta={() => {}}
      />
    );

    expect(
      screen.getByText("Venta #1")
    ).toBeInTheDocument();
  });

  it("renderiza la fecha", () => {
    render(
      <SalesReportList
        ventas={ventas}
        selectedVentaId={null}
        onSelectVenta={() => {}}
      />
    );

    expect(
      screen.getByText("Fecha: 2026-01-01")
    ).toBeInTheDocument();
  });

  it("ejecuta onSelectVenta", () => {
    const onSelectVenta = vi.fn();

    render(
      <SalesReportList
        ventas={ventas}
        selectedVentaId={null}
        onSelectVenta={onSelectVenta}
      />
    );

    fireEvent.click(
      screen.getByText("Ver detalle")
    );

    expect(onSelectVenta).toHaveBeenCalledWith(1);
  });

  it("muestra detalle cuando está seleccionada", () => {
    render(
      <SalesReportList
        ventas={ventas}
        selectedVentaId={1}
        onSelectVenta={() => {}}
      />
    );

    expect(
      screen.getByText("Sucursal: Santiago")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Empleado: Rocio")
    ).toBeInTheDocument();
  });

  it("muestra botón ocultar detalle cuando está seleccionada", () => {
    render(
      <SalesReportList
        ventas={ventas}
        selectedVentaId={1}
        onSelectVenta={() => {}}
      />
    );

    expect(
      screen.getByText("Ocultar detalle")
    ).toBeInTheDocument();
  });
});
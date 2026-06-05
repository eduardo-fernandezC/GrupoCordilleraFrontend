import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    getAccessTokenSilently: vi.fn().mockResolvedValue("token"),
  }),
}));

vi.mock("../../services/salesReportService", () => ({
  getVentas: vi.fn().mockResolvedValue([
    {
      idVenta: 1,
      total: 1000,
    },
  ]),
  buildVentasReport: vi.fn().mockReturnValue([
    {
      idVenta: 1,
      total: 1000,
    },
  ]),
}));

import useSalesReport from "../../hooks/useSalesReport";

describe("useSalesReport", () => {
  it("carga ventas correctamente", async () => {
    const { result } = renderHook(() =>
      useSalesReport()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.ventas).toHaveLength(1);
    expect(result.current.error).toBe("");
  });

  it("inicia sin venta seleccionada", async () => {
    const { result } = renderHook(() =>
      useSalesReport()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.selectedVenta).toBeNull();
    expect(result.current.selectedVentaId).toBeNull();
  });
});
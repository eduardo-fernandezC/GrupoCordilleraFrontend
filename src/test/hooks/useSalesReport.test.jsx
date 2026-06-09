import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const {
  auth0Mock,
  getAccessTokenSilentlyMock,
  getVentasMock,
  buildVentasReportMock,
} = vi.hoisted(() => ({
  auth0Mock: vi.fn(),
  getAccessTokenSilentlyMock: vi.fn(),
  getVentasMock: vi.fn(),
  buildVentasReportMock: vi.fn(),
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: auth0Mock,
}));

vi.mock("../../services/salesReportService", () => ({
  getVentas: getVentasMock,
  buildVentasReport: buildVentasReportMock,
}));

vi.mock("../../auth/authConfig", () => ({
  auth0Config: {
    audience: "test-audience",
  },
}));

import useSalesReport from "../../hooks/useSalesReport";

describe("useSalesReport", () => {
  const venta = {
    idVenta: 1,
    total: 1000,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    getAccessTokenSilentlyMock.mockResolvedValue("token");

    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    getVentasMock.mockResolvedValue([venta]);

    buildVentasReportMock.mockImplementation((ventas) => ventas);
  });

  it("carga ventas correctamente", async () => {
    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(getAccessTokenSilentlyMock).toHaveBeenCalled();
    expect(getVentasMock).toHaveBeenCalledWith("token");

    expect(result.current.ventas).toEqual([venta]);
    expect(result.current.error).toBe("");
  });

  it("inicia sin venta seleccionada", async () => {
    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.selectedVenta).toBeNull();
    expect(result.current.selectedVentaId).toBeNull();
  });

  it("selecciona y deselecciona una venta", async () => {
    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => {
      result.current.handleSelectVenta(1);
    });

    expect(result.current.selectedVentaId).toBe(1);
    expect(result.current.selectedVenta).toEqual(venta);

    act(() => {
      result.current.handleSelectVenta(1);
    });

    expect(result.current.selectedVentaId).toBeNull();
    expect(result.current.selectedVenta).toBeNull();
  });

  it("no carga ventas mientras Auth0 sigue cargando", () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    const { result } = renderHook(() => useSalesReport());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
    expect(result.current.ventas).toEqual([]);

    expect(getAccessTokenSilentlyMock).not.toHaveBeenCalled();
    expect(getVentasMock).not.toHaveBeenCalled();
  });

  it("muestra error si el usuario no está autenticado", async () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(
      "Debes iniciar sesion para ver las ventas",
    );

    expect(result.current.ventas).toEqual([]);
    expect(getAccessTokenSilentlyMock).not.toHaveBeenCalled();
    expect(getVentasMock).not.toHaveBeenCalled();
  });

  it("usa arreglo vacío si la respuesta de ventas no es un array", async () => {
    getVentasMock.mockResolvedValue({
      mensaje: "respuesta inválida",
    });

    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.ventas).toEqual([]);
    expect(result.current.selectedVenta).toBeNull();
    expect(result.current.selectedVentaId).toBeNull();
  });

  it("muestra error desde response.data.message", async () => {
    getVentasMock.mockRejectedValue({
      response: {
        data: {
          message: "Error cargando ventas",
        },
      },
    });

    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error cargando ventas");
  });

  it("muestra error desde exception.message", async () => {
    getVentasMock.mockRejectedValue(new Error("Error desde exception.message"));

    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error desde exception.message");
  });

  it("muestra error genérico si no viene mensaje", async () => {
    getVentasMock.mockRejectedValue(null);

    const { result } = renderHook(() => useSalesReport());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("No fue posible cargar las ventas");
  });

  it("no actualiza estado si el hook se desmonta antes de terminar la carga", async () => {
    let resolveVentas;

    getVentasMock.mockReturnValue(
      new Promise((resolve) => {
        resolveVentas = resolve;
      }),
    );

    const { unmount } = renderHook(() => useSalesReport());

    await waitFor(() => expect(getVentasMock).toHaveBeenCalled());

    unmount();

    await act(async () => {
      resolveVentas([venta]);
      await Promise.resolve();
    });

    expect(getVentasMock).toHaveBeenCalled();
  });
});

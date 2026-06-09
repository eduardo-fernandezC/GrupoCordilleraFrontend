import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { auth0Mock, getAccessTokenSilentlyMock, getDashboardDataMock } =
  vi.hoisted(() => ({
    auth0Mock: vi.fn(),
    getAccessTokenSilentlyMock: vi.fn(),
    getDashboardDataMock: vi.fn(),
  }));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: auth0Mock,
}));

vi.mock("../../services/DashboardService", () => ({
  getDashboardData: getDashboardDataMock,
}));

vi.mock("../../auth/authConfig", () => ({
  auth0Config: {
    audience: "test-audience",
  },
}));

import useDashboardData from "../../hooks/useDashboardData";

describe("useDashboardData", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    getAccessTokenSilentlyMock.mockResolvedValue("token");

    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    getDashboardDataMock.mockResolvedValue({
      ventasHoy: 100,
      ventasMes: 500,
    });
  });

  it("carga dashboard correctamente", async () => {
    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(getAccessTokenSilentlyMock).toHaveBeenCalled();
    expect(getDashboardDataMock).toHaveBeenCalledWith("token");

    expect(result.current.data).toEqual({
      ventasHoy: 100,
      ventasMes: 500,
    });

    expect(result.current.error).toBe("");
  });

  it("no carga datos mientras Auth0 sigue cargando", () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    const { result } = renderHook(() => useDashboardData());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("");

    expect(getAccessTokenSilentlyMock).not.toHaveBeenCalled();
    expect(getDashboardDataMock).not.toHaveBeenCalled();
  });

  it("muestra error si el usuario no está autenticado", async () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: getAccessTokenSilentlyMock,
    });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe(
      "Debes iniciar sesion para ver el dashboard",
    );

    expect(result.current.data).toBeNull();
    expect(getAccessTokenSilentlyMock).not.toHaveBeenCalled();
    expect(getDashboardDataMock).not.toHaveBeenCalled();
  });

  it("muestra error desde response.data.message", async () => {
    getDashboardDataMock.mockRejectedValue({
      response: {
        data: {
          message: "Error desde message",
        },
      },
    });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error desde message");
  });

  it("muestra error desde response.data.error", async () => {
    getDashboardDataMock.mockRejectedValue({
      response: {
        data: {
          error: "Error desde data.error",
        },
      },
    });

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error desde data.error");
  });

  it("muestra error desde exception.message", async () => {
    getDashboardDataMock.mockRejectedValue(
      new Error("Error desde exception.message"),
    );

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error desde exception.message");
  });

  it("muestra error genérico si no viene mensaje", async () => {
    getDashboardDataMock.mockRejectedValue(null);

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error cargando dashboard");
  });
});

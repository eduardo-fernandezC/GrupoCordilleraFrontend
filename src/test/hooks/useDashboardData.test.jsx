import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    getAccessTokenSilently: vi.fn().mockResolvedValue("token"),
  }),
}));

vi.mock("../../services/DashboardService", () => ({
  getDashboardData: vi.fn().mockResolvedValue({
    ventasHoy: 100,
    ventasMes: 500,
  }),
}));

import useDashboardData from "../../hooks/useDashboardData";

describe("useDashboardData", () => {
  it("carga dashboard correctamente", async () => {
    const { result } = renderHook(() =>
      useDashboardData()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.data).toEqual({
      ventasHoy: 100,
      ventasMes: 500,
    });

    expect(result.current.error).toBe("");
  });
});
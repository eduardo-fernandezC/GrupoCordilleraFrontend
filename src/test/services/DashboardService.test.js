const dashboardApiMock = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("../../services/api/DashboardApi", () => ({
  default: dashboardApiMock,
}));

import DashboardApi from "../../services/api/DashboardApi";
import { getDashboardData } from "../../services/DashboardService";

describe("DashboardService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_DASHBOARD_ENDPOINT", "/dashboard");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("obtiene los datos del dashboard con token", async () => {
    const dashboardData = {
      ventasTotales: 100000,
      cantidadVentas: 5,
    };

    DashboardApi.get.mockResolvedValue({
      data: dashboardData,
    });

    const result = await getDashboardData("token-test");

    expect(DashboardApi.get).toHaveBeenCalledWith("/dashboard", {
      headers: {
        Authorization: "Bearer token-test",
      },
    });

    expect(result).toEqual(dashboardData);
  });
});

const axiosMock = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("axios", () => ({
  default: axiosMock,
}));

describe("DashboardApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.stubEnv("VITE_DASHBOARD_URL", "http://localhost:3002/dashboard");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("crea una instancia de axios con la URL del dashboard y headers JSON", async () => {
    const dashboardApiInstance = {
      get: vi.fn(),
    };

    axiosMock.create.mockReturnValue(dashboardApiInstance);

    const { default: DashboardApi } =
      await import("../../../services/api/DashboardApi");

    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3002/dashboard",
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(DashboardApi).toBe(dashboardApiInstance);
  });
});

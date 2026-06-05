const axiosMock = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("axios", () => ({
  default: axiosMock,
}));

describe("AuthApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.stubEnv("VITE_AUTH_URL", "http://localhost:3001/auth");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("crea una instancia de axios con la URL de autenticación", async () => {
    const authApiInstance = {
      get: vi.fn(),
    };

    axiosMock.create.mockReturnValue(authApiInstance);

    const { default: AuthApi } = await import("../../../services/api/AuthApi");

    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3001/auth",
    });

    expect(AuthApi).toBe(authApiInstance);
  });
});

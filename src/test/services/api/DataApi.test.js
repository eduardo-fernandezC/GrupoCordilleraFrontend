const axiosMock = vi.hoisted(() => ({
  create: vi.fn(),
}));

vi.mock("axios", () => ({
  default: axiosMock,
}));

describe("DataApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.stubEnv("VITE_DATA_URL", "http://localhost:3003/data");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("crea una instancia de axios con la URL de datos", async () => {
    const dataApiInstance = {
      get: vi.fn(),
    };

    axiosMock.create.mockReturnValue(dataApiInstance);

    const { default: DataApi } = await import("../../../services/api/DataApi");

    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3003/data",
    });

    expect(DataApi).toBe(dataApiInstance);
  });
});

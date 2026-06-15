import { vi } from "vitest";

const importAuthConfig = async () => {
  vi.resetModules();

  vi.stubEnv("VITE_DOMAIN", "dev-test.auth0.com");
  vi.stubEnv("VITE_CLIENT_ID", "client-id-test");
  vi.stubEnv("VITE_AUDIENCE", "https://api.test");
  vi.stubEnv("VITE_SCOPE", "openid profile email");

  return import("../../auth/authConfig");
};

describe("auth0Config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("obtiene la configuración desde las variables de entorno", async () => {
    const { auth0Config } = await importAuthConfig();

    expect(auth0Config).toEqual({
      domain: "dev-test.auth0.com",
      clientId: "client-id-test",
      audience: "https://api.test",
      scope: "openid profile email",
    });
  });
});

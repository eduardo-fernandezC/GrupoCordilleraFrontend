import { vi } from "vitest";

const importRoles = async () => {
  vi.resetModules();

  vi.stubEnv("VITE_AUDIENCE", "https://api.test");
  vi.stubEnv("VITE_ROLES_ENDPOINT", "/roles");

  return import("../../auth/Roles");
};

describe("getRoles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("obtiene los roles del usuario", async () => {
    const { getRoles } = await importRoles();

    const user = {
      "https://api.test/roles": ["ADMIN", "ANALISTA"],
    };

    const result = getRoles(user);

    expect(result).toEqual(["ADMIN", "ANALISTA"]);
  });

  it("retorna arreglo vacío si el usuario no existe", async () => {
    const { getRoles } = await importRoles();

    const result = getRoles(undefined);

    expect(result).toEqual([]);
  });

  it("retorna arreglo vacío si el usuario no tiene roles", async () => {
    const { getRoles } = await importRoles();

    const user = {
      name: "Usuario Test",
      email: "test@grupocordillera.cl",
    };

    const result = getRoles(user);

    expect(result).toEqual([]);
  });

  it("usa el audience y endpoint configurados para obtener roles", async () => {
    vi.resetModules();

    vi.stubEnv("VITE_AUDIENCE", "api://cordillera");
    vi.stubEnv("VITE_ROLES_ENDPOINT", "/custom_roles");

    const { getRoles } = await import("../../auth/Roles");

    const user = {
      "api://cordillera/custom_roles": ["ADMIN"],
    };

    const result = getRoles(user);

    expect(result).toEqual(["ADMIN"]);
  });
});

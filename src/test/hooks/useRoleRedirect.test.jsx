import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { navigateMock, auth0Mock, getRolesMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  auth0Mock: vi.fn(),
  getRolesMock: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: auth0Mock,
}));

vi.mock("../../auth/Roles", () => ({
  getRoles: getRolesMock,
}));

import useRoleRedirect from "../../hooks/useRoleRedirect";

describe("useRoleRedirect", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {},
    });

    getRolesMock.mockReturnValue(["ADMIN"]);
  });

  it("redirige a admin cuando tiene rol ADMIN", () => {
    renderHook(() => useRoleRedirect());

    expect(navigateMock).toHaveBeenCalledWith("/admin");
  });

  it("redirige a analista cuando tiene rol ANALISTA", () => {
    getRolesMock.mockReturnValue(["ANALISTA"]);

    renderHook(() => useRoleRedirect());

    expect(navigateMock).toHaveBeenCalledWith("/analista");
  });

  it("redirige a unauthorized cuando no tiene rol permitido", () => {
    getRolesMock.mockReturnValue(["USER"]);

    renderHook(() => useRoleRedirect());

    expect(navigateMock).toHaveBeenCalledWith("/unauthorized");
  });

  it("redirige a unauthorized cuando no tiene roles", () => {
    getRolesMock.mockReturnValue([]);

    renderHook(() => useRoleRedirect());

    expect(navigateMock).toHaveBeenCalledWith("/unauthorized");
  });

  it("no redirige mientras Auth0 está cargando", () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      user: {},
    });

    renderHook(() => useRoleRedirect());

    expect(getRolesMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("no redirige si no está autenticado", () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: {},
    });

    renderHook(() => useRoleRedirect());

    expect(getRolesMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("no redirige si no hay usuario", () => {
    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: null,
    });

    renderHook(() => useRoleRedirect());

    expect(getRolesMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

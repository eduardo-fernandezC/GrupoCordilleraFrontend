import { renderHook } from "@testing-library/react";
import { vi } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    isLoading: false,
    user: {},
  }),
}));

vi.mock("../../auth/Roles", () => ({
  getRoles: () => ["ADMIN"],
}));

import useRoleRedirect from "../../hooks/useRoleRedirect";

describe("useRoleRedirect", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("redirige a admin cuando tiene rol ADMIN", () => {
    renderHook(() => useRoleRedirect());

    expect(navigateMock).toHaveBeenCalledWith("/admin");
  });
});
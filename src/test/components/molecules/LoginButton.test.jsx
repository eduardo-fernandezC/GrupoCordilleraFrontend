import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LoginButton from "../../../components/molecules/LoginButton";

const mockLoginWithRedirect = vi.fn();

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    loginWithRedirect: mockLoginWithRedirect,
  }),
}));

vi.mock("../../../auth/authConfig", () => ({
  auth0Config: {
    audience: "test-audience",
  },
}));

describe("LoginButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el botón iniciar sesión", () => {
    render(<LoginButton />);

    expect(
      screen.getByText("INICIAR SESION")
    ).toBeInTheDocument();
  });

  it("ejecuta loginWithRedirect al hacer click", () => {
    render(<LoginButton />);

    fireEvent.click(
      screen.getByText("INICIAR SESION")
    );

    expect(
      mockLoginWithRedirect
    ).toHaveBeenCalledTimes(1);
  });

  it("envía los parámetros correctos a Auth0", () => {
    render(<LoginButton />);

    fireEvent.click(
      screen.getByText("INICIAR SESION")
    );

    expect(
      mockLoginWithRedirect
    ).toHaveBeenCalledWith({
      authorizationParams: {
        audience: "test-audience",
        prompt: "login",
      },
    });
  });
});
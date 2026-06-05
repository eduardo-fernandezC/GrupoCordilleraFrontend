import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

const mocks = vi.hoisted(() => ({
  providerProps: null,
}));

vi.mock("@auth0/auth0-react", () => ({
  Auth0Provider: (props) => {
    mocks.providerProps = props;

    return <div data-testid="auth0-provider">{props.children}</div>;
  },
}));

vi.mock("../../auth/authConfig", () => ({
  auth0Config: {
    domain: "dev-test.auth0.com",
    clientId: "client-id-test",
    audience: "https://api.test",
    scope: "openid profile email",
  },
}));

import AuthProvider from "../../context/AuthProvider";

describe("AuthProvider", () => {
  beforeEach(() => {
    mocks.providerProps = null;
    vi.clearAllMocks();

    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza los children dentro de Auth0Provider", () => {
    render(
      <AuthProvider>
        <p>Contenido de prueba</p>
      </AuthProvider>,
    );

    expect(screen.getByTestId("auth0-provider")).toBeInTheDocument();

    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  it("envía la configuración correcta a Auth0Provider", () => {
    render(
      <AuthProvider>
        <p>Contenido</p>
      </AuthProvider>,
    );

    expect(mocks.providerProps).toMatchObject({
      domain: "dev-test.auth0.com",
      clientId: "client-id-test",
      cacheLocation: "localstorage",
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://api.test",
        scope: "openid profile email",
      },
    });
  });

  it("redirige al returnTo cuando existe appState", () => {
    render(
      <AuthProvider>
        <p>Contenido</p>
      </AuthProvider>,
    );

    const replaceStateSpy = vi.spyOn(window.history, "replaceState");

    mocks.providerProps.onRedirectCallback({
      returnTo: "/admin",
    });

    expect(replaceStateSpy).toHaveBeenCalledWith({}, document.title, "/admin");
  });

  it("redirige al pathname actual cuando no existe returnTo", () => {
    window.history.pushState({}, "", "/productos");

    render(
      <AuthProvider>
        <p>Contenido</p>
      </AuthProvider>,
    );

    const replaceStateSpy = vi.spyOn(window.history, "replaceState");

    mocks.providerProps.onRedirectCallback();

    expect(replaceStateSpy).toHaveBeenCalledWith(
      {},
      document.title,
      "/productos",
    );
  });
});

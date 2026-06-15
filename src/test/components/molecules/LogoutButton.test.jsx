import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LogoutButton from "../../../components/molecules/LogoutButton";

const mockLogout = vi.fn();
const mockGetRoles = vi.fn();

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    logout: mockLogout,
    user: {
      name: "Rocio",
    },
  }),
}));

vi.mock("../../../auth/Roles", () => ({
  getRoles: (...args) => mockGetRoles(...args),
}));

vi.mock("../../../components/organisms/ConfirmModal", () => ({
  default: ({ isOpen, onConfirm, onCancel }) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirmar Logout</button>
        <button onClick={onCancel}>Cancelar Logout</button>
      </div>
    ) : null,
}));

describe("LogoutButton Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el botón cerrar sesión", () => {
    mockGetRoles.mockReturnValue([]);

    render(<LogoutButton />);

    expect(
      screen.getByText("CERRAR SESION")
    ).toBeInTheDocument();
  });

  it("usuarios sin rol hacen logout inmediato", () => {
    mockGetRoles.mockReturnValue([]);

    render(<LogoutButton />);

    fireEvent.click(
      screen.getByText("CERRAR SESION")
    );

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("usuarios ADMIN abren modal", () => {
    mockGetRoles.mockReturnValue(["ADMIN"]);

    render(<LogoutButton />);

    fireEvent.click(
      screen.getByText("CERRAR SESION")
    );

    expect(
      screen.getByText("Confirmar Logout")
    ).toBeInTheDocument();
  });

  it("permite cancelar logout", () => {
    mockGetRoles.mockReturnValue(["ADMIN"]);

    render(<LogoutButton />);

    fireEvent.click(
      screen.getByText("CERRAR SESION")
    );

    fireEvent.click(
      screen.getByText("Cancelar Logout")
    );

    expect(
      screen.queryByText("Confirmar Logout")
    ).not.toBeInTheDocument();
  });

  it("permite confirmar logout", () => {
    mockGetRoles.mockReturnValue(["ADMIN"]);

    render(<LogoutButton />);

    fireEvent.click(
      screen.getByText("CERRAR SESION")
    );

    fireEvent.click(
      screen.getByText("Confirmar Logout")
    );

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import AdminUsersPage from "../../../pages/admin/AdminUsersPage";
import useUsers from "../../../hooks/useUsers";
import { validateUserForm } from "../../../validations/user.validation";
import {
  notifySuccess,
  notifyError,
} from "../../../services/NotificationService";

const { auth0Mock } = vi.hoisted(() => ({
  auth0Mock: vi.fn(),
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: auth0Mock,
}));

vi.mock("../../../auth/Roles", () => ({
  getRoles: () => ["ADMIN"],
}));

vi.mock("../../../hooks/useUsers");
vi.mock("../../../validations/user.validation");
vi.mock("../../../services/NotificationService");

vi.mock("../../../components/templates/LandingTemplate", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../../../components/atoms/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../../../components/atoms/ErrorMessage", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

vi.mock("../../../components/organisms/UserTable", () => ({
  default: ({ users, onEdit, onDelete }) => (
    <div>
      <span>Tabla Usuarios</span>

      <button onClick={() => onEdit(users[0])}>Editar Usuario</button>

      <button onClick={() => onDelete(users[0])}>Eliminar Usuario</button>
    </div>
  ),
}));

vi.mock("../../../components/organisms/UserForm", () => ({
  default: ({ onSave, onCancel, errors }) => (
    <div>
      {errors?.general && <p>{errors.general}</p>}

      <button
        onClick={() =>
          onSave({
            name: "Pedro",
            email: "pedro@test.cl",
            password: "Password123*",
          })
        }
      >
        Guardar Formulario
      </button>

      <button onClick={onCancel}>Cancelar Formulario</button>
    </div>
  ),
}));

vi.mock("../../../components/organisms/ConfirmModal", () => ({
  default: ({ isOpen, onConfirm, onCancel }) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirmar Eliminacion</button>

        <button onClick={onCancel}>Cancelar Eliminacion</button>
      </div>
    ) : null,
}));

const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockDeleteUser = vi.fn();
const mockSetSearchQuery = vi.fn();
const mockSetPage = vi.fn();

const defaultHook = {
  users: [
    {
      user_id: "1",
      name: "Juan Pérez",
      email: "juan@test.cl",
      roles: ["ADMIN"],
    },
  ],
  loading: false,
  error: null,

  page: 0,
  setPage: mockSetPage,
  totalPages: 1,

  searchQuery: "",
  setSearchQuery: mockSetSearchQuery,

  createUser: mockCreateUser,
  updateUser: mockUpdateUser,
  deleteUser: mockDeleteUser,
};

const renderPage = () =>
  render(
    <MemoryRouter>
      <AdminUsersPage />
    </MemoryRouter>,
  );

describe("AdminUsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        name: "Admin Test",
      },
    });

    useUsers.mockReturnValue(defaultHook);

    validateUserForm.mockReturnValue({});
  });

  it("muestra loader", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      users: [],
      loading: true,
      error: null,
      searchQuery: "",
    });

    renderPage();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      users: [],
      loading: false,
      error: "Error usuarios",
      searchQuery: "",
    });

    renderPage();

    expect(screen.getByText("Error usuarios")).toBeInTheDocument();
  });

  it("muestra estado vacío", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      users: [],
      searchQuery: "",
    });

    renderPage();

    expect(screen.getByText("No hay usuarios registrados")).toBeInTheDocument();
  });

  it("muestra mensaje vacío con búsqueda", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      users: [],
      searchQuery: "juan",
    });

    renderPage();

    expect(
      screen.getByText("No se encontraron usuarios con ese criterio"),
    ).toBeInTheDocument();
  });

  it("actualiza búsqueda", () => {
    renderPage();

    fireEvent.change(screen.getByLabelText("Buscar usuarios"), {
      target: { value: "juan" },
    });

    expect(mockSetSearchQuery).toHaveBeenCalledWith("juan");
  });

  it("abre modal crear usuario", () => {
    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    expect(screen.getByText("Nuevo Usuario")).toBeInTheDocument();
  });

  it("crea usuario correctamente", async () => {
    mockCreateUser.mockResolvedValue({});

    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledWith({
        name: "Pedro",
        email: "pedro@test.cl",
        password: "Password123*",
      });
    });

    expect(notifySuccess).toHaveBeenCalledWith("Usuario creado correctamente.");
  });

  it("edita usuario correctamente", async () => {
    mockUpdateUser.mockResolvedValue({});

    renderPage();

    fireEvent.click(screen.getByText("Editar Usuario"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith("1", {
        name: "Pedro",
        email: "pedro@test.cl",
        password: "Password123*",
      });
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Usuario actualizado correctamente.",
    );
  });

  it("maneja error de validación", async () => {
    validateUserForm.mockReturnValue({
      email: "Email inválido",
    });

    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    expect(mockCreateUser).not.toHaveBeenCalled();
    expect(mockUpdateUser).not.toHaveBeenCalled();
  });

  it("maneja error al guardar", async () => {
    mockCreateUser.mockRejectedValue(new Error("Error al guardar"));

    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });

    expect(await screen.findByText("Error al guardar")).toBeInTheDocument();
  });

  it("elimina usuario correctamente", async () => {
    mockDeleteUser.mockResolvedValue();

    renderPage();

    fireEvent.click(screen.getByText("Eliminar Usuario"));

    fireEvent.click(screen.getByText("Confirmar Eliminacion"));

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith("1");
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Usuario eliminado correctamente.",
    );
  });

  it("maneja error al eliminar", async () => {
    mockDeleteUser.mockRejectedValue(new Error("Error delete"));

    renderPage();

    fireEvent.click(screen.getByText("Eliminar Usuario"));

    fireEvent.click(screen.getByText("Confirmar Eliminacion"));

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalledWith("1");
    });

    expect(notifyError).toHaveBeenCalledWith("Error al eliminar: Error delete");
  });
});

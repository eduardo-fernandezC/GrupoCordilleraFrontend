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

vi.mock("../../../hooks/useUsers");
vi.mock("../../../validations/user.validation");
vi.mock("../../../services/NotificationService");

const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockDeleteUser = vi.fn();
const mockSetSearchQuery = vi.fn();

const defaultHook = {
  users: [
    {
      user_id: "1",
      name: "Juan Pérez",
      email: "juan@test.cl",
    },
  ],
  loading: false,
  error: null,
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
    </MemoryRouter>
  );

describe("AdminUsersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useUsers.mockReturnValue(defaultHook);

    validateUserForm.mockReturnValue({});
  });

  it("muestra loader", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      loading: true,
      searchQuery: "",
    });

    renderPage();

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
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
    });

    renderPage();

    expect(
      screen.getByText("No hay usuarios registrados")
    ).toBeInTheDocument();
  });

  it("muestra mensaje vacío con búsqueda", () => {
    useUsers.mockReturnValue({
      ...defaultHook,
      users: [],
      searchQuery: "juan",
    });

    renderPage();

    expect(
      screen.getByText("No se encontraron usuarios con ese criterio")
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

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del usuario"),
      {
        target: { value: "Pedro" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("correo@ejemplo.com"),
      {
        target: { value: "pedro@test.cl" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Contraseña"),
      {
        target: { value: "Password123*" },
      }
    );

    fireEvent.click(screen.getByText(/guardar/i));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Usuario creado correctamente."
    );
  });

  it("edita usuario correctamente", async () => {
    mockUpdateUser.mockResolvedValue({});

    renderPage();

    fireEvent.click(screen.getAllByText(/editar/i)[0]);

    fireEvent.click(screen.getByText(/guardar/i));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalled();
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Usuario actualizado correctamente."
    );
  });

  it("maneja error de validación", async () => {
    validateUserForm.mockReturnValue({
      email: "Email inválido",
    });

    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    fireEvent.click(screen.getByText(/guardar/i));

    await waitFor(() => {
      expect(mockCreateUser).not.toHaveBeenCalled();
    });
  });

  it("maneja error al guardar", async () => {
    mockCreateUser.mockRejectedValue(
      new Error("Error al guardar")
    );

    renderPage();

    fireEvent.click(screen.getByText("Crear Usuario"));

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del usuario"),
      {
        target: { value: "Pedro" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("correo@ejemplo.com"),
      {
        target: { value: "pedro@test.cl" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Contraseña"),
      {
        target: { value: "Password123*" },
      }
    );

    fireEvent.click(screen.getByText(/guardar/i));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });
  });

  it("elimina usuario correctamente", async () => {
    mockDeleteUser.mockResolvedValue();

    renderPage();

    fireEvent.click(screen.getAllByText(/eliminar/i)[0]);

    fireEvent.click(
      screen.getAllByRole("button", {
        name: /eliminar/i,
      })[1]
    );

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalled();
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Usuario eliminado correctamente."
    );
  });

  it("maneja error al eliminar", async () => {
    mockDeleteUser.mockRejectedValue(
      new Error("Error delete")
    );

    renderPage();

    fireEvent.click(screen.getAllByText(/eliminar/i)[0]);

    fireEvent.click(
      screen.getAllByRole("button", {
        name: /eliminar/i,
      })[1]
    );

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalled();
    });

    expect(notifyError).toHaveBeenCalledWith(
      "Error al eliminar: Error delete"
    );
  });
});
import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import useUsers from "../../hooks/useUsers";

import { useAuth0 } from "@auth0/auth0-react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
} from "../../services/UserService";

vi.mock("@auth0/auth0-react");
vi.mock("../../services/UserService");

describe("useUsers", () => {
  const mockToken = "fake-token";

  beforeEach(() => {
    vi.clearAllMocks();

    useAuth0.mockReturnValue({
      isAuthenticated: true,
      getAccessTokenSilently: vi.fn().mockResolvedValue(mockToken),
    });
  });

  it("carga usuarios correctamente", async () => {
    const usersMock = [
      {
        user_id: "1",
        name: "Juan",
      },
    ];

    getUsers.mockResolvedValue({
      users: usersMock,
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.users).toEqual(usersMock);
    expect(result.current.error).toBeNull();
  });

  it("maneja error al cargar usuarios", async () => {
    getUsers.mockRejectedValue(new Error("Error"));

    const { result } = renderHook(() => useUsers());

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.error).toBe("Error cargando usuarios");
    expect(result.current.users).toEqual([]);
  });

  it("no carga usuarios si no está autenticado", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      getAccessTokenSilently: vi.fn(),
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.users).toEqual([]);
  });

  it("busca usuarios cuando existe searchQuery", async () => {
    searchUsers.mockResolvedValue([
      {
        user_id: "1",
        name: "Pedro",
      },
    ]);

    getUsers.mockResolvedValue([]);

    const { result } = renderHook(() => useUsers());

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    act(() => {
      result.current.setSearchQuery("Pedro");
    });

    await waitFor(() => {
      expect(searchUsers).toHaveBeenCalled();
    });
  });

  it(
    "crea usuario correctamente",
    async () => {
      getUsers.mockResolvedValue([]);

      createUser.mockResolvedValue({
        user_id: "1",
        name: "Nuevo",
      });

      const { result } = renderHook(() => useUsers());

      await waitFor(() =>
        expect(result.current.loading).toBe(false)
      );

      let response;

      await act(async () => {
        response = await result.current.createUser({
          name: "Nuevo",
        });
      });

      expect(createUser).toHaveBeenCalled();
      expect(response).toEqual({
        user_id: "1",
        name: "Nuevo",
      });
    },
    10000
  );

  it(
    "actualiza usuario correctamente",
    async () => {
      getUsers.mockResolvedValue([]);

      updateUser.mockResolvedValue({
        user_id: "1",
        name: "Actualizado",
      });

      const { result } = renderHook(() => useUsers());

      await waitFor(() =>
        expect(result.current.loading).toBe(false)
      );

      let response;

      await act(async () => {
        response = await result.current.updateUser("1", {
          name: "Actualizado",
        });
      });

      expect(updateUser).toHaveBeenCalled();
      expect(response).toEqual({
        user_id: "1",
        name: "Actualizado",
      });
    },
    10000
  );

  it(
    "elimina usuario correctamente",
    async () => {
      getUsers.mockResolvedValue([]);

      deleteUser.mockResolvedValue();

      const { result } = renderHook(() => useUsers());

      await waitFor(() =>
        expect(result.current.loading).toBe(false)
      );

      await act(async () => {
        await result.current.deleteUser("1");
      });

      expect(deleteUser).toHaveBeenCalled();
    },
    10000
  );

  it(
    "retorna usuario original si createUser devuelve null",
    async () => {
      getUsers.mockResolvedValue([]);

      createUser.mockResolvedValue(null);

      const { result } = renderHook(() => useUsers());

      await waitFor(() =>
        expect(result.current.loading).toBe(false)
      );

      const payload = {
        name: "Usuario Test",
      };

      let response;

      await act(async () => {
        response = await result.current.createUser(payload);
      });

      expect(response).toEqual(payload);
    },
    10000
  );

  it(
    "retorna usuario fallback en updateUser cuando API devuelve null",
    async () => {
      getUsers.mockResolvedValue([]);

      updateUser.mockResolvedValue(null);

      const { result } = renderHook(() => useUsers());

      await waitFor(() =>
        expect(result.current.loading).toBe(false)
      );

      let response;

      await act(async () => {
        response = await result.current.updateUser("99", {
          name: "Fallback",
        });
      });

      expect(response).toEqual({
        user_id: "99",
        name: "Fallback",
      });
    },
    10000
  );
});
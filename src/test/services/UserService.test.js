import { vi } from "vitest";

const authApiMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("../../services/api/AuthApi", () => ({
  default: authApiMock,
}));

import AuthApi from "../../services/api/AuthApi";
import {
  createUser,
  deleteUser,
  getUsers,
  searchUsers,
  updateUser,
} from "../../services/UserService";

describe("UserService", () => {
  const token = "token-test";

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("obtiene usuarios", async () => {
    const users = [
      {
        user_id: "1",
        name: "Rocio",
      },
      {
        user_id: "2",
        name: "Martin",
      },
    ];

    AuthApi.get.mockResolvedValue({
      data: users,
    });

    const result = await getUsers(token);

    expect(AuthApi.get).toHaveBeenCalledWith(
      "",
      expect.objectContaining({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 0,
          limit: 10,
        },
      }),
    );

    expect(result).toEqual(users);
  });

  it("crea un usuario", async () => {
    const newUser = {
      name: "Rocio",
      email: "rocio@grupocordillera.cl",
      password: "Password1!",
    };

    const createdUser = {
      user_id: "auth0|123",
      ...newUser,
    };

    AuthApi.post.mockResolvedValue({
      data: createdUser,
    });

    const result = await createUser(token, newUser);

    expect(AuthApi.post).toHaveBeenCalledWith("", newUser, authConfig);

    expect(result).toEqual(createdUser);
  });

  it("actualiza un usuario", async () => {
    const user = {
      name: "Rocio Editada",
      email: "rocio@grupocordillera.cl",
    };

    const updatedUser = {
      user_id: "auth0|123",
      ...user,
    };

    AuthApi.patch.mockResolvedValue({
      data: updatedUser,
    });

    const result = await updateUser(token, "auth0|123", user);

    expect(AuthApi.patch).toHaveBeenCalledWith("/auth0|123", user, authConfig);

    expect(result).toEqual(updatedUser);
  });

  it("elimina un usuario", async () => {
    const response = {
      message: "Usuario eliminado",
    };

    AuthApi.delete.mockResolvedValue({
      data: response,
    });

    const result = await deleteUser(token, "auth0|123");

    expect(AuthApi.delete).toHaveBeenCalledWith("/auth0|123", authConfig);

    expect(result).toEqual(response);
  });

  it("busca usuarios codificando el username", async () => {
    const users = [
      {
        user_id: "1",
        name: "Rocio Silva",
      },
    ];

    AuthApi.get.mockResolvedValue({
      data: users,
    });

    const result = await searchUsers(token, "Rocio Silva");

    expect(AuthApi.get).toHaveBeenCalledWith(
      "/search?username=Rocio%20Silva",
      authConfig,
    );

    expect(result).toEqual(users);
  });
});

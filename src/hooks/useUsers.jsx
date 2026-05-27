import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { auth0Config } from "../auth/authConfig";

import {
  getUsers,
  createUser as createUserRequest
} from "../services/UserService";

const normalizeUsers = (value) =>
  Array.isArray(value) ? value : [];

const useUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    getAccessTokenSilently,
    isAuthenticated
  } = useAuth0();

  // Obtiene token autenticado
  const getAuthenticatedToken = async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: auth0Config.audience,
      },
    });
  };

  // Carga usuarios
  const loadUsers = async () => {
    if (!isAuthenticated) {
      setUsers([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const token =
        await getAuthenticatedToken();

      const data =
        await getUsers(token);

      const normalizedUsers =
        normalizeUsers(data);

      setUsers(normalizedUsers);

      return normalizedUsers;

    } catch {
      setError("Error cargando usuarios");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Crea usuario
  const createUser = async (user) => {
    const token =
      await getAuthenticatedToken();

    await createUserRequest(
      token,
      user
    );

    await loadUsers();

  };

  useEffect(() => {
    queueMicrotask(() => {
      void loadUsers();
    });
  }, [isAuthenticated]);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser
  };
};

export default useUsers;
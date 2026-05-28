import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

import { auth0Config } from "../auth/authConfig";

import {
  getUsers,
  createUser as createUserRequest,
  deleteUser as deleteUserRequest,
  updateUser as updateUserRequest,
} from "../services/UserService";

const normalizeUsers = (value) => (Array.isArray(value) ? value : []);

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getAuthenticatedToken = useCallback(async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: auth0Config.audience,
      },
    });
  }, [getAccessTokenSilently]);

  const loadUsers = useCallback(async () => {
    if (!isAuthenticated) {
      setUsers([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      const token = await getAuthenticatedToken();

      const data = await getUsers(token);

      const normalizedUsers = normalizeUsers(data);

      setUsers(normalizedUsers);

      return normalizedUsers;
    } catch {
      setError("Error cargando usuarios");
      return [];
    } finally {
      setLoading(false);
    }
  }, [getAuthenticatedToken, isAuthenticated]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadUsers();
    });
  }, [loadUsers]);

  const createUser = useCallback(
    async (user) => {
      const token = await getAuthenticatedToken();

      await createUserRequest(token, user);
      await loadUsers();
    },
    [getAuthenticatedToken, loadUsers],
  );

  const updateUser = useCallback(
    async (userId, user) => {
      const token = await getAuthenticatedToken();

      await updateUserRequest(token, userId, user);
      await loadUsers();
    },
    [getAuthenticatedToken, loadUsers],
  );

  const deleteUser = useCallback(
    async (userId) => {
      const token = await getAuthenticatedToken();

      await deleteUserRequest(token, userId);
      await loadUsers();
    },
    [getAuthenticatedToken, loadUsers],
  );

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;

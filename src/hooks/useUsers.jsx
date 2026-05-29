import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

import { auth0Config } from "../auth/authConfig";
import useDebounce from "./useDebounce";

import {
  getUsers,
  createUser as createUserRequest,
  deleteUser as deleteUserRequest,
  updateUser as updateUserRequest,
  searchUsers,
} from "../services/UserService";

const normalizeUsers = (value) => (Array.isArray(value) ? value : []);
const normalizeUser = (value) =>
  value && typeof value === "object" && !Array.isArray(value) ? value : null;

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const debouncedSearchQuery = useDebounce(searchQuery, 700);

  const getAuthenticatedToken = useCallback(async () => {
    return getAccessTokenSilently({
      authorizationParams: {
        audience: auth0Config.audience,
      },
    });
  }, [getAccessTokenSilently]);

  const loadUsers = useCallback(
    async (query = "") => {
      if (!isAuthenticated) {
        setUsers([]);
        setLoading(false);
        return [];
      }

      setLoading(true);
      setError(null);

      try {
        const token = await getAuthenticatedToken();
        const normalizedQuery = query.trim();

        const data = normalizedQuery
          ? await searchUsers(token, normalizedQuery)
          : await getUsers(token);

        const normalizedUsers = normalizeUsers(data);

        setUsers(normalizedUsers);

        return normalizedUsers;
      } catch {
        setError("Error cargando usuarios");
        return [];
      } finally {
        setLoading(false);
      }
    },
    [getAuthenticatedToken, isAuthenticated],
  );

  useEffect(() => {
    queueMicrotask(() => {
      void loadUsers(debouncedSearchQuery);
    });
  }, [debouncedSearchQuery, loadUsers]);

  const createUser = useCallback(
    async (user) => {
      const token = await getAuthenticatedToken();

      const createdUser = normalizeUser(await createUserRequest(token, user));

      await loadUsers(searchQuery);

      return createdUser ?? user;
    },
    [getAuthenticatedToken, loadUsers, searchQuery],
  );

  const updateUser = useCallback(
    async (userId, user) => {
      const token = await getAuthenticatedToken();

      const updatedUser = normalizeUser(
        await updateUserRequest(token, userId, user),
      );

      await loadUsers(searchQuery);

      return updatedUser ?? { user_id: userId, ...user };
    },
    [getAuthenticatedToken, loadUsers, searchQuery],
  );

  const deleteUser = useCallback(
    async (userId) => {
      const token = await getAuthenticatedToken();

      await deleteUserRequest(token, userId);

      await loadUsers(searchQuery);
    },
    [getAuthenticatedToken, loadUsers, searchQuery],
  );

  return {
    users,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useUsers;

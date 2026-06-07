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
  const [page, setPage] = useState(0);
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
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
    async (query = "", currentPage = page) => {
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

        let data;

        if (normalizedQuery) {
          data = await searchUsers(token, normalizedQuery);

          setUsers(normalizeUsers(data));

          setTotalPages(1);
        } else {
          data = await getUsers(token, currentPage, limit);

          setUsers(normalizeUsers(data.users));

          setTotalPages(data.pagination?.totalPages ?? 1);
        }

        return data;
      } catch {
        setError("Error cargando usuarios");

        return [];
      } finally {
        setLoading(false);
      }
    },

    [getAuthenticatedToken, isAuthenticated, page, limit],
  );

  useEffect(() => {
    void loadUsers(debouncedSearchQuery, page);
  }, [debouncedSearchQuery, page, loadUsers]);

  const createUser = useCallback(
    async (user) => {
      const token = await getAuthenticatedToken();

      const createdUser = normalizeUser(await createUserRequest(token, user));

      await new Promise((resolve) => setTimeout(resolve, 1200));

      await loadUsers(searchQuery, page);

      return createdUser ?? user;
    },

    [getAuthenticatedToken, loadUsers, searchQuery, page],
  );

  const updateUser = useCallback(
    async (userId, user) => {
      const token = await getAuthenticatedToken();

      const updatedUser = normalizeUser(
        await updateUserRequest(token, userId, user),
      );

      await new Promise((resolve) => setTimeout(resolve, 1200));

      await loadUsers(searchQuery, page);

      return (
        updatedUser ?? {
          user_id: userId,
          ...user,
        }
      );
    },

    [getAuthenticatedToken, loadUsers, searchQuery, page],
  );

  const deleteUser = useCallback(
    async (userId) => {
      const token = await getAuthenticatedToken();

      await deleteUserRequest(token, userId);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      await loadUsers(searchQuery, page);
    },

    [getAuthenticatedToken, loadUsers, searchQuery, page],
  );

  return {
    users,

    loading,

    error,

    searchQuery,

    setSearchQuery,

    page,

    setPage,

    totalPages,

    loadUsers,

    createUser,

    updateUser,

    deleteUser,
  };
};

export default useUsers;

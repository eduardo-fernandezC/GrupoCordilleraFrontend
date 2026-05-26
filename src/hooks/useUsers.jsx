import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";

import { auth0Config } from "../auth/authConfig";

import { getUsers } from "../services/userService";

const normalizeUsers = (value) =>
  Array.isArray(value) ? value : [];

const useUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  const getAuthenticatedToken = useCallback(async () => {

    return getAccessTokenSilently({
      authorizationParams: {
        audience: auth0Config.audience,
      },
    });

  }, [getAccessTokenSilently]);
  // usamos useCallback para memorizar la funcion y evitar recrearla en cada renderizado y asi evitar bucles infinitos en useEffect
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

  return {
    users,
    loading,
    error,
    loadUsers,
  };
};

export default useUsers;
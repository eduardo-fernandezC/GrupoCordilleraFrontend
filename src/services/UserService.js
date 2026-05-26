import AuthApi from "./api/AuthApi";

const buildAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Obtiene usuarios desde auth-service
export const getUsers = async (token) => {

  const response = await AuthApi.get(
    "",
    buildAuthConfig(token),
  );

  return response.data;
};
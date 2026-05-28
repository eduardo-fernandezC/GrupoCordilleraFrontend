import AuthApi from "./api/AuthApi";

const buildAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getUsers = async (token) => {
  const response = await AuthApi.get("", buildAuthConfig(token));
  return response.data;
};

export const createUser = async (token, user) => {
  const response = await AuthApi.post("", user, buildAuthConfig(token));
  return response.data;
};

export const updateUser = async (token, userId, user) => {
  const response = await AuthApi.patch(
    `/${userId}`,
    user,
    buildAuthConfig(token),
  );
  return response.data;
};

export const deleteUser = async (token, userId) => {
  const response = await AuthApi.delete(`/${userId}`, buildAuthConfig(token));
  return response.data;
};

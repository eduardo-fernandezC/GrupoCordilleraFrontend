import ApiClient from "./ApiClient";

export const getDashboardData = async (token) => {
  const response = await ApiClient.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

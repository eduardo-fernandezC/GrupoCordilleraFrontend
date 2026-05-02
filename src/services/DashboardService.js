import ApiClient from "./ApiClient";

export const getDashboardData = async (token) => {
  const response = await ApiClient.get(import.meta.env.VITE_DASHBOARD_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

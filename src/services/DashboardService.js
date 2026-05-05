import DashboardApi from "./api/DashboardApi";

export const getDashboardData = async (token) => {
  const response = await DashboardApi.get(
    import.meta.env.VITE_DASHBOARD_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

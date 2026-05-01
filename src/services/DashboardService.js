import ApiClient from "./ApiClient";

const getDashboardData = async () => {
  const response = await ApiClient.get("/dashboard");
  return response.data;
};

export default getDashboardData;

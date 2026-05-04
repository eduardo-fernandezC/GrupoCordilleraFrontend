import axios from "axios";

const DashboardApi = axios.create({
  baseURL: import.meta.env.VITE_DASHBOARD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default DashboardApi;

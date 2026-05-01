import { useEffect, useState } from "react";
import { getDashboardData } from "../services/DashboardService";

const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDahboard = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError("Error cargando dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDahboard();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;

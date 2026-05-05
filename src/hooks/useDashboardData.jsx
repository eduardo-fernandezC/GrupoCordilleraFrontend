import { useEffect, useState } from "react";
import { getDashboardData } from "../services/DashboardService";
import { useAuth0 } from "@auth0/auth0-react";
import { auth0Config } from "../auth/authConfig";

const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchDashboard = async () => {
      if (isLoading) {
        return;
      }

      if (!isAuthenticated) {
        setError("Debes iniciar sesión para ver el dashboard");
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Config.audience,
          },
        });

        const dashboardData = await getDashboardData(token);
        setData(dashboardData);
      } catch (exception) {
        const message =
          exception?.response?.data?.message ||
          exception?.response?.data?.error ||
          exception?.message ||
          "Error cargando dashboard";

        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return { data, loading, error };
};

export default useDashboardData;

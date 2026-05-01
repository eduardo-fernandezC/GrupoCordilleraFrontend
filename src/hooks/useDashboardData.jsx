import { useEffect, useState } from "react";
import { getDashboardData } from "../services/DashboardService";
import { useAuth0 } from "@auth0/auth0-react";
import { auth0Config } from "../auth/authConfig";

const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchDahboard = async () => {
      if (!isAuthenticated) return;
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Config.audience,
          },
        });

        console.log("ACCES TOKEN", token);

        const dashboardData = await getDashboardData(token);

        setData(dashboardData);
      } catch (err) {
        setError("Error cargando dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDahboard();
  }, [getAccessTokenSilently, isAuthenticated]);

  return { data, loading, error };
};

export default useDashboardData;

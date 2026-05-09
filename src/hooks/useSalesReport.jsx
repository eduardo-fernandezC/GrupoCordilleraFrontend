import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { buildVentasReport, getVentas } from "../services/salesReportService";
import { auth0Config } from "../auth/authConfig";

const useSalesReport = () => {
  const [ventasRaw, setVentasRaw] = useState([]);
  const [selectedVentaId, setSelectedVentaId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth0();

  useEffect(() => {
    let active = true;

    const loadVentas = async () => {
      if (isAuthLoading) return;

      if (!isAuthenticated) {
        if (active) {
          setError("Debes iniciar sesión para ver las ventas");
          setLoading(false);
        }
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Config.audience,
          },
        });

        setLoading(true);
        setError("");

        const data = await getVentas(token);

        if (!active) return;

        setVentasRaw(data);
      } catch (exception) {
        if (!active) return;

        setError(
          exception?.response?.data?.message ||
            exception?.message ||
            "No fue posible cargar las ventas",
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadVentas();

    return () => {
      active = false;
    };
  }, [getAccessTokenSilently, isAuthenticated, isAuthLoading]);

  const ventas = useMemo(() => buildVentasReport(ventasRaw), [ventasRaw]);

  const selectedVenta = useMemo(
    () => ventas.find((venta) => venta.idVenta === selectedVentaId) || null,
    [ventas, selectedVentaId],
  );

  useEffect(() => {
    if (ventas.length > 0 && selectedVentaId === null) {
      Promise.resolve().then(() => {
        setSelectedVentaId(ventas[0].idVenta);
      });
    }
  }, [ventas, selectedVentaId]);

  const handleSelectVenta = (idVenta) => {
    setSelectedVentaId((current) => (current === idVenta ? null : idVenta));
  };

  return {
    ventas,
    selectedVenta,
    selectedVentaId,
    loading,
    error,
    handleSelectVenta,
  };
};

export default useSalesReport;

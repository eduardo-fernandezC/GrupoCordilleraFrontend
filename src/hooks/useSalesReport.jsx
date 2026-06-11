import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { buildVentasReport, getVentas } from "../services/salesReportService";
import { auth0Config } from "../auth/authConfig";

const useSalesReport = () => {
  const [ventasRaw, setVentasRaw] = useState([]);
  const [selectedVentaId, setSelectedVentaId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // nuevos states para paginacion
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
          setError("Debes iniciar sesion para ver las ventas");
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

        const data = await getVentas(token, page, 10);

        if (!active) return;

        setVentasRaw(data.content || []);
        setTotalPages(data.totalPages || 0);

        setSelectedVentaId(null);
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
  }, [getAccessTokenSilently, isAuthenticated, isAuthLoading, page]);

  const ventas = useMemo(() => buildVentasReport(ventasRaw), [ventasRaw]);

  const selectedVenta = useMemo(
    () => ventas.find((venta) => venta.idVenta === selectedVentaId) || null,
    [ventas, selectedVentaId],
  );

  const handleSelectVenta = (idVenta) => {
    setSelectedVentaId((current) => (current === idVenta ? null : idVenta));
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return {
    ventas,
    selectedVenta,
    selectedVentaId,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    previousPage,
    handleSelectVenta,
  };
};

export default useSalesReport;

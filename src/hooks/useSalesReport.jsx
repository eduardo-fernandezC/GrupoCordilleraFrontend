import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  buildVentasFromDetalles,
  getDetalleVentas,
  getVentaDetalle,
} from "../services/salesReportService";
import { auth0Config } from "../auth/authConfig";

const useSalesReport = () => {
  const [detalleVentas, setDetalleVentas] = useState([]);
  const [selectedVentaId, setSelectedVentaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ventaDetalle, setVentaDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAuth0();

  useEffect(() => {
    let active = true;

    const loadVentas = async () => {
      if (isAuthLoading) {
        return;
      }

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
        const data = await getDetalleVentas(token);

        if (!active) {
          return;
        }

        setDetalleVentas(Array.isArray(data) ? data : []);

        if (Array.isArray(data) && data.length > 0) {
          setSelectedVentaId((currentValue) => currentValue ?? 1);
        }
      } catch (exception) {
        if (!active) {
          return;
        }

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

  const ventas = useMemo(
    () => buildVentasFromDetalles(detalleVentas),
    [detalleVentas],
  );

  useEffect(() => {
    if (!selectedVentaId) {
      return;
    }

    let active = true;

    const loadVentaDetalle = async () => {
      try {
        setDetailLoading(true);
        setDetailError("");

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: auth0Config.audience,
          },
        });

        const data = await getVentaDetalle(selectedVentaId, token);

        if (active) {
          setVentaDetalle(data);
        }
      } catch (exception) {
        if (active) {
          setDetailError(
            exception?.response?.data?.message ||
              exception?.message ||
              "No fue posible cargar el detalle de la venta",
          );
          setVentaDetalle(null);
        }
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    };

    loadVentaDetalle();

    return () => {
      active = false;
    };
  }, [getAccessTokenSilently, selectedVentaId]);

  const selectedVenta = useMemo(
    () => ventas.find((venta) => venta.idVenta === selectedVentaId) || null,
    [selectedVentaId, ventas],
  );

  const handleSelectVenta = (idVenta) => {
    setSelectedVentaId(idVenta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    ventas,
    selectedVenta,
    selectedVentaId,
    ventaDetalle,
    isModalOpen,
    loading,
    detailLoading,
    error,
    detailError,
    handleSelectVenta,
    closeModal,
  };
};

export default useSalesReport;

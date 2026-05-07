import axios from "axios";

const DATA_BASE_URL = import.meta.env.VITE_DATA_URL;
const SALES_API_BASE = `${DATA_BASE_URL.replace(/\/$/, "")}/detalle-ventas`;
const BUSCAR_VENTA_ENDPOINT = (idVenta) =>
  `${SALES_API_BASE}/buscarVenta/${idVenta}`;

export const DETAIL_GROUP_SIZE = 3;

const buildAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getDetalleVentas = async (token) => {
  const response = await axios.get(SALES_API_BASE, {
    headers: buildAuthHeaders(token),
  });
  return response.data;
};

export const getVentaDetalle = async (idVenta, token) => {
  const response = await axios.get(BUSCAR_VENTA_ENDPOINT(idVenta), {
    headers: buildAuthHeaders(token),
  });
  return response.data;
};

export const buildVentasFromDetalles = (
  detalles,
  groupSize = DETAIL_GROUP_SIZE,
) => {
  if (!Array.isArray(detalles) || detalles.length === 0) {
    return [];
  }

  const ventas = [];

  for (let index = 0; index < detalles.length; index += groupSize) {
    const items = detalles.slice(index, index + groupSize);
    const idVenta = ventas.length + 1;
    const total = items.reduce(
      (accumulator, item) => accumulator + Number(item.subtotal || 0),
      0,
    );
    const cantidadProductos = items.reduce(
      (accumulator, item) => accumulator + Number(item.cantidad || 0),
      0,
    );

    ventas.push({
      idVenta,
      items,
      total,
      cantidadProductos,
      cantidadDetalles: items.length,
      detalleInicial: items[0]?.idDetalle ?? null,
      detalleFinal: items[items.length - 1]?.idDetalle ?? null,
    });
  }

  return ventas;
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
};

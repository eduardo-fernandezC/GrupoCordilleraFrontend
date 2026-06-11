import axios from "axios";

const DATA_BASE_URL = import.meta.env.VITE_DATA_URL;
const SALES_API_BASE = `${DATA_BASE_URL.replace(/\/$/, "")}/ventas`;

const buildAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const getVentas = async (token, page = 0, size = 10) => {
  const response = await axios.get(
    `${SALES_API_BASE}/dto?page=${page}&size=${size}`, // nuevo endpoint con paginacion
    {
      headers: buildAuthHeaders(token),
    },
  );

  return response.data;
};
export const buildVentasReport = (ventas) => {
  if (!Array.isArray(ventas)) return [];

  return ventas.map((venta) => ({
    idVenta: venta.idVenta,
    fecha: venta.fecha,
    total: Number(venta.total || 0),

    sucursal: {
      idSucursal: venta.sucursal?.idSucursal ?? null,
      nombre: venta.sucursal?.nombre ?? "Sin sucursal",
      ciudad: venta.sucursal?.ciudad?.nombre ?? "Sin ciudad",
      region: venta.sucursal?.ciudad?.region?.nombre ?? "Sin región",
    },

    empleado: {
      idEmpleado: venta.empleado?.idEmpleado ?? null,
      nombre: venta.empleado?.nombre ?? "Sin empleado",
      cargo: venta.empleado?.cargo ?? "Sin cargo",
    },
  }));
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
};

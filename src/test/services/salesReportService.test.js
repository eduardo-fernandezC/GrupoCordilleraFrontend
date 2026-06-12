const axiosMock = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("axios", () => ({
  default: axiosMock,
}));

import axios from "axios";

const importSalesReportService = async () => {
  vi.resetModules();

  vi.stubEnv("VITE_DATA_URL", "http://localhost:3000/api");

  return import("../../services/salesReportService");
};

describe("salesReportService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("obtiene ventas con token", async () => {
    const { getVentas } = await importSalesReportService();

    const ventasResponse = {
      content: [
        {
          idVenta: 1,
          total: 10000,
        },
      ],
      totalPages: 1,
    };

    axios.get.mockResolvedValue({
      data: ventasResponse,
    });

    const result = await getVentas("token-test");

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/api/ventas/dto?page=0&size=10",
      {
        headers: {
          Authorization: "Bearer token-test",
        },
      },
    );

    expect(result).toEqual(ventasResponse);
  });

  it("obtiene ventas usando paginación personalizada", async () => {
    const { getVentas } = await importSalesReportService();

    const ventasResponse = {
      content: [],
      totalPages: 3,
    };

    axios.get.mockResolvedValue({
      data: ventasResponse,
    });

    const result = await getVentas("token-test", 2, 20);

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/api/ventas/dto?page=2&size=20",
      {
        headers: {
          Authorization: "Bearer token-test",
        },
      },
    );

    expect(result).toEqual(ventasResponse);
  });

  it("retorna la respuesta del backend aunque no sea arreglo", async () => {
    const { getVentas } = await importSalesReportService();

    const response = {
      message: "sin ventas",
    };

    axios.get.mockResolvedValue({
      data: response,
    });

    const result = await getVentas("token-test");

    expect(result).toEqual(response);
  });

  it("construye el reporte de ventas", async () => {
    const { buildVentasReport } = await importSalesReportService();

    const result = buildVentasReport([
      {
        idVenta: 1,
        fecha: "2026-06-05",
        total: "15000",
        sucursal: {
          idSucursal: 10,
          nombre: "Sucursal Centro",
          ciudad: {
            nombre: "Santiago",
            region: {
              nombre: "Metropolitana",
            },
          },
        },
        empleado: {
          idEmpleado: 20,
          nombre: "Rocio",
          cargo: "Vendedora",
        },
      },
    ]);

    expect(result).toEqual([
      {
        idVenta: 1,
        fecha: "2026-06-05",
        total: 15000,
        sucursal: {
          idSucursal: 10,
          nombre: "Sucursal Centro",
          ciudad: "Santiago",
          region: "Metropolitana",
        },
        empleado: {
          idEmpleado: 20,
          nombre: "Rocio",
          cargo: "Vendedora",
        },
      },
    ]);
  });

  it("usa valores por defecto cuando faltan datos", async () => {
    const { buildVentasReport } = await importSalesReportService();

    const result = buildVentasReport([
      {
        idVenta: 1,
        total: null,
      },
    ]);

    expect(result[0].total).toBe(0);
    expect(result[0].sucursal.nombre).toBe("Sin sucursal");
    expect(result[0].sucursal.ciudad).toBe("Sin ciudad");
    expect(result[0].sucursal.region).toBe("Sin región");
    expect(result[0].empleado.nombre).toBe("Sin empleado");
    expect(result[0].empleado.cargo).toBe("Sin cargo");
  });

  it("retorna arreglo vacío si buildVentasReport no recibe arreglo", async () => {
    const { buildVentasReport } = await importSalesReportService();

    expect(buildVentasReport(null)).toEqual([]);
  });

  it("formatea moneda chilena", async () => {
    const { formatCurrency } = await importSalesReportService();

    expect(formatCurrency(15000)).toBe("$15.000");
  });
});

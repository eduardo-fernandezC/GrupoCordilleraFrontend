import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import ReportesPage from "../../../pages/admin/ReportesPage";

import { useAuth0 } from "@auth0/auth0-react";
import { downloadReportPdf } from "../../../services/ReportService";
import {
  notifySuccess,
  notifyError,
} from "../../../services/NotificationService";

vi.mock("@auth0/auth0-react");
vi.mock("../../../services/ReportService");
vi.mock("../../../services/NotificationService");

const mockGetAccessTokenSilently = vi.fn();

const renderPage = () =>
  render(
    <MemoryRouter>
      <ReportesPage />
    </MemoryRouter>
  );

describe("ReportesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
      getAccessTokenSilently: mockGetAccessTokenSilently,
    });

    mockGetAccessTokenSilently.mockResolvedValue("token");
    downloadReportPdf.mockResolvedValue();
  });

  it("muestra loader", () => {
    useAuth0.mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
      getAccessTokenSilently: vi.fn(),
    });

    renderPage();

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra mensaje si no está autenticado", () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
      getAccessTokenSilently: vi.fn(),
    });

    renderPage();

    expect(
      screen.getByText(
        "Debes iniciar sesion para ver los reportes."
      )
    ).toBeInTheDocument();
  });

  it("renderiza los reportes", () => {
    renderPage();

    expect(
      screen.getByText("Reporte Ejecutivo")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Reporte de Productos")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Reporte de Ventas")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Reporte General")
    ).toBeInTheDocument();
  });

  it("descarga reporte correctamente", async () => {
    renderPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: /descargar ejecutivo/i,
      })
    );

    await waitFor(() => {
      expect(mockGetAccessTokenSilently).toHaveBeenCalled();
    });

    expect(downloadReportPdf).toHaveBeenCalled();

    expect(notifySuccess).toHaveBeenCalledWith(
      "Reporte Ejecutivo descargado correctamente."
    );
  });

  it("muestra error simple al descargar", async () => {
    downloadReportPdf.mockRejectedValue(
      new Error("Error descarga")
    );

    renderPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: /descargar ejecutivo/i,
      })
    );

    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "Error descarga"
      );
    });

    expect(
      screen.getByText("Error descarga")
    ).toBeInTheDocument();
  });

  it("muestra error desde response.data.message", async () => {
    downloadReportPdf.mockRejectedValue({
      response: {
        data: {
          message: "Error backend",
        },
      },
    });

    renderPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: /descargar ejecutivo/i,
      })
    );

    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "Error backend"
      );
    });

    expect(
      screen.getByText("Error backend")
    ).toBeInTheDocument();
  });

  it("muestra mensaje por defecto si no existe error", async () => {
    downloadReportPdf.mockRejectedValue({});

    renderPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: /descargar ejecutivo/i,
      })
    );

    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "No fue posible descargar el reporte."
      );
    });

    expect(
      screen.getByText(
        "No fue posible descargar el reporte."
      )
    ).toBeInTheDocument();
  });

  it("solicita token con audience configurado", async () => {
    renderPage();

    fireEvent.click(
      screen.getByRole("button", {
        name: /descargar ejecutivo/i,
      })
    );

    await waitFor(() => {
      expect(mockGetAccessTokenSilently).toHaveBeenCalledWith(
        expect.objectContaining({
          authorizationParams: expect.any(Object),
        })
      );
    });
  });
});
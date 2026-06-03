import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";
import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";

import { auth0Config } from "../../auth/authConfig";
import { downloadReportPdf } from "../../services/reportsService";
import {
  notifyError,
  notifySuccess,
} from "../../services/NotificationService.js";

import "../../styles/pages/ReportesPage.css";

const REPORTS = [
  {
    key: "executive",
    title: "Reporte Ejecutivo",
    description:
      "Resumen gerencial con ventas totales, cantidad de ventas, producto más vendido y mejor sucursal.",
    endpoint: "/api/v1/reports/executive/pdf",
    filename: "reporte-ejecutivo.pdf",
    buttonLabel: "Descargar Ejecutivo",
  },
  {
    key: "products",
    title: "Reporte de Productos",
    description:
      "Listado de productos con stock, precio, categoría y resumen del inventario.",
    endpoint: "/api/v1/reports/products/pdf",
    filename: "reporte-productos.pdf",
    buttonLabel: "Descargar Productos",
  },
  {
    key: "sales",
    title: "Reporte de Ventas",
    description:
      "Detalle de ventas con fecha, sucursal, vendedor y total de cada venta.",
    endpoint: "/api/v1/reports/sales/pdf",
    filename: "reporte-ventas.pdf",
    buttonLabel: "Descargar Ventas",
  },
  {
    key: "full",
    title: "Reporte General",
    description:
      "Documento consolidado con reporte ejecutivo, productos y ventas en un solo PDF.",
    endpoint: "/api/v1/reports/full/pdf",
    filename: "reporte-general.pdf",
    buttonLabel: "Descargar Todo",
  },
];

const ReportesPage = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [activeReport, setActiveReport] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownload = async (report) => {
    if (!isAuthenticated) {
      const message = "Debes iniciar sesion para descargar reportes.";
      setErrorMessage(message);
      notifyError(message);
      return;
    }

    try {
      setActiveReport(report.key);
      setErrorMessage("");

      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: auth0Config.audience,
        },
      });

      await downloadReportPdf(token, report.endpoint, report.filename);

      notifySuccess(`${report.title} descargado correctamente.`);
    } catch (exception) {
      const message =
        exception?.response?.data?.message ||
        exception?.message ||
        "No fue posible descargar el reporte.";

      setErrorMessage(message);
      notifyError(message);
    } finally {
      setActiveReport("");
    }
  };

  if (isLoading) return <Loader />;

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Debes iniciar sesion para ver los reportes." />
    );
  }

  return (
    <LandingTemplate>
      <section className="reportes-page">
        <div className="reportes-page__hero">
          <div>
            <Text variant="p" className="reportes-page__eyebrow">
              Panel de administracion
            </Text>
            <Text variant="h1">Reportes</Text>
            <Text variant="p" className="reportes-page__intro">
              Descarga los reportes ejecutivos del sistema desde un solo lugar.
            </Text>
          </div>

          <div className="reportes-page__hero-actions">
            <div className="reportes-page__summary-card">
              <Text variant="span" className="reportes-page__summary-label">
                Disponibles
              </Text>
              <Text variant="span" className="reportes-page__summary-value">
                4
              </Text>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="reportes-page__message">
            <Text variant="p">{errorMessage}</Text>
          </div>
        )}

        <div className="reportes-page__grid">
          {REPORTS.map((report) => {
            const isDownloading = activeReport === report.key;

            return (
              <article key={report.key} className="reportes-page__card">
                <div className="reportes-page__card-header">
                  <Text variant="h2">{report.title}</Text>
                  <Text variant="p">{report.description}</Text>
                </div>

                <Button
                  text={isDownloading ? "Descargando..." : report.buttonLabel}
                  onClick={() => handleDownload(report)}
                  className="reportes-page__button"
                  disabled={isDownloading}
                />
              </article>
            );
          })}
        </div>
      </section>
    </LandingTemplate>
  );
};

export default ReportesPage;

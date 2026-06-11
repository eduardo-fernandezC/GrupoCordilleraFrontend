import LandingTemplate from "../../components/templates/LandingTemplate";
import DashboardHeader from "../../components/molecules/DashboardHeader";
import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Text from "../../components/atoms/Text";
import StatCard from "../../components/atoms/StatCard";
import SalesReportList from "../../components/organisms/SalesReportList";
import useSalesReport from "../../hooks/useSalesReport";
import { formatCurrency } from "../../services/salesReportService";
import "../../styles/pages/SalesReportPage.css";

const SalesReportPage = () => {
  const {
    ventas,
    selectedVentaId,
    loading,
    error,
    page,
    totalPages,
    nextPage,
    previousPage,
    handleSelectVenta,
  } = useSalesReport();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const totalVentas = ventas.length;

  const totalIngresos = ventas.reduce((acc, venta) => acc + venta.total, 0);

  const promedioVenta = totalVentas > 0 ? totalIngresos / totalVentas : 0;

  const sucursalesUnicas = new Set(ventas.map((venta) => venta.sucursal.nombre))
    .size;

  return (
    <LandingTemplate>
      <section className="sales-report-page">
        <DashboardHeader
          title="Reporte de Ventas"
          subtitle="Visualización de ventas generales desde el endpoint principal"
        />

        <div className="sales-report-page__stats">
          <StatCard title="Cantidad de ventas" value={totalVentas} />

          <StatCard
            title="Ingresos totales"
            value={formatCurrency(totalIngresos)}
          />

          <StatCard
            title="Promedio por venta"
            value={formatCurrency(promedioVenta)}
          />

          <StatCard title="Sucursales activas" value={sucursalesUnicas} />
        </div>

        <div className="sales-report-page__layout">
          <div className="sales-report-page__list-panel">
            <div className="sales-report-page__section-header">
              <Text variant="h2">Ventas disponibles</Text>
              <Text variant="p">
                Haz clic en una venta para expandir su información.
              </Text>
            </div>

            <SalesReportList
              ventas={ventas}
              selectedVentaId={selectedVentaId}
              onSelectVenta={handleSelectVenta}
            />

            <div className="pagination">
              <button onClick={previousPage} disabled={page === 0}>
                Anterior
              </button>

              <span>
                Pagina {page + 1} de {Math.max(totalPages, 1)}
              </span>

              <button onClick={nextPage} disabled={page >= totalPages - 1}>
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </section>
    </LandingTemplate>
  );
};

export default SalesReportPage;

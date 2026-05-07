import LandingTemplate from "../../components/templates/LandingTemplate";
import DashboardHeader from "../../components/molecules/DashboardHeader";
import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Text from "../../components/atoms/Text";
import StatCard from "../../components/atoms/StatCard";
import SalesReportList from "../../components/organisms/SalesReportList";
import SaleDetailModal from "../../components/organisms/SaleDetailModal";
import useSalesReport from "../../hooks/useSalesReport";
import { formatCurrency } from "../../services/salesReportService";
import "../../styles/pages/SalesReportPage.css";

const SalesReportPage = () => {
  const {
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
  } = useSalesReport();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const totalVentas = ventas.length;
  const totalIngresos = ventas.reduce(
    (accumulator, venta) => accumulator + venta.total,
    0,
  );
  const totalProductos = ventas.reduce(
    (accumulator, venta) => accumulator + venta.cantidadProductos,
    0,
  );
  const promedioVenta = totalVentas > 0 ? totalIngresos / totalVentas : 0;

  return (
    <LandingTemplate>
      <section className="sales-report-page">
        <DashboardHeader
          title="Ventas"
          subtitle="Listado de ventas agrupadas desde el backend con acceso directo al detalle completo"
        />

        <div className="sales-report-page__stats">
          <StatCard title="Cantidad de ventas" value={totalVentas} />
          <StatCard
            title="Ingresos totales"
            value={formatCurrency(totalIngresos)}
          />
          <StatCard title="Productos vendidos" value={totalProductos} />
          <StatCard
            title="Promedio por venta"
            value={formatCurrency(promedioVenta)}
          />
        </div>

        <div className="sales-report-page__layout">
          <div className="sales-report-page__list-panel">
            <div className="sales-report-page__section-header">
              <Text variant="h2">Ventas disponibles</Text>
              <Text variant="p">
                Haz clic en una venta para abrir su detalle y ver productos,
                cantidades y subtotales.
              </Text>
            </div>

            <SalesReportList
              ventas={ventas}
              selectedVentaId={selectedVentaId}
              onSelectVenta={handleSelectVenta}
            />
          </div>
        </div>

        <SaleDetailModal
          isOpen={isModalOpen}
          selectedVenta={selectedVenta}
          ventaDetalle={ventaDetalle}
          loading={detailLoading}
          error={detailError}
          onClose={closeModal}
        />
      </section>
    </LandingTemplate>
  );
};

export default SalesReportPage;

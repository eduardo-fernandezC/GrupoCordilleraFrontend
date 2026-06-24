import useDashboardData from "../hooks/useDashboardData";
import LandingTemplate from "../components/templates/LandingTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";
import "../styles/pages/VentasMesPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const VentasMesPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Ventas del Mes";

  if (error)
    return (
      <LandingTemplate>
        <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />
      </LandingTemplate>
    );

  return (
    <LandingTemplate>
      <section className="ventas-page ventas-page--mes">
        <DashboardHeader title={title} subtitle="resumen mensual" />

        <div className="ventas-page__stats">
          <StatCard
            title="Ventas Totales Mes"
            value={loading ? "..." : "$" + data.ventasMes}
          />
          <StatCard
            title="Cantidad Ventas Mes"
            value={loading ? "..." : data.cantidadVentasMes}
          />
          <StatCard
            title="Promedio Mensual"
            value={loading ? "..." : "$" + data.promedioVentasMes}
          />
        </div>

        <div className="ventas-page__chart">
          {loading ? (
            <div className="ventas-page__loader">
              <Loader />
            </div>
          ) : (
            <SalesChart ventasHoy={data.ventasHoy} ventasMes={data.ventasMes} />
          )}
        </div>
      </section>
    </LandingTemplate>
  );
};

export default VentasMesPage;

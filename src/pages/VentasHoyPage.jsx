import useDashboardData from "../hooks/useDashboardData";
import LandingTemplate from "../components/templates/LandingTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";
import "../styles/pages/VentasHoyPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const VentasHoyPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Ventas de Hoy";

  if (error)
    return (
      <LandingTemplate>
        <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />
      </LandingTemplate>
    );

  return (
    <LandingTemplate>
      <section className="ventas-page ventas-page--hoy">
        <DashboardHeader
          title={title}
          subtitle="resumen de las ventas diarias"
        />

        <div className="ventas-page__stats">
          <StatCard
            title="Ventas Totales Hoy"
            value={loading ? "..." : "$" + data.ventasHoy}
          />
          <StatCard
            title="Cantidad Ventas"
            value={loading ? "..." : data.cantidadVentasHoy}
          />
          <StatCard
            title="Promedio Ventas"
            value={loading ? "..." : "$" + data.promedioVentasHoy}
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

export default VentasHoyPage;

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

  if (loading) return <Loader />;
  if (error)
    return <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />;

  return (
    <LandingTemplate>
      <section className="ventas-page ventas-page--mes">
        <DashboardHeader title={title} subtitle="resumen mensual" />
        <div className="ventas-page__stats">
          <StatCard title="Ventas Totales Mes" value={"$" + data.ventasMes} />
          <StatCard
            title="Cantidad Ventas Mes"
            value={data.cantidadVentasMes}
          />
          <StatCard
            title="Promedio Mensual"
            value={"$" + data.promedioVentasMes}
          />
        </div>

        <SalesChart ventasHoy={data.ventasHoy} ventasMes={data.ventasMes} />
      </section>
    </LandingTemplate>
  );
};

export default VentasMesPage;

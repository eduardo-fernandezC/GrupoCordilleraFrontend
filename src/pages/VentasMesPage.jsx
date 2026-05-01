import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";
import "../styles/pages/VentasMesPage.css";

const VentasMesPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <section className="ventas-page ventas-page--mes">
        <DashboardHeader title="ventas del Mes" subtitle="resumen mensual" />
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
    </DashboardTemplate>
  );
};

export default VentasMesPage;

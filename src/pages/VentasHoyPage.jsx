import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";
import "../styles/pages/VentasHoyPage.css";

const VentasHoyPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>; // en el futuro crear loaders
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <section className="ventas-page ventas-page--hoy">
        <DashboardHeader
          title="ventas de hoy"
          subtitle="resumen de las ventas diarias"
        />
        <div className="ventas-page__stats">
          <StatCard title="Ventas Totales Hoy" value={"$" + data.ventasHoy} />
          <StatCard title="Cantidad Ventas" value={data.cantidadVentasHoy} />
          <StatCard
            title="Promedio Ventas"
            value={"$" + data.promedioVentasHoy}
          />
        </div>

        <SalesChart ventasHoy={data.ventasHoy} ventasMes={data.ventasMes} />
      </section>
    </DashboardTemplate>
  );
};

export default VentasHoyPage;

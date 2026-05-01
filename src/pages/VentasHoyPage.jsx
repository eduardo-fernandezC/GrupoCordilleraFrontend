import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";

const VentasHoyPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>; // en el futuro crear loaders
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <DashboardHeader
        title="ventas de hoy"
        subtitle="resumen de las ventas diarias"
      />
      <div>
        <StatCard title="Ventas Totales Hoy" value={"$" + data.ventasHoy} />
        <StatCard title="Cantidad Ventas" value={data.cantidadVentasHoy} />
        <StatCard
          title="Promedio Vetnas"
          value={"$" + data.promedioVentasHoy}
        />
      </div>

      <SalesChart ventasHoy={data.ventasHoy} ventasMes={data.ventasMes} />
    </DashboardTemplate>
  );
};

export default VentasHoyPage;

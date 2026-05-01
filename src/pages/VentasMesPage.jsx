import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import SalesChart from "../components/organisms/SalesChart";

const VentasMesPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <DashboardHeader title="ventas del Mes" subtitle="resumen mensual" />
      <div>
        <StatCard title="Ventas Totales Mes" value={"$" + data.ventasMes} />
        <StatCard title="Cantidad Ventas Mes" value={data.cantidadVentasMes} />
        <StatCard
          title="Promedio Mensual"
          value={"$" + data.promedioVentasMes}
        />
      </div>

      <SalesChart ventasHoy={data.ventasHoy} ventasMes={data.ventasMes} />
    </DashboardTemplate>
  );
};

export default VentasMesPage;

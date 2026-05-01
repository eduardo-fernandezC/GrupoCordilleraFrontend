import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/organisms/StatCard";

const VentasCrecimientoPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <DashboardHeader
        title="Crecimiento de Ventas"
        subtitle="Inidcador de crecimiento"
      />
      <StatCard
        title="Crecimiento"
        value={"$" + data.crecimientoVentas + "%"}
      />
    </DashboardTemplate>
  );
};

export default VentasCrecimientoPage;

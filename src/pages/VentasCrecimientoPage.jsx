import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import "../styles/pages/VentasCrecimientoPage.css";
import { Loader } from "../components/atoms/Loader";

const VentasCrecimientoPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loader />;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <section className="ventas-page ventas-page--crecimiento">
        <DashboardHeader
          title="Crecimiento de Ventas"
          subtitle="Inidcador de crecimiento"
        />
        <div className="ventas-page__stats ventas-page__stats--single">
          <StatCard title="Crecimiento" value={data.crecimientoVentas + "%"} />
        </div>
      </section>
    </DashboardTemplate>
  );
};

export default VentasCrecimientoPage;

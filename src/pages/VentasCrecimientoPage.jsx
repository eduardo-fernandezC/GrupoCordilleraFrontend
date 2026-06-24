import useDashboardData from "../hooks/useDashboardData";
import LandingTemplate from "../components/templates/LandingTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import StatCard from "../components/atoms/StatCard";
import "../styles/pages/VentasCrecimientoPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const VentasCrecimientoPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Crecimiento de Ventas";

  if (error)
    return (
      <LandingTemplate>
        <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />
      </LandingTemplate>
    );

  return (
    <LandingTemplate>
      <section className="ventas-page ventas-page--crecimiento">
        <DashboardHeader title={title} subtitle="Indicador de crecimiento" />

        <div className="ventas-page__stats ventas-page__stats--single">
          <StatCard
            title="Crecimiento"
            value={loading ? "..." : `${data.crecimientoVentas}%`}
          />
        </div>

        {loading && (
          <div className="ventas-page__loader">
            <Loader />
          </div>
        )}
      </section>
    </LandingTemplate>
  );
};

export default VentasCrecimientoPage;

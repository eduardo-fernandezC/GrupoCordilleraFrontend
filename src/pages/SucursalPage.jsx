import useDashboardData from "../hooks/useDashboardData";
import LandingTemplate from "../components/templates/LandingTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import BranchChart from "../components/organisms/BranchChart";
import "../styles/pages/SucursalPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const SucursalPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Sucursales";

  if (error)
    return (
      <LandingTemplate>
        <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />
      </LandingTemplate>
    );

  return (
    <LandingTemplate>
      <section className="page-content page-content--sucursal">
        <DashboardHeader title={title} subtitle="rendimiento por sucursal" />
        <div className="sucursal-page__chart">
          {loading ? (
            <div className="sucursal-page__loader">
              <Loader />
            </div>
          ) : (
            <BranchChart sucursales={data.mejorVendedorPorSucursal} />
          )}
        </div>
      </section>
    </LandingTemplate>
  );
};

export default SucursalPage;

import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import BranchChart from "../components/organisms/BranchChart";
import "../styles/pages/SucursalPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const SucursalPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Sucursales";

  if (loading) return <Loader />;
  if (error)
    return <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />;

  return (
    <DashboardTemplate>
      <section className="page-content page-content--sucursal">
        <DashboardHeader title={title} subtitle="rendimiento por sucursal" />
        <BranchChart sucursales={data.mejorVendedorPorSucursal} />
      </section>
    </DashboardTemplate>
  );
};

export default SucursalPage;

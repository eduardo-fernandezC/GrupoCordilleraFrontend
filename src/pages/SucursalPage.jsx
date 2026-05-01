import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import BranchChart from "../components/organisms/BranchChart";
import "../styles/pages/SucursalPage.css";

const SucursalPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <section className="page-content page-content--sucursal">
        <DashboardHeader
          title="Sucursales"
          subtitle="rendimiento por sucursal"
        />
        <BranchChart sucursales={data.mejorVendedorPorSucursal} />
      </section>
    </DashboardTemplate>
  );
};

export default SucursalPage;

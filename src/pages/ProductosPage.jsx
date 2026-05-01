import useDashboardData from "../hooks/useDashboardData";
import DashboardTemplate from "../components/templates/DashboardTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import ProductChart from "../components/organisms/ProductChart";
import "../styles/pages/ProductosPage.css";

const ProductosPage = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <h1>Cargando...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <DashboardTemplate>
      <section className="page-content page-content--productos">
        <DashboardHeader
          title="Productos"
          subtitle="productos mas y menos vendidos"
        />
        <ProductChart
          productoMasVendido={data.productoMasVendido}
          productoMenosVendido={data.productoMenosVendido}
        />
      </section>
    </DashboardTemplate>
  );
};

export default ProductosPage;

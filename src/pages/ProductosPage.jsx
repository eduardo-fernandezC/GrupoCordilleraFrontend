import useDashboardData from "../hooks/useDashboardData";
import LandingTemplate from "../components/templates/LandingTemplate";
import DashboardHeader from "../components/molecules/DashboardHeader";
import ProductChart from "../components/organisms/ProductChart";
import "../styles/pages/ProductosPage.css";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

const ProductosPage = () => {
  const { data, loading, error } = useDashboardData();
  const title = "Estadisticas Productos";

  if (loading) return <Loader />;
  if (error)
    return <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />;

  return (
    <LandingTemplate>
      <section className="page-content page-content--productos">
        <DashboardHeader
          title={title}
          subtitle="productos mas y menos vendidos"
        />
        <ProductChart
          productoMasVendido={data.productoMasVendido}
          productoMenosVendido={data.productoMenosVendido}
        />
      </section>
    </LandingTemplate>
  );
};

export default ProductosPage;

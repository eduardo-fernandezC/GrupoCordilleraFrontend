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

  if (error)
    return (
      <LandingTemplate>
        <ErrorMessage message={`Error al cargar Dashboard de ${title}`} />
      </LandingTemplate>
    );

  return (
    <LandingTemplate>
      <section className="page-content page-content--productos">
        <DashboardHeader
          title={title}
          subtitle="productos mas y menos vendidos"
        />
        <div className="productos-page__chart">
          {loading ? (
            <div className="productos-page__loader">
              <Loader />
            </div>
          ) : (
            <ProductChart
              productoMasVendido={data.productoMasVendido}
              productoMenosVendido={data.productoMenosVendido}
            />
          )}
        </div>
      </section>
    </LandingTemplate>
  );
};

export default ProductosPage;

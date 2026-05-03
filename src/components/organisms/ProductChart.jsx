import ProductStatCard from "../atoms/ProductStatCard";
import "../../styles/components/organisms/ProductChart.css";

const ProductChart = ({ productoMasVendido, productoMenosVendido }) => {
  return (
    <section className="product-chart">
      <h2 className="product-chart__title">Productos Destacados</h2>

      <div className="product-chart__container">
        <ProductStatCard
          title="Producto Mas Vendido"
          productName={productoMasVendido.nombreProducto}
          quantity={productoMasVendido.cantidad}
        />
        <ProductStatCard
          title="Producto Menos Vendido"
          productName={productoMenosVendido.nombreProducto}
          quantity={productoMenosVendido.cantidad}
        />
      </div>
    </section>
  );
};

export default ProductChart;

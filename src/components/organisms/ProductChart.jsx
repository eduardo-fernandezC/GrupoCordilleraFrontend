import ProductStatCard from "../atoms/ProductStatCard";
import "../../styles/components/organisms/ProductChart.css";

const ProductChart = ({ productoMasVendido, productoMenosVendido }) => {
  const hasAnyData = Boolean(productoMasVendido || productoMenosVendido);

  return (
    <section className="product-chart">
      <h2 className="product-chart__title">Productos Destacados</h2>

      <div className="product-chart__container">
        {productoMasVendido ? (
          <ProductStatCard
            title="Producto Mas Vendido"
            productName={
              productoMasVendido.nombreProducto ??
              productoMasVendido.nombre ??
              productoMasVendido.producto ??
              "Sin nombre"
            }
            quantity={
              productoMasVendido.cantidad ?? productoMasVendido.total ?? 0
            }
          />
        ) : null}

        {productoMenosVendido ? (
          <ProductStatCard
            title="Producto Menos Vendido"
            productName={
              productoMenosVendido.nombreProducto ??
              productoMenosVendido.nombre ??
              productoMenosVendido.producto ??
              "Sin nombre"
            }
            quantity={
              productoMenosVendido.cantidad ?? productoMenosVendido.total ?? 0
            }
          />
        ) : null}

        {!hasAnyData ? (
          <p className="product-chart__empty-state">
            No hay productos destacados disponibles en este momento.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default ProductChart;

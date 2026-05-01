import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "../../styles/components/organisms/ProductChart.css";

const ProductChart = ({ productoMasVendido, productoMenosVendido }) => {
  const data = [
    {
      name: productoMasVendido.nombreProducto,
      value: productoMasVendido.cantidad,
    },
    {
      name: productoMenosVendido.nombreProducto,
      value: productoMenosVendido.cantidad,
    },
  ];

  return (
    <section className="product-chart">
      <h2 className="product-chart__title">Productos Destacados</h2>

      <div className="product-chart__container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100} label>
              {data.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ProductChart;

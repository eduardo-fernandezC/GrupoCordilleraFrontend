import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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
    <div>
      <h2>Productos Destacados</h2>

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
  );
};

export default ProductChart;

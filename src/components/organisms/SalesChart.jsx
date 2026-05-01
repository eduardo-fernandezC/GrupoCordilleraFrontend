import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SalesChart = ({ ventasHoy, ventasMes }) => {
  const chartData = [
    { name: "Hoy", ventas: ventasHoy },
    { name: "Mes", ventas: ventasMes },
  ];

  return (
    <div>
      <h2>Comparativa de Ventas</h2>

      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="ventas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

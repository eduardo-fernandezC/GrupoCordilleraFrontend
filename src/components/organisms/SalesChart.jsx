import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../../styles/components/organisms/SalesChart.css";

const SalesChart = ({ ventasHoy, ventasMes }) => {
  const chartData = [
    { name: "Hoy", ventas: ventasHoy },
    { name: "Mes", ventas: ventasMes },
  ];

  return (
    <section className="sales-chart">
      <h2 className="sales-chart__title">Comparativa de Ventas</h2>

      <div className="sales-chart__container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="ventas" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesChart;

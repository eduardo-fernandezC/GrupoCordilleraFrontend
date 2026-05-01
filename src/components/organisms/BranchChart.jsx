import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../../styles/components/organisms/BranchChart.css";

const BranchChart = ({ sucursales }) => {
  return (
    <section className="branch-chart">
      <h2 className="branch-chart__title">Rendimineto Sucursal</h2>

      <div className="branch-chart__container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sucursales}>
            <XAxis dataKey="sucursal" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="totalVendido" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default BranchChart;

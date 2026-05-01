import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BranchChart = ({ sucursales }) => {
  return (
    <div>
      <h2>Rendimineto Sucursal</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sucursales}>
          <XAxis dataKey="sucursal" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="totalVendido" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BranchChart;

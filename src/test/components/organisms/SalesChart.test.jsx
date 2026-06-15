import { render, screen } from "@testing-library/react";
import SalesChart from "../../../components/organisms/SalesChart";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
  CartesianGrid: () => <div>Grid</div>,
}));

describe("SalesChart Component", () => {
  it("renderiza el título", () => {
    render(
      <SalesChart
        ventasHoy={100}
        ventasMes={1000}
      />
    );

    expect(
      screen.getByText("Comparativa de Ventas")
    ).toBeInTheDocument();
  });

  it("renderiza el gráfico", () => {
    render(
      <SalesChart
        ventasHoy={100}
        ventasMes={1000}
      />
    );

    expect(
      screen.getByText("Bar")
    ).toBeInTheDocument();
  });
});
import { render, screen } from "@testing-library/react";
import BranchChart from "../../../components/organisms/BranchChart";

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe("BranchChart Component", () => {
  const sucursales = [
    {
      sucursal: "Santiago",
      totalVendido: 100000,
    },
  ];

  it("renderiza el título", () => {
    render(<BranchChart sucursales={sucursales} />);

    expect(
      screen.getByText("Rendimineto Sucursal")
    ).toBeInTheDocument();
  });

  it("renderiza el gráfico", () => {
    render(<BranchChart sucursales={sucursales} />);

    expect(
      screen.getByText("Bar")
    ).toBeInTheDocument();
  });
});
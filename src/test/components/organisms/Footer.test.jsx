import { render, screen } from "@testing-library/react";
import Footer from "../../../components/organisms/Footer";

describe("Footer Component", () => {
  it("renderiza el footer", () => {
    const { container } = render(<Footer />);

    expect(
      container.querySelector("footer")
    ).toBeInTheDocument();
  });

  it("renderiza FooterInfo", () => {
    render(<Footer />);

    expect(
      screen.getByText("Grupo Cordillera Dashboard")
    ).toBeInTheDocument();
  });
});
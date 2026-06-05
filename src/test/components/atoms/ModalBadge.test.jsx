import { render, screen } from "@testing-library/react";
import ModalBadge from "../../../components/atoms/ModalBadge";

describe("ModalBadge Component", () => {
  it("renderiza el símbolo por defecto", () => {
    render(<ModalBadge />);

    expect(screen.getByText("!")).toBeInTheDocument();
  });

  it("renderiza un símbolo personalizado", () => {
    render(<ModalBadge symbol="?" />);

    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("aplica la clase CSS correcta", () => {
    render(<ModalBadge />);

    expect(screen.getByText("!")).toHaveClass(
      "logout-modal__badge"
    );
  });

  it("tiene aria-hidden en true", () => {
    render(<ModalBadge />);

    expect(screen.getByText("!")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
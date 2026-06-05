import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Button from "../../../components/atoms/Button";

describe("Button Component", () => {
  it("renderiza children", () => {
    render(<Button>Guardar</Button>);

    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  it("renderiza text cuando no hay children", () => {
    render(<Button text="Enviar" />);

    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("ejecuta onClick al hacer click", () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick}>
        Click
      </Button>
    );

    fireEvent.click(screen.getByText("Click"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("aplica className personalizado", () => {
    render(
      <Button className="btn-custom">
        Botón
      </Button>
    );

    expect(screen.getByText("Botón")).toHaveClass("btn-custom");
  });

  it("usa type button por defecto", () => {
    render(<Button>Default</Button>);

    expect(screen.getByRole("button")).toHaveAttribute(
      "type",
      "button"
    );
  });

  it("usa type personalizado", () => {
    render(
      <Button type="submit">
        Guardar
      </Button>
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "type",
      "submit"
    );
  });
});
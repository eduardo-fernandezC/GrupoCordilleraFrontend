import { render, screen } from "@testing-library/react";
import Text from "../../../components/atoms/Text";

describe("Text Component", () => {
  it("renderiza contenido correctamente", () => {
    render(<Text>Hola Mundo</Text>);

    expect(screen.getByText("Hola Mundo")).toBeInTheDocument();
  });

  it("renderiza un párrafo por defecto", () => {
    render(<Text>Texto</Text>);

    expect(screen.getByText("Texto").tagName).toBe("P");
  });

  it("renderiza el variant recibido", () => {
    render(<Text variant="h1">Título</Text>);

    expect(screen.getByText("Título").tagName).toBe("H1");
  });

  it("aplica clases CSS", () => {
    render(
      <Text className="titulo-principal">
        Texto
      </Text>
    );

    expect(screen.getByText("Texto")).toHaveClass("titulo-principal");
  });
});
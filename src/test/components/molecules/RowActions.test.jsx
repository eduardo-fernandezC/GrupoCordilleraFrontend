import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import RowActions from "../../../components/molecules/RowActions";

describe("RowActions Component", () => {
  it("renderiza botón editar", () => {
    render(<RowActions />);

    expect(
      screen.getByText("Editar")
    ).toBeInTheDocument();
  });

  it("renderiza botón eliminar", () => {
    render(<RowActions />);

    expect(
      screen.getByText("Eliminar")
    ).toBeInTheDocument();
  });

  it("ejecuta onEdit", () => {
    const onEdit = vi.fn();

    render(
      <RowActions
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(
      screen.getByText("Editar")
    );

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it("ejecuta onDelete", () => {
    const onDelete = vi.fn();

    render(
      <RowActions
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    fireEvent.click(
      screen.getByText("Eliminar")
    );

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
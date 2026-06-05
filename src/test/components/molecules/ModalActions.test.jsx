import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ModalActions from "../../../components/molecules/ModalActions";

describe("ModalActions Component", () => {
  it("renderiza botón cancelar", () => {
    render(<ModalActions />);

    expect(
      screen.getByText("Cancelar")
    ).toBeInTheDocument();
  });

  it("renderiza botón confirmar", () => {
    render(<ModalActions />);

    expect(
      screen.getByText("Si, salir")
    ).toBeInTheDocument();
  });

  it("renderiza textos personalizados", () => {
    render(
      <ModalActions
        cancelLabel="No"
        confirmLabel="Sí"
      />
    );

    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
  });

  it("ejecuta onCancel", () => {
    const onCancel = vi.fn();

    render(
      <ModalActions
        onCancel={onCancel}
      />
    );

    fireEvent.click(
      screen.getByText("Cancelar")
    );

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("ejecuta onConfirm", () => {
    const onConfirm = vi.fn();

    render(
      <ModalActions
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(
      screen.getByText("Si, salir")
    );

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ConfirmModal from "../../../components/organisms/ConfirmModal";

describe("ConfirmModal Component", () => {
  const props = {
    isOpen: true,
    title: "Cerrar sesión",
    description: "¿Desea salir?",
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };

  it("no renderiza cuando isOpen es false", () => {
    render(
      <ConfirmModal
        {...props}
        isOpen={false}
      />
    );

    expect(
      screen.queryByRole("dialog")
    ).not.toBeInTheDocument();
  });

  it("renderiza título", () => {
    render(<ConfirmModal {...props} />);

    expect(
      screen.getByText("Cerrar sesión")
    ).toBeInTheDocument();
  });

  it("renderiza descripción", () => {
    render(<ConfirmModal {...props} />);

    expect(
      screen.getByText("¿Desea salir?")
    ).toBeInTheDocument();
  });

  it("ejecuta onCancel", () => {
    const onCancel = vi.fn();

    render(
      <ConfirmModal
        {...props}
        onCancel={onCancel}
      />
    );

    fireEvent.click(
      screen.getByText("Cancelar")
    );

    expect(onCancel).toHaveBeenCalled();
  });

  it("ejecuta onConfirm", () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmModal
        {...props}
        onConfirm={onConfirm}
      />
    );

    fireEvent.click(
      screen.getByText("Si, salir")
    );

    expect(onConfirm).toHaveBeenCalled();
  });
});
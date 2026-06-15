import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ModalOverlay from "../../../components/atoms/ModalOverlay";

describe("ModalOverlay Component", () => {
  it("renderiza los children", () => {
    render(
      <ModalOverlay>
        <p>Contenido Modal</p>
      </ModalOverlay>
    );

    expect(
      screen.getByText("Contenido Modal")
    ).toBeInTheDocument();
  });

  it("ejecuta onClose al hacer click", () => {
    const handleClose = vi.fn();

    render(
      <ModalOverlay onClose={handleClose}>
        <p>Modal</p>
      </ModalOverlay>
    );

    fireEvent.click(screen.getByRole("presentation"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("tiene role presentation", () => {
    render(
      <ModalOverlay>
        <p>Modal</p>
      </ModalOverlay>
    );

    expect(
      screen.getByRole("presentation")
    ).toBeInTheDocument();
  });
});
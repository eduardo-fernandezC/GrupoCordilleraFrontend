import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Analyst from "../../pages/Analyst";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Analyst", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    render(
      <MemoryRouter>
        <Analyst />
      </MemoryRouter>,
    );

    expect(screen.getByText("Analista")).toBeInTheDocument();
  });

  it("navega a ventas hoy", () => {
    render(
      <MemoryRouter>
        <Analyst />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /visualizar ventas de hoy/i,
      }),
    );

    expect(navigateMock).toHaveBeenCalledWith("/ventasHoy");
  });

  it("navega a ventas mes", () => {
    render(
      <MemoryRouter>
        <Analyst />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /visualizar ventas del mes/i,
      }),
    );

    expect(navigateMock).toHaveBeenCalledWith("/ventasMes");
  });
});

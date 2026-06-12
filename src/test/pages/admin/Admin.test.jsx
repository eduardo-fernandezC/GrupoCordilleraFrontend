import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Admin from "../../../pages/admin/Admin";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Admin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>,
    );

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("navega a ventas", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /ver ventas/i }));

    expect(navigateMock).toHaveBeenCalledWith("/adminVentas");
  });

  it("navega a productos", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /administrar productos/i,
      }),
    );

    expect(navigateMock).toHaveBeenCalledWith("/adminProductos");
  });

  it("navega a reportes", () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /ver reportes/i,
      }),
    );

    expect(navigateMock).toHaveBeenCalledWith("/adminReportes");
  });
});

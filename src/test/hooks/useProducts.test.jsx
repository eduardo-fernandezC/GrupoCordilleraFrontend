import { renderHook, waitFor, act } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    getAccessTokenSilently: vi.fn().mockResolvedValue("token"),
  }),
}));

vi.mock("../../services/productService", () => ({
  getProducts: vi.fn(),
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
}));

import * as productService from "../../services/productService";
import useProducts from "../../hooks/useProducts";

describe("useProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    productService.getProducts.mockResolvedValue([
      {
        id: 1,
        nombre: "Mouse",
      },
    ]);
  });

  it("carga productos al iniciar", async () => {
    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.products).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it("createProduct ejecuta servicio", async () => {
    productService.createProduct.mockResolvedValue({});

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    await act(async () => {
      await result.current.createProduct({
        nombre: "Teclado",
      });
    });

    expect(productService.createProduct)
      .toHaveBeenCalled();
  });

  it("updateProduct ejecuta servicio", async () => {
    productService.updateProduct.mockResolvedValue({});

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    await act(async () => {
      await result.current.updateProduct(
        1,
        {
          nombre: "Nuevo Mouse",
        }
      );
    });

    expect(productService.updateProduct)
      .toHaveBeenCalled();
  });

  it("deleteProduct ejecuta servicio", async () => {
    productService.deleteProduct.mockResolvedValue({});

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    await act(async () => {
      await result.current.deleteProduct(1);
    });

    expect(productService.deleteProduct)
      .toHaveBeenCalled();
  });

  it("maneja errores al cargar", async () => {
    productService.getProducts.mockRejectedValue(
      new Error("Error")
    );

    const { result } = renderHook(() =>
      useProducts()
    );

    await waitFor(() =>
      expect(result.current.loading).toBe(false)
    );

    expect(result.current.error).toBe(
      "Error cargando productos"
    );
  });
});
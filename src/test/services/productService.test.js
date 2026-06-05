import { vi } from "vitest";

const dataApiMock = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("../../services/api/DataApi", () => ({
  default: dataApiMock,
}));

import DataApi from "../../services/api/DataApi";

const importProductService = async () => {
  vi.resetModules();

  vi.stubEnv("VITE_DATA_URL", "http://localhost:3000/api");

  return import("../../services/productService");
};

describe("productService", () => {
  const token = "token-test";

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("obtiene productos", async () => {
    const { getProducts } = await importProductService();

    const products = [
      {
        idProducto: 1,
        nombre: "Mouse",
      },
    ];

    DataApi.get.mockResolvedValue({
      data: products,
    });

    const result = await getProducts(token);

    expect(DataApi.get).toHaveBeenCalledWith(
      "http://localhost:3000/api/productos",
      authConfig,
    );

    expect(result).toEqual(products);
  });

  it("crea un producto", async () => {
    const { createProduct } = await importProductService();

    const product = {
      nombre: "Mouse",
      categoria: "Perifericos",
      precio: 1000,
      stock: 10,
    };

    const createdProduct = {
      idProducto: 1,
      ...product,
    };

    DataApi.post.mockResolvedValue({
      data: createdProduct,
    });

    const result = await createProduct(token, product);

    expect(DataApi.post).toHaveBeenCalledWith(
      "http://localhost:3000/api/productos",
      product,
      authConfig,
    );

    expect(result).toEqual(createdProduct);
  });

  it("actualiza un producto", async () => {
    const { updateProduct } = await importProductService();

    const product = {
      nombre: "Teclado",
      categoria: "Perifericos",
      precio: 2000,
      stock: 5,
    };

    const updatedProduct = {
      idProducto: 1,
      ...product,
    };

    DataApi.put.mockResolvedValue({
      data: updatedProduct,
    });

    const result = await updateProduct(token, 1, product);

    expect(DataApi.put).toHaveBeenCalledWith(
      "http://localhost:3000/api/productos/1",
      product,
      authConfig,
    );

    expect(result).toEqual(updatedProduct);
  });

  it("elimina un producto", async () => {
    const { deleteProduct } = await importProductService();

    const response = {
      message: "Producto eliminado",
    };

    DataApi.delete.mockResolvedValue({
      data: response,
    });

    const result = await deleteProduct(token, 1);

    expect(DataApi.delete).toHaveBeenCalledWith(
      "http://localhost:3000/api/productos/1",
      authConfig,
    );

    expect(result).toEqual(response);
  });

  it("codifica el id del producto en la URL", async () => {
    const { updateProduct } = await importProductService();

    const product = {
      nombre: "Producto especial",
    };

    DataApi.put.mockResolvedValue({
      data: product,
    });

    await updateProduct(token, "abc 123", product);

    expect(DataApi.put).toHaveBeenCalledWith(
      "http://localhost:3000/api/productos/abc%20123",
      product,
      authConfig,
    );
  });
});

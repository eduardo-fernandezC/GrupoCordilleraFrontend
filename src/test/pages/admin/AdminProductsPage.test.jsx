import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import AdminProductsPage from "../../../pages/admin/AdminProductsPage";

import useProducts from "../../../hooks/useProducts";

import {
  notifySuccess,
  notifyError,
} from "../../../services/NotificationService";

import { validateProductForm } from "../../../validations/product.validation";

const { auth0Mock } = vi.hoisted(() => ({
  auth0Mock: vi.fn(),
}));

vi.mock("@auth0/auth0-react", () => ({
  useAuth0: auth0Mock,
}));

vi.mock("../../../auth/Roles", () => ({
  getRoles: () => ["ADMIN"],
}));

vi.mock("../../../hooks/useProducts");
vi.mock("../../../services/NotificationService");
vi.mock("../../../validations/product.validation");

vi.mock("../../../components/templates/LandingTemplate", () => ({
  default: ({ children }) => <div>{children}</div>,
}));

vi.mock("../../../components/atoms/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../../../components/atoms/ErrorMessage", () => ({
  default: ({ message }) => <div>{message}</div>,
}));

vi.mock("../../../components/organisms/ProductTable", () => ({
  default: ({ products, onEdit, onDelete }) => (
    <div>
      <span>Tabla Productos</span>

      <button onClick={() => onEdit(products[0])}>Editar Producto</button>

      <button onClick={() => onDelete(products[0])}>Eliminar Producto</button>
    </div>
  ),
}));

vi.mock("../../../components/organisms/FormSection", () => ({
  default: ({ onSave, onCancel }) => (
    <div>
      <button
        onClick={() =>
          onSave({
            nombre: "Producto",
            categoria: "Categoria",
            precio: "1000",
            stock: "5",
          })
        }
      >
        Guardar Formulario
      </button>

      <button onClick={onCancel}>Cancelar Formulario</button>
    </div>
  ),
}));

vi.mock("../../../components/organisms/DeleteProductModal", () => ({
  default: ({ product, onConfirm, onCancel }) =>
    product ? (
      <div>
        <button onClick={onConfirm}>Confirmar Eliminacion</button>

        <button onClick={onCancel}>Cancelar Eliminacion</button>
      </div>
    ) : null,
}));

describe("AdminProductsPage", () => {
  const createProductMock = vi.fn();
  const updateProductMock = vi.fn();
  const deleteProductMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    auth0Mock.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: {
        name: "Admin Test",
      },
    });

    useProducts.mockReturnValue({
      products: [
        {
          idProducto: 1,
          nombre: "Mouse",
          categoria: "Accesorios",
        },
      ],
      loading: false,
      error: null,
      createProduct: createProductMock,
      updateProduct: updateProductMock,
      deleteProduct: deleteProductMock,
    });

    validateProductForm.mockReturnValue({});
  });

  it("muestra loader", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      createProduct: createProductMock,
      updateProduct: updateProductMock,
      deleteProduct: deleteProductMock,
    });

    render(<AdminProductsPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("muestra error", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: "Error productos",
      createProduct: createProductMock,
      updateProduct: updateProductMock,
      deleteProduct: deleteProductMock,
    });

    render(<AdminProductsPage />);

    expect(screen.getByText("Error productos")).toBeInTheDocument();
  });

  it("muestra estado vacío", () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: null,
      createProduct: createProductMock,
      updateProduct: updateProductMock,
      deleteProduct: deleteProductMock,
    });

    render(<AdminProductsPage />);

    expect(
      screen.getByText("No hay productos disponibles"),
    ).toBeInTheDocument();
  });

  it("abre modal crear producto", () => {
    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Crear Producto"));

    expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
  });

  it("crea producto correctamente", async () => {
    createProductMock.mockResolvedValue({});

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Crear Producto"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(createProductMock).toHaveBeenCalledWith({
        nombre: "Producto",
        categoria: "Categoria",
        precio: 1000,
        stock: 5,
      });
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Producto creado correctamente.",
    );
  });

  it("edita producto correctamente", async () => {
    updateProductMock.mockResolvedValue({});

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Editar Producto"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(updateProductMock).toHaveBeenCalledWith(1, {
        nombre: "Producto",
        categoria: "Categoria",
        precio: 1000,
        stock: 5,
      });
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Producto actualizado correctamente.",
    );
  });

  it("maneja error de validación", async () => {
    validateProductForm.mockReturnValue({
      nombre: "Error",
    });

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Crear Producto"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    expect(createProductMock).not.toHaveBeenCalled();
    expect(updateProductMock).not.toHaveBeenCalled();
  });

  it("maneja error al guardar", async () => {
    createProductMock.mockRejectedValue(new Error("Error guardar"));

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Crear Producto"));

    fireEvent.click(screen.getByText("Guardar Formulario"));

    await waitFor(() => {
      expect(createProductMock).toHaveBeenCalled();
    });
  });

  it("elimina producto correctamente", async () => {
    deleteProductMock.mockResolvedValue({});

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Eliminar Producto"));

    fireEvent.click(screen.getByText("Confirmar Eliminacion"));

    await waitFor(() => {
      expect(deleteProductMock).toHaveBeenCalledWith(1);
    });

    expect(notifySuccess).toHaveBeenCalledWith(
      "Producto eliminado correctamente.",
    );
  });

  it("maneja error al eliminar", async () => {
    deleteProductMock.mockRejectedValue(new Error("Error delete"));

    render(<AdminProductsPage />);

    fireEvent.click(screen.getByText("Eliminar Producto"));

    fireEvent.click(screen.getByText("Confirmar Eliminacion"));

    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith(
        "Error al eliminar: Error delete",
      );
    });
  });
});

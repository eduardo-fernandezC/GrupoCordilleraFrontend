import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Button from "../../components/atoms/Button";
import ProductTable from "../../components/organisms/ProductTable";
import DeleteProductModal from "../../components/organisms/DeleteProductModal";
import useProducts from "../../hooks/useProducts";
import { useState } from "react";
import "../../styles/pages/AdminProductsPage.css";
import FormSection from "../../components/organisms/FormSection";
import {
  notifySuccess,
  notifyError,
} from "../../services/NotificationService.js";
import Text from "../../components/atoms/Text";

const emptyForm = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
};

const isIntegerString = (value) => /^\d+$/.test(String(value ?? "").trim());

const AdminProductsPage = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const totalProducts = products.length;

  const handleCreate = () => {
    setEditingProduct(null);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateProductForm = (payload, originalProduct = null) => {
    const errors = {};

    if (!payload.nombre || !payload.nombre.trim()) {
      errors.nombre = "El nombre es obligatorio.";
    }

    if (!payload.categoria || !payload.categoria.trim()) {
      errors.categoria = "La categoria es obligatoria.";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(payload.categoria)) {
      errors.categoria = "La categoria solo puede contener letras y espacios.";
    }

    if (
      payload.precio === undefined ||
      payload.precio === null ||
      Number(payload.precio) <= 0
    ) {
      errors.precio = "El precio debe ser mayor a 0.";
    }

    if (!isIntegerString(payload.stock)) {
      errors.stock = "El stock debe ser un numero entero.";
    } else if (Number(payload.stock) < 0) {
      errors.stock = "El stock no puede ser negativo.";
    }

    if (originalProduct) {
      const noChanges =
        (payload.nombre || "").trim() === (originalProduct.nombre || "") &&
        (payload.categoria || "").trim() ===
          (originalProduct.categoria || "") &&
        Number(payload.precio) === Number(originalProduct.precio) &&
        Number(payload.stock) === Number(originalProduct.stock);

      if (noChanges) {
        errors.general = "No se detectaron cambios para guardar.";
      }
    }

    return errors;
  };

  const handleSave = async (payload) => {
    const validationErrors = validateProductForm(payload, editingProduct);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const normalizedPayload = {
        ...payload,
        precio: Number(payload.precio),
        stock: Number(payload.stock),
      };

      if (editingProduct) {
        await updateProduct(editingProduct.idProducto, normalizedPayload);
        notifySuccess("Producto actualizado correctamente.");
      } else {
        await createProduct(normalizedPayload);
        notifySuccess("Producto creado correctamente.");
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      setFormErrors({});
    } catch (err) {
      setFormErrors({ general: err.message || "Error al guardar" });
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.idProducto);
      notifySuccess("Producto eliminado correctamente.");
      setProductToDelete(null);
    } catch (err) {
      notifyError(`Error al eliminar: ${err.message}`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <LandingTemplate>
      <section className="admin-products-page">
        {/* Hero Section */}
        <div className="admin-products-page__hero">
          <div>
            <Text variant="p" className="admin-products-page__eyebrow">
              Gestión
            </Text>
            <Text variant="h1">Administrar Productos</Text>
            <Text variant="p" className="admin-products-page__intro">
              Crea, edita y elimina productos del catálogo
            </Text>
          </div>
          <div className="admin-products-page__hero-actions">
            <div className="admin-products-page__summary-card">
              <Text
                variant="span"
                className="admin-products-page__summary-label"
              >
                Total
              </Text>
              <Text
                variant="span"
                className="admin-products-page__summary-value"
              >
                {totalProducts}
              </Text>
            </div>
            <Button text="Crear Producto" onClick={handleCreate} />
          </div>
        </div>

        {/* Table Section */}
        <div className="admin-products-page__table-card">
          <div className="admin-products-page__table-header">
            <Text variant="h2">Productos</Text>
          </div>

          {products.length > 0 ? (
            <div className="admin-products-page__table-wrap">
              <ProductTable
                products={products}
                onEdit={handleEdit}
                onDelete={setProductToDelete}
              />
            </div>
          ) : (
            <Text variant="p" className="admin-products-page__empty-state">
              No hay productos disponibles
            </Text>
          )}
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="admin-products-page__modal">
            <div className="admin-products-page__dialog">
              <div className="admin-products-page__dialog-header">
                <Text
                  variant="p"
                  className="admin-products-page__dialog-eyebrow"
                >
                  {editingProduct ? "Editar" : "Crear"}
                </Text>
                <Text variant="h2">
                  {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                </Text>
              </div>

              <FormSection
                product={editingProduct || emptyForm}
                errors={formErrors}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingProduct(null);
                  setFormErrors({});
                }}
              />
            </div>
          </div>
        )}

        {/* Delete Modal */}
        <DeleteProductModal
          product={productToDelete}
          onCancel={() => setProductToDelete(null)}
          onConfirm={handleDelete}
        />
      </section>
    </LandingTemplate>
  );
};

export default AdminProductsPage;

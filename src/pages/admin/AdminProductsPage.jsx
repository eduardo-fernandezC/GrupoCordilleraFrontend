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
import NotificationContainer from "../../components/atoms/Notification";
import { notifySuccess, notifyError } from "../../services/notificationService";

const emptyForm = {
  nombre: "",
  categoria: "",
  precio: "",
  stock: "",
};

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

  // const totalProducts = useMemo(() => products.length, [products]); // realmente no es necesario usarlo aqui
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

  const handleSave = async (payload) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.idProducto, payload);
        notifySuccess("Producto actualizado correctamente.");
      } else {
        await createProduct(payload);
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
            <p className="admin-products-page__eyebrow">Gestión</p>
            <h1>Administrar Productos</h1>
            <p className="admin-products-page__intro">
              Crea, edita y elimina productos del catálogo
            </p>
          </div>
          <div className="admin-products-page__hero-actions">
            <div className="admin-products-page__summary-card">
              <span className="admin-products-page__summary-label">Total</span>
              <span className="admin-products-page__summary-value">
                {totalProducts}
              </span>
            </div>
            <Button text="Crear Producto" onClick={handleCreate} />
          </div>
        </div>

        {/* Table Section */}
        <div className="admin-products-page__table-card">
          <div className="admin-products-page__table-header">
            <h2>Productos</h2>
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
            <p className="admin-products-page__empty-state">
              No hay productos disponibles
            </p>
          )}
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="admin-products-page__modal">
            <div className="admin-products-page__dialog">
              <div className="admin-products-page__dialog-header">
                <p className="admin-products-page__dialog-eyebrow">
                  {editingProduct ? "Editar" : "Crear"}
                </p>
                <h2>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
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
        <NotificationContainer />
      </section>
    </LandingTemplate>
  );
};

export default AdminProductsPage;

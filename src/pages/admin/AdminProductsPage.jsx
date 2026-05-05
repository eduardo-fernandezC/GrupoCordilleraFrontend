import { Loader } from "../../components/atoms/Loader";
import { ErrorMessage } from "../../components/atoms/ErrorMessage";
import { Text } from "../../components/atoms/Text";
import { LandingTemplate } from "../../components/templates/LandingTemplate";
import Button from "../../components/atoms/Button";
import ProductTable from "../../components/organisms/ProductTable";
import DeleteProductModal from "../../components/organisms/DeleteProductModal";
import { useProducts } from "../../hooks/useProducts";
import { useState, useMemo } from "react";

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
  const [actionMessage, setActionMessage] = useState("");

  const totalProducts = useMemo(() => products.length, [products]);

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = async (payload) => {
    if (editingProduct) {
      await updateProduct(editingProduct.idProducto, payload);
      setActionMessage("Producto actualizado correctamente.");
    } else {
      await createProduct(payload);
      setActionMessage("Producto creado correctamente.");
    }

    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete.idProducto);
    setActionMessage("Producto eliminado correctamente.");
    setProductToDelete(null);
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <LandingTemplate>
      <section>
        <header>
          <div>
            <Text variant="h1">Administrar Productos</Text>
            <Text variant="p">Crea, edita y elimina productos</Text>
          </div>
          <div>
            <Text variant="strong">{totalProducts}</Text>
            <Button Text="Crear Producto" onClick={handleCreate} />
          </div>
        </header>

        {actionMessage && <div role="status">{actionMessage}</div>}

        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={setProductToDelete}
        />

        <ProductTable
          isOpen={isFormOpen}
          products={editingProduct || emptyForm}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />

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

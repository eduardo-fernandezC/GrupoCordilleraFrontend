import ConfirmModal from "./ConfirmModal";

const DeleteProductModal = ({ product, onCancel, onConfirm }) => {
  const isOpen = Boolean(product);

  return (
    <ConfirmModal
      isOpen={isOpen}
      eyebrow="Eliminar Producto"
      badgeSymbol="X"
      title={product ? `Borrar ${product.nombre}` : "Borrar producto"}
      description={
        product
          ? `Esta accion eliminara el producto ${product.nombre} de forma permanente`
          : "Esta accion eliminara el producto de forma permanente."
      }
      cancelLabel="Cancelar"
      confirmLabel="Eliminar"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};

export default DeleteProductModal;

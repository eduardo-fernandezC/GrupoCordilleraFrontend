import ErrorMessage from "../atoms/ErrorMessage";
import ProductRowActions from "../molecules/ProductRowActions";

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products.length)
    return <ErrorMessage message="No hay productos cargados aun." />;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.idProducto}>
            <td>{product.idProducto}</td>
            <td>{product.nombre}</td>
            <td>{product.categoria}</td>
            <td>{product.precio}</td>
            <td>{product.stock}</td>
            <td>
              <ProductRowActions
                onEdit={() => onEdit(product)}
                onDelete={() => onDelete(product)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

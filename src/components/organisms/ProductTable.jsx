import ErrorMessage from "../atoms/ErrorMessage";
import RowActions from "../molecules/RowActions";
import "../../styles/components/organisms/CrudTable.css";

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products.length)
    return <ErrorMessage message="No hay productos cargados aun." />;

  return (
    <table className="crud-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría</th>
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
            <td>${parseFloat(product.precio).toFixed(2)}</td>
            <td>{product.stock}</td>
            <td>
              <RowActions
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

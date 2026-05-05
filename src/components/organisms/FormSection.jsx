import { useState } from "react";
import Button from "../atoms/Button";

// Form Component
const FormSection = ({ product, errors, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-products-page__form">
      {errors.general && (
        <p className="admin-products-page__form-error">{errors.general}</p>
      )}

      <div className="admin-products-page__field">
        <span>Nombre</span>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        {errors.nombre && (
          <p className="admin-products-page__form-error">{errors.nombre}</p>
        )}
      </div>

      <div className="admin-products-page__field">
        <span>Categoría</span>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          required
        />
        {errors.categoria && (
          <p className="admin-products-page__form-error">{errors.categoria}</p>
        )}
      </div>

      <div className="admin-products-page__field">
        <span>Precio</span>
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          placeholder="0.00"
          step="0.01"
          required
        />
        {errors.precio && (
          <p className="admin-products-page__form-error">{errors.precio}</p>
        )}
      </div>

      <div className="admin-products-page__field">
        <span>Stock</span>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
          required
        />
        {errors.stock && (
          <p className="admin-products-page__form-error">{errors.stock}</p>
        )}
      </div>

      <div className="admin-products-page__form-actions">
        <Button
          type="button"
          onClick={onCancel}
          className="admin-products-page__action-button admin-products-page__action-button--secondary"
        >
          Cancelar
        </Button>
        <Button text="Guardar" type="submit" />
      </div>
    </form>
  );
};

export default FormSection;

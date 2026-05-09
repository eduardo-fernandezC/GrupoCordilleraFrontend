import { useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

// Form Component
const FormSection = ({ product, errors, onSave, onCancel }) => {
  const [formData, setFormData] = useState(product);

  const sanitizeIntegerInput = (value) => value.replace(/\D/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "precio" || name === "stock") {
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizeIntegerInput(value),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumericKeyDown = (e) => {
    if (e.key === "." || e.key === ",") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-products-page__form">
      {errors.general && (
        <Text variant="p" className="admin-products-page__form-error">
          {errors.general}
        </Text>
      )}

      <div className="admin-products-page__field">
        <Text variant="span">Nombre</Text>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        {errors.nombre && (
          <Text variant="p" className="admin-products-page__form-error">
            {errors.nombre}
          </Text>
        )}
      </div>

      <div className="admin-products-page__field">
        <Text variant="span">Categoría</Text>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          required
        />
        {errors.categoria && (
          <Text variant="p" className="admin-products-page__form-error">
            {errors.categoria}
          </Text>
        )}
      </div>

      <div className="admin-products-page__field">
        <Text variant="span">Precio</Text>
        <input
          type="text"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          onKeyDown={handleNumericKeyDown}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          required
        />
        {errors.precio && (
          <Text variant="p" className="admin-products-page__form-error">
            {errors.precio}
          </Text>
        )}
      </div>

      <div className="admin-products-page__field">
        <Text variant="span">Stock</Text>
        <input
          type="text"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          onKeyDown={handleNumericKeyDown}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="0"
          required
        />
        {errors.stock && (
          <Text variant="p" className="admin-products-page__form-error">
            {errors.stock}
          </Text>
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

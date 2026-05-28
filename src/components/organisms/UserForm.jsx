import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import "../../styles/components/organisms/UserForm.css";
import { PASSWORD_PATTERN } from "../../validations/regex";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const UserForm = ({ user, errors, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user || initialState);

  const isEditing = Boolean(user?.user_id);

  useEffect(() => {
    setFormData(user || initialState);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-users-page__form">
      {errors.general && (
        <Text variant="p" className="admin-users-page__form-error">
          {errors.general}
        </Text>
      )}

      <div className="admin-users-page__field">
        <Text variant="span">Nombre</Text>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre del usuario"
          autoComplete="name"
          required
        />
        {errors.name && (
          <Text variant="p" className="admin-users-page__form-error">
            {errors.name}
          </Text>
        )}
      </div>

      <div className="admin-users-page__field">
        <Text variant="span">Correo</Text>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          pattern="^[^\\s@]+@(?:[A-Za-z-]+\\.)+[A-Za-z]{2,}$"
          title="El dominio del correo no puede contener números."
          required
        />
        {errors.email && (
          <Text variant="p" className="admin-users-page__form-error">
            {errors.email}
          </Text>
        )}
      </div>

      <div className="admin-users-page__field">
        <Text variant="span">Contraseña</Text>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={
            isEditing ? "Dejar en blanco para conservar" : "Contraseña"
          }
          autoComplete="new-password"
          pattern={PASSWORD_PATTERN}
          title="La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial."
          required={!isEditing}
        />
        {errors.password && (
          <Text variant="p" className="admin-users-page__form-error">
            {errors.password}
          </Text>
        )}
      </div>

      <div className="admin-users-page__form-actions">
        <Button
          type="button"
          onClick={onCancel}
          className="admin-users-page__action-button admin-users-page__action-button--secondary"
        >
          Cancelar
        </Button>
        <Button text="Guardar" type="submit" />
      </div>
    </form>
  );
};

export default UserForm;

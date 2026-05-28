import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import UserTable from "../../components/organisms/UserTable";
import UserForm from "../../components/organisms/UserForm";
import Button from "../../components/atoms/Button";
import ConfirmModal from "../../components/organisms/ConfirmModal";
import { useState } from "react";
import useUsers from "../../hooks/useUsers";
import {
  notifyError,
  notifySuccess,
} from "../../services/NotificationService.js";
import "../../styles/pages/AdminUsersPage.css";

const emptyForm = {
  name: "",
  email: "",
  password: "",
};

const isEmailValid = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());

const AdminUsersPage = () => {
  const { users, loading, error, createUser, updateUser, deleteUser } =
    useUsers();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const totalUsers = users.length;

  const handleCreate = () => {
    setEditingUser(null);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormErrors({});
    setIsFormOpen(true);
  };

  const validateUserForm = (payload, originalUser = null) => {
    const errors = {};

    if (!payload.name || !payload.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }

    if (!payload.email || !payload.email.trim()) {
      errors.email = "El correo es obligatorio.";
    } else if (!isEmailValid(payload.email)) {
      errors.email = "El correo no tiene un formato valido.";
    }

    if (!originalUser && (!payload.password || !payload.password.trim())) {
      errors.password = "La contraseña es obligatoria.";
    }

    if (originalUser) {
      const noChanges =
        (payload.name || "").trim() === (originalUser.name || "") &&
        (payload.email || "").trim() === (originalUser.email || "") &&
        !(payload.password || "").trim();

      if (noChanges) {
        errors.general = "No se detectaron cambios para guardar.";
      }
    }

    return errors;
  };

  const handleSave = async (payload) => {
    const validationErrors = validateUserForm(payload, editingUser);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      const normalizedPayload = {
        name: payload.name.trim(),
        email: payload.email.trim(),
      };

      if (payload.password?.trim()) {
        normalizedPayload.password = payload.password;
      }

      if (editingUser) {
        await updateUser(editingUser.user_id, normalizedPayload);
        notifySuccess("Usuario actualizado correctamente.");
      } else {
        await createUser({
          ...normalizedPayload,
          password: payload.password,
        });
        notifySuccess("Usuario creado correctamente.");
      }

      setIsFormOpen(false);
      setEditingUser(null);
      setFormErrors({});
    } catch (err) {
      setFormErrors({ general: err.message || "Error al guardar" });
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.user_id);
      notifySuccess("Usuario eliminado correctamente.");
      setUserToDelete(null);
    } catch (err) {
      notifyError(`Error al eliminar: ${err.message}`);
    }
  };

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return (
    <LandingTemplate>
      <section className="admin-users-page">
        <div className="admin-users-page__hero">
          <div>
            <Text variant="p" className="admin-users-page__eyebrow">
              Gestión
            </Text>
            <Text variant="h1">Administrar Usuarios</Text>
            <Text variant="p" className="admin-users-page__intro">
              Crea, edita y elimina usuarios del sistema
            </Text>
          </div>

          <div className="admin-users-page__hero-actions">
            <div className="admin-users-page__summary-card">
              <Text variant="span" className="admin-users-page__summary-label">
                Total
              </Text>
              <Text variant="span" className="admin-users-page__summary-value">
                {totalUsers}
              </Text>
            </div>
            <Button text="Crear Usuario" onClick={handleCreate} />
          </div>
        </div>

        <div className="admin-users-page__table-card">
          <div className="admin-users-page__table-header">
            <Text variant="h2">Usuarios</Text>
          </div>

          {users.length > 0 ? (
            <div className="admin-users-page__table-wrap">
              <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={setUserToDelete}
              />
            </div>
          ) : (
            <Text variant="p" className="admin-users-page__empty-state">
              No hay usuarios registrados
            </Text>
          )}
        </div>

        {isFormOpen && (
          <div className="admin-users-page__modal">
            <div className="admin-users-page__dialog">
              <div className="admin-users-page__dialog-header">
                <Text variant="p" className="admin-users-page__dialog-eyebrow">
                  {editingUser ? "Editar" : "Crear"}
                </Text>
                <Text variant="h2">
                  {editingUser ? "Editar Usuario" : "Nuevo Usuario"}
                </Text>
              </div>

              <UserForm
                user={editingUser || emptyForm}
                errors={formErrors}
                onSave={handleSave}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingUser(null);
                  setFormErrors({});
                }}
              />
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={Boolean(userToDelete)}
          eyebrow="Eliminar Usuario"
          badgeSymbol="X"
          title={
            userToDelete ? `Borrar ${userToDelete.name}` : "Borrar usuario"
          }
          description={
            userToDelete
              ? `Esta accion eliminara el usuario ${userToDelete.name} de forma permanente.`
              : "Esta accion eliminara el usuario de forma permanente."
          }
          cancelLabel="Cancelar"
          confirmLabel="Eliminar"
          onCancel={() => setUserToDelete(null)}
          onConfirm={handleDelete}
        />
      </section>
    </LandingTemplate>
  );
};

export default AdminUsersPage;

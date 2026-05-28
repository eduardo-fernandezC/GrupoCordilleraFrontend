import RowActions from "../molecules/RowActions";
import "../../styles/components/organisms/CrudTable.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  if (!users.length) return null;

  return (
    <table className="crud-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Nombre</th>
          <th>Roles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id ?? user.email}>
            <td>{user.user_id ?? "-"}</td>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.roles?.length ? user.roles.join(", ") : "Sin roles"}</td>
            <td>
              <RowActions
                onEdit={() => onEdit(user)}
                onDelete={() => onDelete(user)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
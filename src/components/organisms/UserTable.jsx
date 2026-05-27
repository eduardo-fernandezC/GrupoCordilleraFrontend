import ErrorMessage from "../atoms/ErrorMessage";

const UserTable = ({ users }) => {

  if (!users.length) {
    return (
      <ErrorMessage message="No hay usuarios registrados." />
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Nombre</th>
          <th>Roles</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>
              {user.roles?.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
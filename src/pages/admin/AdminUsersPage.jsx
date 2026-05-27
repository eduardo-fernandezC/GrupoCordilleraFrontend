import Loader from "../../components/atoms/Loader";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LandingTemplate from "../../components/templates/LandingTemplate";
import Text from "../../components/atoms/Text";
import UserTable from "../../components/organisms/UserTable";
import UserForm from "../../components/organisms/UserForm";
import useUsers from "../../hooks/useUsers";

const AdminUsersPage = () => {
  const {
    users,
    loading,
    error,
    createUser
  } = useUsers();

  const handleCreateUser = async (
    userData
  ) => {
    try {
      await createUser(userData);
      alert("Usuario creado");
    } catch {
      alert("Error creando usuario");
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <LandingTemplate>
      <section>
        <div>
          <div>
            <Text variant="p">
              Gestión
            </Text>
            <Text variant="h1">
              Administrar Usuarios
            </Text>
            <Text variant="p">
              Visualiza los usuarios registrados
            </Text>
          </div>
        </div>
        <UserForm
          onSubmit={handleCreateUser}
        />
        <UserTable users={users} />
      </section>
    </LandingTemplate>
  );
};

export default AdminUsersPage;
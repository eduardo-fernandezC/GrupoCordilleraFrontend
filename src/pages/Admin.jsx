import LogoutButton from "../components/molecules/LogoutButton";
import LandingTemplate from "../components/templates/LandingTemplate";

const Admin = () => {
  return (
    <LandingTemplate>
      <h1>Admin</h1>
      <LogoutButton />
    </LandingTemplate>
  );
};

export default Admin;

import HeroSection from "../components/organisms/HeroSection";
import useRoleRedirect from "../hooks/useRoleRedirect";
import "../styles/pages/Login.css";

const Login = () => {
  useRoleRedirect();

  return (
    <main className="login-page">
      <HeroSection />
    </main>
  );
};

export default Login;

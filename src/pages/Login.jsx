import LandingTemplate from "../components/organisms/HeroSection";
import HeroSection from "../components/templates/LandingTemplate";
import useRoleRedirect from "../hooks/useRoleRedirect";

const Login = () => {
  useRoleRedirect();

  return (
    <LandingTemplate>
      <HeroSection />
    </LandingTemplate>
  );
};

export default Login;

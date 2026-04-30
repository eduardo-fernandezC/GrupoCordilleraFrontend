import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";

const LandingTemplate = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LandingTemplate;

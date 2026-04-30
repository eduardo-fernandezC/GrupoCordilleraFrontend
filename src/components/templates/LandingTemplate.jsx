import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";
import "../../styles/components/templates/LandingTemplate.css";

const LandingTemplate = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__main">
        <section className="app-shell__content">{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingTemplate;

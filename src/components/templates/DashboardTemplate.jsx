import Footer from "../organisms/Footer";
import Navbar from "../organisms/Navbar";

const DashboardTemplate = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardTemplate;

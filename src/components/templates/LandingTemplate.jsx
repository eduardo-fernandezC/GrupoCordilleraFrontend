import Footer from "../organisms/Footer";

const LandingTemplate = ({ children }) => {
  return (
    <div>
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingTemplate;
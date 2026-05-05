import Text from "../atoms/Text";
import "../../styles/components/molecules/FooterInfo.css";

const FooterInfo = () => {
  return (
    <div className="site-footer__info">
      <Text className="site-footer__title" variant="h3">
        Grupo Cordillera Dashboard
      </Text>
      <Text className="site-footer__meta" variant="small">
        • v1.0.0 • © 2026
      </Text>
    </div>
  );
};

export default FooterInfo;

import Text from "../atoms/Text";
import "../../styles/components/molecules/DashboardHeader.css";

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="dashboard-header">
      <Text variant="h1" className="dashboard-title">
        {title}
      </Text>
      <Text variant="p" className="dashboard-subtitle">
        {subtitle}
      </Text>
    </div>
  );
};

export default DashboardHeader;

import "../../styles/components/molecules/DashboardHeader.css";

const DashboardHeader = ({ title, subtitle }) => {
  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">{title}</h1>
      <p className="dashboard-subtitle">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;

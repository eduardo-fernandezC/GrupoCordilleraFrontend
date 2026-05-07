import "../../styles/components/atoms/Button.css";

const Button = ({
  children,
  text,
  onClick,
  className = "",
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
      {...rest}
    >
      {children || text}
    </button>
  );
};

export default Button;

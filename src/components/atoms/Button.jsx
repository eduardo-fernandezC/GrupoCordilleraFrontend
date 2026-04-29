const Button = ({
  children,
  text,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {children || text}
    </button>
  );
};

export default Button;

const Text = ({ children, variant = "p", className = "", ...rest }) => {
  const Tag = variant;
  return (
    <Tag className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Text;

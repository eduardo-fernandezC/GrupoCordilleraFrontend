import "./SearchInput.css";

const SearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className = "",
}) => {
  return (
    <input
      type="search"
      className={`search-input ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
};

export default SearchInput;

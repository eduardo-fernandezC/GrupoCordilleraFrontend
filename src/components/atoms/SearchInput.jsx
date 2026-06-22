import "../../styles/components/atoms/SearchInput.css";

const SearchInput = ({ value, onChange, placeholder, ariaLabel }) => {
  return (
    <div className="search-input__wrapper">
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default SearchInput;

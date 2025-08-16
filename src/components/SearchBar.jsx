function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Enter city, zip code, address, or landmark"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;




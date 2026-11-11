import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../assets/Logo.png";

export default function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";

  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  function handleSearch(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    navigate(trimmedQuery ? `/?search=${encodeURIComponent(trimmedQuery)}` : "/");
  }

  return (
    <div className="Nav">
        <Link to="/">
        <img src={Logo} alt="Quillr home" />
        </Link>
        
        <form className="SearchBar" role="search" onSubmit={handleSearch}>
          <input
            type="search"
            aria-label="Search stories by title or genre"
            placeholder="Search stories"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <Link to="/stories/create">
        <button type="button">+ New Story</button>
        </Link>
    </div>
  )
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../assets/Logo.png";

// The navigation bar is shared across the app, so search can be started from any page.
export default function NavBar() {
  // Keep the text currently being typed in the search input.
  const [query, setQuery] = useState("");
  // navigate lets the form submit by changing the route without a full page reload.
  const navigate = useNavigate();
  // Read search terms from the URL so a search can be bookmarked and restored.
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";

  // Keep the input synchronized if the URL search term changes, including browser navigation.
  useEffect(() => {
    setQuery(searchTerm);
  }, [searchTerm]);

  // Handle both clicking Search and pressing Enter in the form.
  function handleSearch(event) {
    // Prevent the browser's default form submission and page reload.
    event.preventDefault();
    // Ignore extra spaces at either end of the search text.
    const trimmedQuery = query.trim();
    // Put the search term in the URL; an empty search returns to the unfiltered home page.
    navigate(trimmedQuery ? `/?search=${encodeURIComponent(trimmedQuery)}` : "/");
  }

  // JSX describes the links and search form displayed in the navigation bar.
  return (
    <div className="Nav">
        {/* Link navigates home when the logo is selected. */}
        <Link to="/">
        <img src={Logo} alt="Quillr home" />
        </Link>
        
        {/* A form gives the search button and Enter key the same submit behavior. */}
        <form className="SearchBar" role="search" onSubmit={handleSearch}>
          {/* A controlled input gets its value from React state. */}
          <input
            type="search"
            aria-label="Search stories by title or genre"
            placeholder="Search stories"
            value={query}
            // Save each keystroke in state so the input stays in sync with React.
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {/* Navigate to the page for creating a new story. */}
        <Link to="/stories/create">
        <button type="button">+ New Story</button>
        </Link>
    </div>
  )
}

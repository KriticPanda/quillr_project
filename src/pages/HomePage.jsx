import StoriesList from "./StoriesList";
import { Link } from "react-router-dom";

// Home page heading and the list of stories available in the app.
function HomePage() {
    return (
      <div>
        <h1>Home Page</h1>

        {/* StoriesList fetches and displays the stories, including any active search filter. */}
        <StoriesList/>
      </div>
    );
  }
  
  export default HomePage;
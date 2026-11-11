import { useNavigate } from "react-router-dom";

// A placeholder component for the app's sidebar area.
export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="SideBar">
      <button type="button" onClick={() => navigate("/about")}>
        About
      </button>
    </aside>
  );
}

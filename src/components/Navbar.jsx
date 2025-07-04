import { Link, NavLink } from "react-router-dom";

const toggleTheme = () => {
  const current = document.body.getAttribute("data-bs-theme");
  document.body.setAttribute(
    "data-bs-theme",
    current === "dark" ? "light" : "dark"
  );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom">
      <div className="container">
        <NavLink className="navbar-brand">CryptoPulse</NavLink>
        <div className="navbar-nav mx-auto">
          <Link to="#" className="nav-link">
            Dashboard
          </Link>
        </div>

        <div>
          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary btn-sm"
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

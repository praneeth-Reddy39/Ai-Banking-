import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const loggedIn = !!token;
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">AI Banking</Link>
        <nav className="menu">
          <NavLink to="/" end>Home</NavLink>
          {loggedIn && (
            <>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/insights">Insights</NavLink>
              <NavLink to="/accounts">Accounts</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </>
          )}
        </nav>
        <div className="actions">
          {loggedIn ? (
            <>
              <NavLink to="/dashboard" className="btn btn-outline">Dashboard</NavLink>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline">Log in</NavLink>
              <NavLink to="/signup" className="btn btn-primary">Sign up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;

import { NavLink, Outlet } from "react-router";

export default function AppLayout() {
  const linkClass = ({ isActive }) => (isActive ? "active-link" : "link");

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <h1>Lab 04 — Exercise</h1>

        <nav aria-label="Main navigation">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/people" className={linkClass}>
            People
          </NavLink>
          <NavLink to="/form" className={linkClass}>
            Form
          </NavLink>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </>
  );
}

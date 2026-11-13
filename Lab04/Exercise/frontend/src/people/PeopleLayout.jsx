import { NavLink, Outlet } from "react-router";

export default function PeopleLayout({ people }) {
  return (
    <section aria-labelledby="people-heading">
      <h2 id="people-heading">People Directory</h2>

      <section className="people-frame">
        <nav className="sidebar" aria-label="People directory">
          {people.map((person) => (
            <NavLink
              key={person.id}
              to={`/people/${person.id}`}
              className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
              {person.name}
            </NavLink>
          ))}
        </nav>

        <section className="detail-slot" aria-label="Person details">
          <Outlet />
        </section>
      </section>
    </section>
  );
}

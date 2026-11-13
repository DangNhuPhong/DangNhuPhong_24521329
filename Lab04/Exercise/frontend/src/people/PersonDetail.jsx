import { Link, useParams } from "react-router";
import { people } from "../data/people.js";
import { findPerson } from "../data/findPerson.js";

export default function PersonDetail() {
  const { id } = useParams();
  const person = findPerson(people, id);

  if (!person) {
    return (
      <article className="detail-card" role="alert">
        <h3>404: Person not found</h3>

        <p>No person matches this URL.</p>

        <Link to="/people">Back to directory</Link>
      </article>
    );
  }

  return (
    <article className="detail-card">
      <h3>{person.name}</h3>

      <dl className="details">
        <dt>Name</dt>
        <dd>{person.name}</dd>

        <dt>Role</dt>
        <dd>{person.role}</dd>

        <dt>Email</dt>
        <dd>
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </dd>
      </dl>
    </article>
  );
}

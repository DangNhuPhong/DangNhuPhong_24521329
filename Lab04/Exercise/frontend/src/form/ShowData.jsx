import { Fragment } from "react";

export default function ShowData({ data }) {
  return (
    <section aria-labelledby="inspector-heading">
      <h3 id="inspector-heading">Submitted data</h3>

      <dl className="json-inspector">
        {Object.entries(data).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}

import { Fragment } from "react";
import { SkillBadge } from "./SkillBadge.jsx";

export function DeveloperCard({
  fullName = "Đặng Như Phong",
  role = "Student at UIT",
  avatarUrl = "../assets/avata.jpg",
  metrics = { commits: 3453, vdomNodes: 1, a11yScore: 99 },
  skills = [{ id: "sk-1", name: "React 19 Fiber", tier: "Core" }],
}) {
  return (
    <article aria-labelledby="dev-heading">
      <header>
        <img src={avatarUrl} alt={fullName} width="64" height="64" />
        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>
      <dl>
        {Object.entries(metrics).map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>
      <ul aria-label="Engineered Skills">
        {skills.map((s) => (
          <SkillBadge key={s.id} name={s.name} tier={s.tier} />
        ))}
      </ul>
    </article>
  );
}

import { Fragment, useState } from "react";
import { SkillBadge } from "./SkillBadge";
import styles from "./DeveloperCard.module.css";
import avaImage from "../assets/ava.jpg"; //

export function DeveloperCard({
  fullName = "Đặng Như Phong",
  role = "UIT Student",
  avatarUrl = avaImage,
  metrics = {
    commits: 67,
    vdomNodes: 5,
    a11yScore: 99,
  },
  skills = [
    {
      id: "sk-1",
      name: "React 19 Fiber",
      tier: "Core",
    },
    {
      id: "sk-2",
      name: "JavaScript",
      tier: "Advanced",
    },
    {
      id: "sk-3",
      name: "Accessibility",
      tier: "Core",
    },
  ],
}) {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <article className={styles.card} aria-labelledby="dev-heading">
      <header className={styles.header}>
        {imageFailed ? (
          <span
            className={styles.avatarFallback}
            role="img"
            aria-label={`Avatar initials ${initials}`}
          >
            {initials}
          </span>
        ) : (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={`Portrait of ${fullName}`}
            width="64"
            height="64"
            onError={() => setImageFailed(true)}
          />
        )}

        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([key, value]) => (
          <Fragment key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <section className={styles.skillSection} aria-label="Skills">
        <h3>Technical Skills</h3>

        <ul className={styles.skills} aria-label="Engineered Skills">
          {skills.map((skill) => (
            <li key={skill.id}>
              <SkillBadge name={skill.name} tier={skill.tier} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

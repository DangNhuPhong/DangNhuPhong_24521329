import { SkillBadge } from "./SkillBadge.jsx";
import { Fragment, useState } from "react";
import styles from "./DeveloperCard.module.css";
import avaImage from "../assets/avata.jpg";

const getInitials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

export function DeveloperCard({
  fullName = "Đặng Như Phong",
  role = "Student at UIT",
  avatarUrl = avaImage,
  metrics = { commits: 3453, vdomNodes: 1, a11yScore: 99 },
  skills = [{ id: "sk-1", name: "React 19 Fiber", tier: "Core" }],
}) {
  const [failedUrl, setFailedUrl] = useState(null);
  const showImg = Boolean(avatarUrl) && failedUrl !== avatarUrl;
  return (
    <article className={styles.card} aria-labelledby="dev-heading">
      <header className={styles.header}>
        {showImg ? (
          <img
            className={styles.avatar}
            src={avatarUrl}
            alt={fullName}
            width="64"
            height="64"
            onError={() => setFailedUrl(avatarUrl)}
          />
        ) : (
          <span
            className={styles.avatarFallback}
            role="img"
            aria-label={fullName}
          >
            {getInitials(fullName)}
          </span>
        )}
        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>
      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>
      <ul className={styles.skills} aria-label="Engineered Skills">
        {skills.map((s) => (
          <SkillBadge key={s.id} name={s.name} tier={s.tier} />
        ))}
      </ul>
    </article>
  );
}

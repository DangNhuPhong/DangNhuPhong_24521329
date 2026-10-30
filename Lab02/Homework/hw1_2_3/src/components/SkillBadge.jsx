export function SkillBadge({ name, tier = "Core" }) {
  return (
    <span className={`skill-badge skill-badge--${tier.toLowerCase()}`}>
      <span className="skill-badge__name">{name}</span>
      <span className="skill-badge__tier">{tier}</span>
    </span>
  );
}

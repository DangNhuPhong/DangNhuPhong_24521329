export function SkillBadge({ name, tier = "Core" }) {
  return (
    <li data-tier={tier.toLowerCase()}>
      <span>{name}</span> <small>{tier}</small>
    </li>
  );
}

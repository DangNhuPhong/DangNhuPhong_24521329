export function DeveloperCard({
  fullName = "Đặng Như Phong",
  role = "Student at UIT",
  avatarUrl = "../assets/avata.jpg",
  metrics = { commits: 3453, vdomNodes: 1, a11yScore: 99 },
  skills = [{ id: "sk-1", name: "React 19 Fiber", tier: "Core" }],
}) {
  return <article aria-labelledby="dev-heading" />;
}

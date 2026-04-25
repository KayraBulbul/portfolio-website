type Group = { title: string; items: string[] };

const groups: Group[] = [
  {
    title: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "SQL"],
  },
  {
    title: "Backend & Web",
    items: ["Node.js", "Express.js", "React", "REST APIs", "TypeORM"],
  },
  {
    title: "Data & Cloud",
    items: [
      "PostgreSQL",
      "MS SQL Server",
      "Pandas",
      "ETL / ELT",
      "PySpark",
      "Airflow",
      "Snowflake",
      "MongoDB",
      "AWS",
    ],
  },
  {
    title: "Tooling",
    items: ["Git", "Linux", "Neovim", "Docker", "PowerBI", "Tableau"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ skills</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          What I work with
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                {g.title}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li key={it} className="pill">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

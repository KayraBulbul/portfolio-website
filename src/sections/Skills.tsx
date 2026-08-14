type Group = { title: string; items: string[] };

const groups: Group[] = [
  {
    title: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "Go", "C", "C++", "SQL"],
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
    <section id="skills" className="folio-section folio-section--proof skills-section">
      <div className="folio-container">
        <header className="section-head section-head--compact">
          <h2>What I work with</h2>
          <p>A technical index, grouped by the work each tool supports.</p>
        </header>

        <dl className="skills-ledger">
          {groups.map((group) => (
            <div key={group.title}>
              <dt>{group.title}</dt>
              <dd>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

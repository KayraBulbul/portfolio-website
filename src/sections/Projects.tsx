type Project = {
  title: string;
  description: string;
  stack: string[];
  repo: string;
  highlight?: boolean;
};

const projects: Project[] = [
  {
    title: "SQL Data Warehouse",
    description:
      "Modern data warehouse built on SQL Server. Implements a layered medallion architecture (bronze/silver/gold), end-to-end ETL, dimensional modelling, and analytics-ready views.",
    stack: ["T-SQL", "SQL Server", "ETL", "Data Modeling"],
    repo: "https://github.com/KayraBulbul/sql-data-warehouse",
    highlight: true,
  },
  {
    title: "NSW Crime RAG System",
    description:
      "Retrieval-augmented chatbot over NSW crime statistics. Uses LangChain, OpenAI embeddings, ChromaDB for vector search, and Ollama for local inference.",
    stack: ["Python", "LangChain", "ChromaDB", "Ollama", "RAG"],
    repo: "https://github.com/KayraBulbul/NSW-Crime-RAG-System",
    highlight: true,
  },
  {
    title: "House Price Prediction",
    description:
      "Regression pipeline on Melbourne housing data. Feature engineering, model selection, and evaluation in a reproducible notebook workflow.",
    stack: ["Python", "Pandas", "scikit-learn", "Jupyter"],
    repo: "https://github.com/KayraBulbul/house-price-prediction",
  },
  {
    title: "Maze Solver",
    description:
      "Visual pathfinding playground. Generates mazes and animates DFS-based solving in a Tk canvas, with a clean separation between model and renderer.",
    stack: ["Python", "Tkinter", "Graph Search"],
    repo: "https://github.com/KayraBulbul/maze-solver",
  },
  {
    title: "Gator",
    description:
      "Gator is a command-line RSS/blog aggregator written in Go. It lets users register, add RSS feeds, follow feeds, fetch posts from those feeds, and browse recent posts from a PostgreSQL database.",
    stack: ["Go", "PostgreSQL", "Goose", "SQLC"],
    repo: "https://github.com/KayraBulbul/gator",
  },
  {
    title: "CLI Pokedex",
    description:
      "A command-line Pokedex built in TypeScript and Node.js. Explore the Pokemon world, catch Pokemon, and inspect your collection all from the terminal.",
    stack: ["TypeScript", "Node.js", "PokeAPI"],
    repo: "https://github.com/KayraBulbul/cli-pokedex",
  },
];

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="folio-section project-section">
      <div className="folio-container">
        <header className="section-head section-head--ruled">
          <h2>Selected work</h2>
          <a
            href="https://github.com/KayraBulbul"
            target="_blank"
            rel="noreferrer"
            className="action-link"
          >
            All repos on GitHub <ExternalIcon />
          </a>
        </header>

        <ol className="project-ledger">
          {projects.map((project, index) => (
            <li
              key={project.title}
              className={
                project.highlight ? "project-item project-item--featured" : "project-item"
              }
            >
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="project-entry"
              >
                <div className="project-entry__index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.highlight && <span>Featured</span>}
                </div>
                <h3>{project.title}</h3>
                <p className="project-entry__description">{project.description}</p>
                <ul
                  className="project-entry__stack"
                  aria-label={`${project.title} technologies`}
                >
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <span className="project-entry__link">
                  View project <ExternalIcon />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

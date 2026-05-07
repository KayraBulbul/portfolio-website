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
    stack: ["Python", "Tkinter", "Algorithms"],
    repo: "https://github.com/KayraBulbul/maze-solver",
  },
  {
    title: "Asteroid Game",
    description:
      "Arcade-style asteroids clone exploring object-oriented game loops, collision detection, and basic physics.",
    stack: ["Python", "Pygame", "OOP"],
    repo: "https://github.com/KayraBulbul/asteroid-game",
  },
  {
    title: "CLI Pokedex",
    description:
      "A command-line Pokedex built in TypeScript and Node.js. Explore the Pokemon world, catch Pokemon, and inspect your collection all from the terminal.",
    stack: ["TypeScript", "Node"],
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
    <section
      id="projects"
      className="border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container-narrow py-20 sm:py-24">
        <p className="section-heading mb-4">/ projects</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Selected work
          </h2>
          <a
            href="https://github.com/KayraBulbul"
            target="_blank"
            rel="noreferrer"
            className="link-underline text-sm text-zinc-600 dark:text-zinc-400"
          >
            All repos on GitHub <ExternalIcon />
          </a>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.title}>
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="card group flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                    {p.highlight && (
                      <span className="ml-2 align-middle text-[10px] font-mono uppercase tracking-[0.15em] text-accent">
                        featured
                      </span>
                    )}
                  </h3>
                  <span className="mt-1 text-zinc-400 transition-colors group-hover:text-accent">
                    <ExternalIcon />
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <li key={s} className="pill">
                      {s}
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

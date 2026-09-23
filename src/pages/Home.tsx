import { Link } from "react-router-dom";
import PostRow from "../components/PostRow";
import ProjectRow from "../components/ProjectRow";
import { getAllPosts } from "../lib/posts";
import { getAllProjects, getHomepageProjects } from "../lib/projects";

const skills = [
  {
    title: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "Go", "C", "C++", "SQL"],
  },
  {
    title: "Backend and web",
    items: ["Node.js", "Express.js", "React", "REST APIs", "TypeORM"],
  },
  {
    title: "Data and cloud",
    items: [
      "PostgreSQL",
      "MS SQL Server",
      "Pandas",
      "ETL/ELT",
      "PySpark",
      "Airflow",
      "Snowflake",
      "MongoDB",
      "AWS",
    ],
  },
  {
    title: "Tools",
    items: ["Git", "Linux", "Neovim", "Docker", "Power BI", "Tableau"],
  },
];

export default function Home() {
  const projects = getHomepageProjects();
  const projectCount = getAllProjects().length;
  const posts = getAllPosts();

  return (
    <div className="page">
      <section className="intro">
        <h1>I&apos;m Kayra, a computer science student at RMIT in Melbourne.</h1>
        <p>
          I mostly work on backends and infrastructure, and I enjoy figuring
          out how systems work under the hood. Have a look at my{" "}
          <Link to="/projects">projects</Link>, read my{" "}
          <Link to="/devlog">devlog</Link>, or{" "}
          <a href="#contact">get in touch</a>.
        </p>
      </section>

      <section className="section" aria-labelledby="projects-title">
        <header className="section-head">
          <h2 id="projects-title" className="section-title">
            Projects
          </h2>
          <Link to="/projects" className="section-link">
            See all {projectCount} projects
          </Link>
        </header>
        <ul className="rows">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} showStack={false} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="devlog-title">
        <header className="section-head">
          <h2 id="devlog-title" className="section-title">
            Devlog
          </h2>
          <Link to="/devlog" className="section-link">
            See all {posts.length} posts
          </Link>
        </header>
        <ul className="rows">
          {posts.slice(0, 5).map((post) => (
            <li key={post.slug}>
              <PostRow post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="about-title">
        <header className="section-head">
          <h2 id="about-title" className="section-title">
            About
          </h2>
        </header>
        <div className="about">
          <p>
            I&apos;m studying a Bachelor of Computer Science at RMIT, with minors
            in Enterprise Systems Development and Data Science. Most of my recent
            work has been ETL and ELT pipelines, data warehouses on SQL Server and
            PostgreSQL, and Node and Express APIs in TypeScript. I&apos;ve also been writing
            C and C++ to understand what&apos;s actually happening under the hood.
          </p>
          <p>
            When I&apos;m not breaking my Hyprland setup (I use Arch, btw),
            I&apos;m usually playing video games or watching movies.
          </p>
        </div>
        <dl className="skills">
          {skills.map((group) => (
            <div key={group.title}>
              <dt>{group.title}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

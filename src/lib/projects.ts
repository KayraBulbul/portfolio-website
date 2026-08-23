const allProjectFiles = import.meta.glob<string>("../content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export type ProjectMetadata = {
  title: string;
  description: string;
  technologies: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  status?: string;
  featured: boolean;
  published: boolean;
  order: number;
};

export type Project = {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
};

function optionalValue(value: string | undefined) {
  const normalizedValue = value?.trim();
  return normalizedValue ? normalizedValue : undefined;
}

function parseProject(path: string, rawMarkdown: string): Project {
  const lines = rawMarkdown.split("\n");

  if (lines[0]?.trim() !== "---") {
    throw new Error(`Project file ${path} is missing its opening frontmatter marker.`);
  }

  const closingMarkerIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === "---",
  );

  if (closingMarkerIndex === -1) {
    throw new Error(`Project file ${path} is missing its closing frontmatter marker.`);
  }

  const metadataObject: Record<string, string> = {};

  for (const line of lines.slice(1, closingMarkerIndex)) {
    const colonIndex = line.indexOf(":");

    if (colonIndex === -1) {
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    metadataObject[key] = value;
  }

  const pathParts = path.split("/");
  const filename = pathParts[pathParts.length - 1] ?? "";
  const slug = filename.replace(/\.md$/, "");
  const technologies = metadataObject.technologies
    ?.split(",")
    .map((technology) => technology.trim())
    .filter(Boolean) ?? [];

  return {
    slug,
    metadata: {
      title: metadataObject.title,
      description: metadataObject.description,
      technologies,
      repositoryUrl: optionalValue(metadataObject.repositoryUrl),
      liveUrl: optionalValue(metadataObject.liveUrl),
      status: optionalValue(metadataObject.status),
      featured: metadataObject.featured === "true",
      published: metadataObject.published === "true",
      order: Number.parseInt(metadataObject.order, 10) || Number.MAX_SAFE_INTEGER,
    },
    content: lines.slice(closingMarkerIndex + 1).join("\n").trim(),
  };
}

const projects = Object.entries(allProjectFiles)
  .map(([path, rawMarkdown]) => parseProject(path, rawMarkdown))
  .filter((project) => project.metadata.published)
  .sort((a, b) => a.metadata.order - b.metadata.order);

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

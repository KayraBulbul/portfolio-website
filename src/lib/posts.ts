const allPostFiles = import.meta.glob<string>("../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const allPosts = Object.entries(allPostFiles);

type PostMetadata = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
};

type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

export function getAllPosts(): Post[] {
  let posts: Post[] = [];

  allPosts.forEach(([path, rawMarkdown]) => {
    const lines = rawMarkdown.split("\n");
    const linesWithoutOpeningMarker = lines.slice(1);
    const closingMarkerIndex = linesWithoutOpeningMarker.findIndex(
      (n) => n === "---",
    );

    const metadataBlock = linesWithoutOpeningMarker
      .slice(0, closingMarkerIndex)
      .join("\n");

    const content = linesWithoutOpeningMarker
      .slice(closingMarkerIndex + 1)
      .join("\n")
      .trimStart();

    const rawSlug = path.split("/");
    const dotIndex = rawSlug[rawSlug.length - 1].lastIndexOf(".");
    const slug = rawSlug[rawSlug.length - 1].slice(0, dotIndex);

    const parsedMetadata = metadataBlock.split("\n");
    const metadataObject: Record<string, string> = {};

    for (let line of parsedMetadata) {
      const colonIndex = line.indexOf(":");
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();

      metadataObject[key] = value;
    }

    const postMetadata: PostMetadata = {
      title: metadataObject.title,
      date: metadataObject.date,
      description: metadataObject.description,
      tags: metadataObject.tags.split(",").map((n) => n.trim()),
      published: metadataObject.published === "true",
    };

    posts.push({
      slug: slug,
      metadata: postMetadata,
      content: content,
    });
  });

  const filterdPosts = posts.filter((n) => n.metadata.published === true);
  filterdPosts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));

  return filterdPosts;
}

import type { ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

type MarkdownElement = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
};

function isMarkdownElement(value: unknown): value is MarkdownElement {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "element" &&
    "tagName" in value &&
    typeof value.tagName === "string"
  );
}

function stringProperty(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function getYouTubeEmbedUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.replace(/^www\./, "");
    let videoId: string | undefined;

    if (hostname === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0];
    } else if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v") ?? undefined;
      } else if (
        url.pathname.startsWith("/embed/") ||
        url.pathname.startsWith("/shorts/")
      ) {
        videoId = url.pathname.split("/").filter(Boolean)[1];
      }
    }

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
      : undefined;
  } catch {
    return undefined;
  }
}

function normalizeStandaloneYouTubeLinks(content: string) {
  return content
    .split("\n")
    .map((line) => {
      const value = line.trim();
      return getYouTubeEmbedUrl(value) ? `<${value}>` : line;
    })
    .join("\n");
}

function YouTubeEmbed({ src }: { src: string }) {
  return (
    <figure className="project-media project-media--video">
      <div className="project-video-frame">
        <iframe
          src={src}
          title="YouTube project demonstration"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </figure>
  );
}

const markdownComponents: Components = {
  h1: ({ children }) => <h1 className="prose-h1">{children}</h1>,
  h2: ({ children }) => <h2 className="prose-h2">{children}</h2>,
  h3: ({ children }) => <h3 className="prose-h3">{children}</h3>,
  p: ({ node, children }) => {
    const onlyChild =
      node?.children.length === 1 ? node.children[0] : undefined;

    if (isMarkdownElement(onlyChild) && onlyChild.tagName === "a") {
      const embedUrl = getYouTubeEmbedUrl(
        stringProperty(onlyChild.properties?.href),
      );

      if (embedUrl) {
        return <YouTubeEmbed src={embedUrl} />;
      }
    }

    if (isMarkdownElement(onlyChild) && onlyChild.tagName === "img") {
      const src = stringProperty(onlyChild.properties?.src);
      const alt = stringProperty(onlyChild.properties?.alt) ?? "";
      const caption = stringProperty(onlyChild.properties?.title);

      if (src) {
        return (
          <figure className="project-media">
            <img src={src} alt={alt} loading="lazy" />
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        );
      }
    }

    return <p className="prose-p">{children}</p>;
  },
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="prose-link"
    >
      {children}
    </a>
  ),
  img: ({ src, alt }) => (
    <img className="prose-image" src={src} alt={alt ?? ""} loading="lazy" />
  ),
  ul: ({ children }) => (
    <ul className="prose-list prose-list--unordered">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="prose-list prose-list--ordered">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="prose-quote">{children}</blockquote>
  ),
  hr: () => <hr className="prose-rule" />,
  strong: ({ children }) => <strong>{children}</strong>,
  pre: ({ children }) => <pre className="prose-code-block">{children}</pre>,
  code: ({ className, children }: { className?: string; children?: ReactNode }) => {
    const isBlockCode =
      className?.includes("language-") || className?.includes("hljs");

    return (
      <code
        className={
          isBlockCode ? "prose-code" : "prose-code prose-code--inline"
        }
      >
        {children}
      </code>
    );
  },
};

export default function ProjectMarkdown({ content }: { content: string }) {
  return (
    <Markdown
      components={markdownComponents}
      rehypePlugins={[
        [rehypeHighlight, { detect: false, ignoreMissing: true }],
      ]}
    >
      {normalizeStandaloneYouTubeLinks(content)}
    </Markdown>
  );
}

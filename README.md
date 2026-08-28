# Portfolio — Kayra Bulbul

This is my portfolio website built on React using TypeScript.

## Adding a project

Projects live in `src/content/projects`. Add one Markdown file per project and
use this frontmatter:

```md
---
title: Project name
description: A short archive and page-header description.
technologies: TypeScript, React, PostgreSQL
repositoryUrl: https://github.com/username/project
liveUrl: https://example.com
status: Active
featured: false
homepage: true
published: true
order: 7
---

## What I built

Write the full project description here.
```

`repositoryUrl`, `liveUrl`, and `status` are optional. Set `homepage` to
`false` to keep a published project off the homepage, or set `published` to
`false` to keep a draft out of the site. The homepage shows the first six
eligible projects. Lower `order` values appear first.

Put screenshots and GIFs in `public/projects`, then add them with normal
Markdown image syntax. The optional quoted title becomes the visible caption:

```md
![Dashboard showing the finished result](/projects/dashboard.png "Dashboard overview")
```

Paste a YouTube watch, short, embed, or `youtu.be` URL on its own line to render
a responsive video player:

```md
https://www.youtube.com/watch?v=VIDEO_ID
```

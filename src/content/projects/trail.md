---
title: Trail
description: A terminal app that keeps a log of where you left off on each project. AI coding agents like Claude Code and Codex read and write the same log through a CLI and an MCP server.
technologies: Rust, Ratatui, SQLite, MCP, Git, GitHub Actions
repositoryUrl: https://github.com/KayraBulbul/Trail
featured: true
homepage: true
published: true
order: 1
---

## What I built

Trail is a Rust terminal app for picking up work where you left it. Each project has a log of updates: a title, what you did, and what to do next. Coming back to a project after a week, or switching from one AI agent to another, the context is already there instead of in an ever-growing markdown file.

I built it to learn Rust, and it went from first commit to v1.0.0 in about three weeks, across 13 releases. It installs with a one-line script on Linux, macOS, and Windows.

![Trail's project list and Latest Update pane](/projects/trail-latest-update.png "The Latest Update pane for a project")

## The terminal UI

The TUI is built with Ratatui and Crossterm. You add projects, write updates in a multi-line form, browse every update in a table with a preview pane, and press `?` for help on any page. It is keyboard-first with Vim-style keys, but it also supports the mouse: clicking projects, panes, and even the key hints in the help row.

![The updates table with a preview of the selected update](/projects/trail-updates.png "Every update for a project, with a preview")

## Working with AI agents

Agents forget everything between sessions. Trail gives them a shared memory through a small CLI: `trail status` at the start of a session shows the latest update and what to do next, and `trail add` at the end records what changed. Every command has a `--json` flag for machine-readable output, and `trail agents` prints instructions to drop into a project's `AGENTS.md` or `CLAUDE.md`.

![The trail status command in a terminal](/projects/trail-cli-status.png "trail status, the first thing an agent runs")

Editing and deleting updates stay in the TUI on purpose, so an agent can add to the history but never rewrite it.

## The MCP server

`trail mcp` exposes the same operations as tools over the Model Context Protocol, so agents can call Trail directly instead of running shell commands. I wrote the JSON-RPC layer by hand with `serde_json`, without an SDK or async runtime. It supports both the older `initialize` handshake and the newer stateless protocol, and I tested it against real Claude Code and Codex clients.

The CLI and the MCP server are thin layers over one core module that returns plain serialisable structs, so both always behave the same.

## Git integration

If a project lives in a git repository, Trail detects it automatically. The Latest Update pane shows the current branch, changed files, and the age of the last commit. Every new update records the branch and commit it was written on, so `trail status` can say how many commits have landed since. A read-only git view lets you browse branches, commits, and diffs without leaving the TUI.

## Releases and data

Everything is stored locally in a single SQLite database. Schema changes use versioned migrations that only ever add nullable columns, so an older binary keeps working on a newer database.

GitHub Actions runs formatting, Clippy, and the test suite on every pull request, and builds release binaries for Linux, Intel and Apple silicon Macs, and Windows when a version is tagged. The install scripts verify each download against the release's SHA-256 checksums, and `trail update` replaces the binary in place when a new version is out.

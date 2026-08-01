---
title: Full Stack Webapp Devlog 2
date: 2026-08-01
description: My experience so far from phase 0-2 of my 9 phase project.
tags: portfolio, devlog
published: true
---

## From Blank Repository to Living Server Atlas

The first three phases of the Full Stack website are complete. What begun as a random idea I had for a private Minecraft server has started to become a working community website!

My goal was never to build a generic Minecraft page. The server is a long running world that all my mates play on, so I wanted the website to feel more like an archive. Somewhere to explore the world, share what's happening/happened and overall provide a more public place for the things we get up to.

## Phase 0 — Planning the world before building it

Phase 0 was about figuring out the design and architecture. As I mentioned in the previous devlog, I discussed heavily with GPT 5.6 Sol on what the best way to go about implementing my idea would be while still keeping it a valuable learning experience for me.

That work produced a phased roadmap, the public information architecture, the core account roles, and the separation between logging in and requesting access to the Minecraft server. Though I quickly realised that you can't just one shot all that without actually starting the project. A lot of the requirements/original plans have already been changed and I'm around half way complete, so who knows what more will end up changing.

The technical foundation was created at the same time. The project is organised as a modular monolith with:

- React, TypeScript, and Vite for the frontend
- Go and Chi for the API
- PostgreSQL for future persistent content
- Goose for database migrations and sqlc for generated database access
- Docker Compose for local development
- GitHub Actions for automated checks

The first backend route, `GET /api/v1/health`, provided a small but important proof that the browser, API, and local development environment could communicate correctly. PostgreSQL tooling was prepared without making the health check depend on the database, keeping the foundation simple and reliable.

Phase 0 also established the rules that will keep the project focused: no premature microservices, no unnecessary real time infrastructure, no credentials in the browser, and no database tables before a feature actually needs them.

By the end of the phase, both applications could be installed, checked, built, and tested through the same development workflow.

## Phase 1 — Mainly Styling and Frontend Stuff

Phase 1 turned all the foundation work into something that can actually be viewed. (Again this was all mainly AI generated code, I basically had barely involvement in the frontend passed early discussions and layout planning)

The visual direction takes inspiration from vintage atlases, printed journals, and historical archives. Libre Caslon Display gives the major headings an editorial character, while DM Sans keeps navigation and body copy clear. Warm paper and cognac tones form the light theme; charcoal and muted copper shape the dark theme. Borders, restrained shadows, and subtle texture provide structure without making the site feel like a dashboard or a collection of interchangeable cards.

The homepage was built as a community hub with distinct sections for:

- Server information and player presence
- Our Mountain, the featured settlement
- A world-map preview
- Stories and upcoming events
- Community screenshots

The public routes for Players, Map, Stories, Events, and Screenshots were also established. At this stage they used centralised, replaceable preview content. This allowed the complete information architecture and responsive layouts to be tested before introducing database backed content.

Several small interactions helped make the interface feel complete. Visitors can copy the server address with immediate feedback. The navigation adapts to compact screens and correctly highlights the current route. The theme control works with a keyboard, and the entire layout was checked in both themes at desktop and mobile sizes.

The Request Access dialog also appears as a transparent preview of the future application experience. Its Discord and submission actions remain disabled because authentication and join applications belong to later phases. It shows what is planned without pretending that anything has been saved or submitted.

This phase set the visual baseline for the rest of the project. Future work will replace preview data and connect new systems, but it should preserve the identity and structure already established.

## Phase 2 — Connecting the website to the Minecraft server

Phase 2 replaced the homepage's simulated server presence with real data.

The Go API now speaks the standard Minecraft server-list status protocol directly to the Fabric server through `GET /api/v1/server/status`. The public response is intentionally narrow: it reports whether the server is online, offline, or temporarily unavailable; known player counts; version information; and sampled player names and UUIDs when the server exposes them. It does not expose management access, internal errors, or server credentials.

The difficult part was not simply making the request. A public status display has to remain honest when the network, server, or player sample is incomplete.

The API therefore distinguishes between a server that is offline and a status check that could not be completed. It also distinguishes zero online players from a missing player sample. Packet sizes and strings are bounded, socket operations use a query timeout, and malformed responses are rejected safely.

A concurrency-safe 15-second in-memory cache prevents every browser poll from creating another Minecraft connection. If a temporary probe failure occurs after a usable result, the API keeps serving that previous result as explicitly stale and attempts another refresh after a bounded five-second window. Routine checks are never written to the database.

On the frontend, TanStack Query keeps the homepage and Players page in sync. Healthy status refreshes approximately every 30 seconds, while an unavailable response or failed API request is retried after about five seconds. The existing Phase 1 layout stays in place while the interface handles loading, online, zero-player, incomplete-sample, offline, unavailable, cached, and stale states.

When sampled players are available, the homepage shows up to four confirmed-online usernames and player heads. Heads are requested from Mineatar by UUID with the skin overlay enabled, with a local Steve image as a one-way fallback if the request fails. Until the persistent player directory arrives in Phase 3, the Players page only lists people positively identified by the current live sample. A missing name is never treated as proof that somebody is offline.

Reliability work became a major part of the phase. The backend finished with 75 passing test and subtest events, including protocol, timeout, cache, route, CORS, and stale-fallback coverage. The frontend finished with 39 passing tests covering response parsing, presentation states, polling, navigation, player-head fallback, and the homepage and Players-page integrations. Formatting, linting, type checking, race detection, and production builds also passed.

## What was deliberately left for later

Completing a phase also means knowing what not to force into it.

BlueMap is reachable from the Minecraft host, but its current address is not ready for a secure production embed. Rather than ship an HTTP map inside a future HTTPS website, the site keeps its static map preview until Phase 4 establishes a stable HTTPS route and verifies iframe and content-security policies.

Discord authentication, live applications, database-backed stories and events, image uploads, and whitelist administration are also intentionally absent. Each has its own security, ownership, and data-model requirements, and each belongs to a later phase of the roadmap.

## Next: Phase 3

With the foundation, public interface, and live server presence complete, work now moves into persistent community content.

Phase 3 will introduce the first application database tables and read-only APIs for players, stories, and events. The temporary player view will become a real community directory, homepage previews will come from published content, and stories and events will gain their own data-backed listing and detail pages.

The first three phases built the frame of the archive and gave it a live connection to the world. The next one begins filling that archive with the people, places, and history that make Goon Squad worth documenting.

## Wrap Up

If you didn't realise, most of this devlog was AI generated. I figured it'd get most of the feature explanations better than I would've, some which I sorta forgot about till reading this. I've added parts that it got off though and I believe this devlog is an accurate view on where I'm at with this project.

Obviously I'm leaning pretty heavy into AI for this project. My thoughts on it at the moment are inconclusive currently. There's some parts I'm really enjoying, others that get annoying. For example after explicitly telling it to use tailwind for CSS and having it written in the requirements/skills, it wrote a 2000+ line `.CSS` file LOL. I made it refactor it and it dropped the styling code by 80% apparently. It did the tailwind stuff in it's own `.ts` file though instead of inline styling which is how I'd probably do it.

All the backend stuff was done by me with AI review afterwards. Some of this stuff is also completely new to me so I had AI guide me through certain parts as well. I've been enjoying how this project has been going overall though and I'm excited how this will turn out. The biggest thing I'm currently stuck on is that BlueMap stuff. I want to embed the map on the website but the map is served with HTTP instead of HTTPS, still unclear how I'll solve this (would rather not have to have another host for a reverse proxy).

Anyway, next devlog will most likely be phases 3-9 honestly with an official link to the website ideally. If something interesting happens during the process I'll make a devlog earlier to talk about it but I honestly doubt it, I mainly made this devlog to talk about that 2000+ lines of CSS haha.

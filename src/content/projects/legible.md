---
title: Legible
description: Winner of Melbourne Hack 2026. Legible is an accessibility layer that adapts live web pages and saves readable snapshots through a connected dashboard.
technologies: TypeScript, React, FastAPI, PostgreSQL, Gemini
repositoryUrl: https://github.com/KayraBulbul/hackmelbourne2026
liveUrl: https://hackmelbourne2026.vercel.app/
status: Hackathon project
featured: true
published: true
order: 1
---

## What I built

Legible changes how web pages look and sound without replacing the sites themselves. The Chrome extension can adjust typography, contrast, spacing, motion, reading width, and text-to-speech controls on a live page.

Readers can save a cleaned-up snapshot to a shared library and return to it through the React dashboard. Each snapshot keeps the accessibility settings used when it was captured.

## How it works

The extension extracts the readable part of a page and sends sanitised semantic content through its Manifest V3 service worker. A FastAPI backend validates and stores the snapshot in PostgreSQL for the current user. The dashboard uses the same API to browse, search, tag, favourite, and reopen saved pages.

Anonymous sessions and one-time pairing codes connect the extension and dashboard without collecting passwords. Ownership checks on every saved-page operation keep each library private.

## AI and export tools

The saved-page reader can ask Gemini to summarise, simplify, restructure, or focus the content. It can also export the current page as a PDF. Both features run through the backend, so provider credentials never ship with the extension or dashboard.

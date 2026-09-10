---
title: Distributed Chat App
description: Real-time chat across multiple Go servers. Redis Pub/Sub broadcasts messages between servers, Caddy balances WebSocket connections, and clients reconnect after a server goes down.
technologies: Go, TypeScript, React, Redis, PostgreSQL, Docker, Caddy
repositoryUrl: https://github.com/KayraBulbul/distributed-chat-app
status: In progress
featured: true
homepage: true
published: true
order: 4
---

## What I built

A chat app built to learn how WebSockets, load balancing, and Pub/Sub work together. A React and TypeScript client connects to Go servers through Caddy, with Redis carrying messages between servers and PostgreSQL storing users and messages.

## How it works

Caddy distributes new WebSocket connections across three Go servers. Each server manages its own connected clients and subscribes to a shared Redis channel. Incoming chat messages are saved to PostgreSQL and published to Redis, so users can receive messages from people connected to other servers.

## Reconnecting after a failure

When a connection closes, the client retries through Caddy using the same user ID. Retries use an increasing delay with random jitter, and Caddy can route the new connection to another server. If every server is down, the client keeps retrying until a connection succeeds. The chat shows live messages without replaying messages missed while disconnected.

## What I am working on next

Prometheus and Grafana monitoring, alongside a load tester, to track connections per server and measure how clients reconnect when a server goes down.

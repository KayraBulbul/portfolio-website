---
title: Distributed Chat App
description: Real-time chat across multiple Go servers, with Redis Pub/Sub, automatic reconnection, Prometheus and Grafana monitoring, and a Go load tester.
technologies: Go, TypeScript, React, Redis, PostgreSQL, Docker, Caddy, Prometheus, Grafana
repositoryUrl: https://github.com/KayraBulbul/distributed-chat-app
status: Completed
featured: true
homepage: true
published: true
order: 4
---

## What I built

A completed learning project exploring how WebSockets, load balancing, and Pub/Sub work together. A React and TypeScript client connects to Go servers through Caddy, with Redis carrying messages between servers and PostgreSQL storing users and messages.

## How it works

Caddy distributes new WebSocket connections across three Go servers. Each server manages its own connected clients and subscribes to a shared Redis channel. Incoming chat messages are saved to PostgreSQL and published to Redis, so users can receive messages from people connected to other servers.

## Reconnecting after a failure

When a connection closes, the client retries through Caddy using the same user ID. Retries use an increasing delay with random jitter, and Caddy can route the new connection to another server. If every server is down, the client keeps retrying until a connection succeeds. The chat shows live messages without replaying messages missed while disconnected.

## Monitoring

Each Go server exposes Prometheus metrics for active WebSocket connections, messages received from clients, and messages successfully published to Redis. Prometheus scrapes all three servers, and Grafana lets me view those metrics and watch how connections redistribute after a server goes down. The Docker Compose stack also includes Node Exporter for system metrics.

## Load testing

I built a Go traffic generator that creates users, opens WebSocket connections through Caddy, sends messages, and reads broadcasts. User count, message interval, ramp-up time, and run duration are configurable. It reports connections, sends, received broadcasts, reconnects, and errors.

Stopping a server while the tester runs exercises reconnection through Caddy using the same user IDs, with exponential backoff and jitter. Existing connections stay where they are when the server returns. The tester generates traffic and exercises failure recovery; it does not verify delivery correctness or measure latency.

---
title: Distributed Chat App - Complete
date: 2026-09-11
description: Outling the chat system I built, focusing on the infrastructure involved.
tags: go, postgres, redis, prometheus, grafana, typescript, docker, caddy
published: true
---

## Distributed Chat App

The chat app I've talked about before is finally complete. It was a really fun project and I'm proud of how it turned out. This project was intended to help me learn and enforce my knowledge regarding distributed systems and how they communicate to each other. Before this project I had no clue what pub/sub architecture was, had never implemented a load balancer, no clue about metrics and visualiser tools like Prometheus or Grafana and had never used Redis. Now I think I can very much say I know what all those things are and could apply them in other projects if they fit.

## What This Project Is

I think this is my first official devlog regarding this project. I have mentioned it before but I'll just go over it again here.

### The Stack

The stack consists of:

**Frontend**:
- React
- TypeScript

**Backend**:
- Go
- Docker
- Caddy
- Redis
- PostgreSQL
- Prometheus
- Grafana

### How It Works

A really basic vite react up as the frontend to act as a client, barely did anything to it and it's pretty simple. If you want to see what it looks like, you can find a screenshot in the actual project page for this project [here](https://kayrabulbul.dev/projects/distributed-chat-app). 

Everything is actually run on Docker, this includes the database, Caddy, Redis, Prometheus and Grafana. Each server on start up subscribes to a Redis channel and this is how messages are distributed to all servers. From there the server broadcasts the messages to all clients connected. Every time a client writes a message, it is both stored in the database and published to the Redis channel.

Caddy is a load balancer that distributes clients between the three websocket servers in a round robin fashion. 

Prometheus scrapes the metrics from the servers and Grafana uses those to visualise and display them in a dashboard. An image of the dashboard can also be found in the project page.

## What I learned

I learned a lot from this project. For example I didn't even know what pub/sub architecture was until this. Now I feel pretty comfortable with the concept and have also used other pub/sub tools like RabbitMQ.

This was also my first time ever implementing load balancing. I knew what load balancing was, mainly because I play factory games like Satisfactory where load balancing is also a term and basically means the same thing. It was honestly really simple using Caddy to do it, not much issues other than just some port config issues but those are just all my own skill issues as it was my first time haha.

Redis is also something I've never used or even knew what it did to be frank. The main thing I heard about it was it being used for caching, I later found out it also as a pub/sub feature which is what I used it for here. I chose Redis since it's popular and I do want to implement caching eventually so I thought I'd use one tool for both.

Prometheus and Grafana were probably my favourite parts of this project. I really enjoy looking at graphs and numbers especially when they show something I build myself. I also built a load tester to actually have some proper metrics and it's cool to see it in real time. I also tested things like killing a server and watching connected clients get redistributed to the other servers, again really cool stuff to watch!

## Next steps

I'm not sure what I'll work on next. It'll most likely be that game I'm building with Odin. University is getting pretty hectic at the moment though, I'm learning assembly for the first time for one of my courses so definitely have to focus up on that (also pretty behind in a math course). So I'm not sure if there'll be any updates soon, hopefully when this semester ends at the end of October I can lock back in and make some real progress in the game and figure out more infrastructure focused projects as well.



---
title: Hackathon WINNER!!!
date: 2026-09-07
description: We won our track in the hackathon!
tags: hackathon, legible, odin, go, infrastructure
published: true
---

## WINNER

Ladies, ladies, let's chill type shi. Yes, my team and I did win our first ever hackathon! This was everyone's first hackathon and I'm beyond happy with our project and obviously the result haha. Now to be honest, I'm writing this REALLY late, we won like two weeks ago LOL. But I still wanted to talk about it and also I want to talk about a new project I'm working on!

## Legible

So our project was Legible. Legible is a browser extension + dashboard that allows the user to transform their webpage to be more visually accessible. There's features like font type/size/spacing, cursor size/type/colour, screen reading, a pomodoro timer, relaxing study sounds and the ability to save your transformation to your dashboard.

### What I Built

I built the backend API for Legible. I built it in Python using FastAPI. I personally would've rathered building it in Go but no one on the team knew Go except for me so I decided that it'd probably be better to go with a language like Python as everyone had prior Python experience and honestly the memory and speed increases with using Go over Python isn't a major concern for an app like Legible.

The API is basically just a REST API, has some endpoints for the extension and dashboard to hit to do basic database operations like saving/getting the webpage etc. There's also AI integrated in Legible, where the user can press a button for Gemini to summarise, restructure, simplify the saved webpage, so there's API endpoints for that too. You can also export a webpage you have saved with your settings applied as a PDF.

The most interesting part of the backend IMO is the way the dashboard and extension is paired. When the user presses the "connect" button on the extension, the backend automatically generates them a userID, which is used when they generate a pairing code. The pairing code is tied to their userID and has a 10 minute expiry. The user then uses that code to login to the dashboard and from there on out they have an access token which is sent in the bearer-token header when they open the dashboard. Obviously all their saved pages are tied to their userID as well so that's how their specific pages show up on their dashboard.

### What I'd Do Differently

First thing I'd do is get rid of Gemini. I absolutely HATED using Gemini as the AI for this project, it was such a pain. Definitely would switch to something like GPT 5.6 Luna or something since it's still very cheap, smart and I doubt would give the same amount of trouble as Gemini's API did.

Next is I'd add object storage. Yes you heard that right, we DON'T have object storage currently. Now you may be asking "so how do you store the html for the saved web pages", well the answer to that my friend is... A relational database... LOL. I know, I know, I'm actually brain dead, but cut me some slack, I had a week to get this out so I defaulted to what I know best which is a Postgres DB. So yeah... Object storage is definitely most needed haha.

## New Project(s)

I'm technically working on 3 projects currently. I periodically switch between them when I feel like it but 2 of them should be new to you guys. One is a factory game I'm building in Odin, the second is a distributed chat system. I think I might've talked about the chat system but essentially it's a bunch of websocket servers that clients are load balanced into and can publish messages which is seen by all clients on all servers.

### Distributed Chat App

The stack for it is currently:
- Go for the websocket server
- Caddy for load balancing
- Redis for pub/sub (and caching in the future)
- Docker which runs the containers for websockets, redis, and caddy
- ReactTS frontend as the client

That's basically the whole stack atm, I've got some `.sh` scripts where I can start and stop all the containers, also got one where I can remove all the websocket containers when I'm rebuilding the Go server image. Client on the frontend get's allocated to a server in a round robin system. Client sends a message which goes to that server and gets published to Redis. All servers are subscribed to the channel on launch so they all pickup that message and broadcast it to all their users. I want to add a Postgres database which stores users, messages and sessions so I can have usernames, message persistence etc. But that's where it's at atm, the repo for it can be found [here](https://github.com/KayraBulbul/distributed-chat-app).

### Factory Game

I've also been building a factory game in Odin which I'm pretty happy about. It's my first time making a game through code using Raylib and it's my first time using Odin ever. I've watched Karl Zylinski's [videos](https://www.youtube.com/playlist?list=PLxE7SoPYTef1jYHJ6NxNgocVjQKkq7eEa) on making a game using Raylib and Odin but the stuff I'm doing currently aren't covered anymore so I'm completely on my own. Well on my own is a bit of stretch, I do use AI to help me. I've got a skill that does a code review and writes me a detailed HTML essentially rating/judging me on how I did things/things I can fix or do better. Also have another skill where it makes HTML to teach me whatever concepts I ask it, this is Matt Pocock's "Teach" skill, the other code review one is my own. Most recently used the "Teach" skill to teach me about bitmasks and bitsets in Odin.

Currently I've got a player, player movement, a camera detachment system where when attached to the player it follows and keeps the player in the middle. When it's detached you can move the camera independently of the player. I've also got procedural world and resource generation using Odin's `core:math/noise` import to generate the values. All sprites are currently very shit and temp drawn by me ahaha. There's also no actual "factory" gameplay loop, I spent a long time just getting the world gen stuff working.

## End

That's basically what I've been up to recently. Next devlog will most likely be about the distributed chat system if I were to guess. I recorded some voice over and me coding for it, not sure if I'll publish it or how much of what I recorded will make it in but there could be a video in production for it :)

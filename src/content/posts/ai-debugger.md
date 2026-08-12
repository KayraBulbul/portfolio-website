---
title: Quick Update About What I'm Doing
date: 2026-08-13
description: Announcing a new project I'll be building alongside the webapp.
tags: AI, harness, go
published: true
---

## New Project

So I decided that I wanted to start a new project that's a bit more AI adjacent. I essentially want to build an AI harness + visual debugger to see how AI agents work under the hood.

My goal with this app is to expose things like context, tool calls, execution flow, state, and everything happening between prompt -> response.

The idea for this was actually given to me by one of my tutors for the current math course I'm doing at uni. I had a good conversation with him which I found pretty insightful. He is currently a SWE at AWS and one of the things he mentioned during the conversation was that building a app to see the internals and processes of an AI agent would be an appealing portfolio project on my resume haha. Anyway that lead me to actually researching about it and I started to find the idea/project really interesting. It's something that'll definitely test me as I've never done something like this before but I also think if I do this properly, it'll be a really good learning experience.

## Stack

Honestly still very early for everything, I haven't thought everything through yet but I reckon I'll end up using **Go** for this project. I originally thought Python but I think at some point I'd want the agent runtime to support concurrent executions which I believe is something Go excels at.

I also know OpenAI has a Go SDK which will definitely be useful, I'm thinking about using GPT-5.6 Luna since it's really cheap.

I want this project to also showcase infra/systems/devops type work so I want to end up using AWS, Terraform, containers etc. Obviously these will come in time as the project becomes more complex which also may lead to more complex tools, for example I'll be using Docker for containerisation but if container orchestration ends up being a problem (doubt it), I'll look into Kubernetes.

I plan to use PostgreSQL as the database, mainly cause it's the one I'm most comfortable with, honestly couldn't tell you things like speed tradeoffs etc between postgres and other dbs like sql server or something.

Either way the most basic version will probably have no persistence or any complex tools, most likely will just try building a quick CLI tool and give it basic access to a calculator or web search or something, don't know yet haha.

## What This Means for the Webapp

I'm not quitting or abandoning the webapp. There's actually a branch I'm working on (phase 3 - database integration) that still needs to be finished and merged. I'll most likely smash out that PR and then just take a break from it for a while, while I work on this since this is where my interests really lie at the moment. But I definitely will come back to it, I've put too much work into it to not see it finished.

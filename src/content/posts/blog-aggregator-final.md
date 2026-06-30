---
title: Blog Aggregator Project Devlog 4 - Final
date: 2026-06-29
description: The final devlog for the blog aggregator project. Discussing the last few features implemented and the overall learning experience by completing this project.
tags: go, postgres, goose, sqlc
published: true
---

## Blog Aggregator Project Devlog 4 - Final

I have finally completed the blog aggregator project! It can be found [here](https://github.com/KayraBulbul/gator).

This project has really helped me gain confidence in my Go programming ability. I think I said this in a previous devlog, but I had a moment during this project where I realised how far I've come in both my programming and engineering ability. I was able to think of solutions to problems very quickly, or if it wasn't that straightforward, I was able to look through documentation and find what I needed. This is something I'm really proud of, especially since I definitely have a lot of impostor syndrome due to an over-reliance on AI during my first two years of Uni.

I'll do a quick run through of my last additions!

### Final Additions

I added a posts table inside the database. This is where post metadata is stored while the `agg` command is running. The table holds data like: "Title", "URL", "Description" and "Published_at". The user can then use the new `browse [limit]` command to view the aggregated posts. The `limit` is defined by the user or is defaulted to 2, so if no limit value is added it'll display two posts to the user (or one if there is only one post aggregated).

The output is parsed to be human readable :)

I also added an official `README.md` that has the requirements to install, how to install, how to run and a list of all the commands. I do have a list of additions I want to eventually add:

- Use concurrency for the `agg` command
- Add a TUI
- Add an HTTP API for remote access

### Next Steps

Next on things I want to do is completing the HTTP Servers in Go course on boot.dev. From there ideally I'll have at least a basic understanding and confidence to do my chat app project. I think being able to do this chat app where my friends can all join and message each other will be the final marker for my Go learning as of now.

After that I want to move onto learning Odin! I purchased "Understanding the Odin Programming Language" by Karl Zylinski to accompany my learning, I've heard it's a good book and endorsed by GingerBill (Creator of Odin). This will be my first official dive into a manually memory managed language so I'm excited and worried. Again my ultimate goal with Odin is to build basically a Minecraft clone, specifically the procedural world generation. Honestly it may be better for me to learn and do this using C++ since that'll be a major part of my next uni semester, but I reckon the main learning gap I have right now is the manual memory management part, so Odin will ideally fill that in conceptually anyway.

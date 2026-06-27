---
title: Blog Aggregator Project Devlog 3
date: 2026-06-26
description: Added actual RSS Feed functionality with coressponding sql tables and handler functions.
tags: go, postgres, goose, sqlc
published: true
---

## Blog Aggregator Project Devlog 3

I progressed a fair bit since my last devlog, nearing the end of the project as a whole. The new additions all revolve around fetching and displaying actual feeds to the user. New additions include:

- New `feeds` and `feed_follows` tables
- Handlers to: follow a feed, unfollow a feed, add a feed, aggregate feeds by interval
- Added middleware to tidy up repetitive code

### New Tables

I've added two new database tables to manage the RSS feeds, one for storing feed metadata and another for tracking which feeds each user follows.

The `feeds` table stores RSS feed sources that belong to a specific user.
Each feed has a unique URL, display name, timestamps for creation/update tracking, and an optional `last_fetched_at` timestamp used to track when the feed was last checked.

```text
feeds
├── id                UUID PRIMARY KEY
├── created_at        TIMESTAMP NOT NULL
├── updated_at        TIMESTAMP NOT NULL
├── name              VARCHAR NOT NULL
├── url               VARCHAR UNIQUE NOT NULL
├── user_id           UUID NOT NULL
│   └── REFERENCES users(id)
│       └── ON DELETE CASCADE
└── last_fetched_at   TIMESTAMP
```

The `feed_follows` table stores which users follow which feeds.
This acts as a join table between `users` and `feeds`, allowing a many-to-many relationship where users can follow multiple feeds, and each feed can be followed by multiple users.

```text
feed_follows
├── id           UUID PRIMARY KEY
├── created_at   TIMESTAMP NOT NULL
├── updated_at   TIMESTAMP NOT NULL
├── user_id      UUID NOT NULL
│   └── REFERENCES users(id)
│       └── ON DELETE CASCADE
├── feed_id      UUID NOT NULL
│   └── REFERENCES feeds(id)
│       └── ON DELETE CASCADE
└── UNIQUE (user_id, feed_id)
```

### New Handlers

I've added a few new handlers for the new commands now available.

**`handlerAgg`**

This command fetches a feed based on a given interval. The feed it fetches is dependent on the `last_fetched_at` of the feed, starting with nulls first then the oldest if no there are no nulls.

For example, if I was following "Hacker News" (last_fetched_at is null) and "TechCrunch" (last_fetched_at is 2026/06/27 17:00:00), it'll fetch "Hacker News" and update it's last_fetched_at to that current time, making "TechCrunch" next to be fetched.

**`handlerAddFeed`**

This adds the feed to the database and the user's following list.

**`handlerFeeds`**

This returns a list of all added feeds.

**`handlerFollow`**

This adds a feed to the currently signed in user's following list.

**`HandlerFollowing`**

This lists all the feeds the currently signed in user is following.

**`handlerUnfollow`**

This unfollows the provided feed for the currently signed in user.

### Middleware

I added a `middleware.go` file that contains the middleware high order function. Basically it passes in the current user object to handler functions that need it. This helped me clean up some of the handler functions due to previously having to always do a `GetUser()` function execute. The full function is:

```Go
func middlewareLoggedIn(handler func(s *state, cmd command, user database.User) error) func(s *state, cmd command) error {
 return func(s *state, cmd command) error {
  innerUser, err := s.db.GetUser(context.Background(), s.cfg.Current_user_name)
  if err != nil {
   return err
  }
  return handler(s, cmd, innerUser)
 }
}

```

Honestly, I really struggled to get the thought process for this down. The course, which this project is from, just says to make it but I couldn't really wrap my head around it.

The reason why it's necessary is because of the way I register commands in `main.go`. The commands must fit the function signature of `func(s *state, cmd command) error`, so just adding a user argument to existing handler wouldn't be enough alone. What it does is, it returns a function where in the body, it calls the handler function with the extra user argument passed in.

Even now it's still a bit weird for me to think about, like I know how it works and why it works but still just doesn't look right to me. But I guess that's just a skill issue, maybe I should try to do more functional programming on my own.

### Wrap Up

I'm very close to the end of this project, should be able to fully finish it tomorrow and write my final devlog regarding it. Honestly been having a lot of fun with this project, I had one of those moments where I realised how far I've come as an engineer. I'm able to think about solutions or at the minimum the steps needed to achieve what I want to do fairly quickly. It's pretty cool thinking about where I am now compared to where I was a year ago, barely able to code in Python, now I'm comfortable programming in multiple languages and confident in picking up new ones while also just knowing so much more about system design to where I can figure out good approaches to common problems without having to search or use AI.

As always the source code can be viewed on my GitHub [here](https://github.com/KayraBulbul/gator).

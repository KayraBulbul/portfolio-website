---
title: Blog Aggregator Project Devlog 2
date: 2026-06-24
description: An update on how my blog aggregator is going. Covers the implementation of the database and how I access it using goose/sqlc.
tags: go, postgres, goose, sqlc
published: true
---

## Go Blog Aggregator Project Devlog 2

So I've done some more work for the blog aggregator project, mainly focusing on constructing the database and wiring it to the actual project using Goose and SQLC. Here's a list of all the new additions I've made and I'll give them their own subsections below:

- Refactored the project to be more organised and separate my concerns a little which lead to me finding some bits of code that I completely forgot about.
- Added a sql directory which includes the schema and queries.
- Added Handler functions for the new commands that utilise the new queries and database.
- Updated the old login function to utilise the new queries and database.

### Refactor

I did a decent refactor to my file structure for better organisation. I don't remember if I mentioned it in my previous devlog but I moved the `handlerLogin` function out of `main.go` and into a new `handlers.go` file in the main package. Now all my new handler functions live there and are only used to register commands in the main function like so:

```go
// main.go
appCommands := commands{make(map[string]func(*state, command) error)}
appCommands.register("login", handlerLogin)
appCommands.register("register", handlerRegister)
appCommands.register("reset", handlerReset)
appCommands.register("users", handlerUsers)

// handlers.go
func handlerLogin(s *state, cmd command) error {
    // login users that are present in the users table
}

func handlerRegister(s *state, cmd command) error {
    // register new users
}

func handlerReset(s *state, cmd command) error {
    // clear users table
}

func handlerUsers(s *state, cmd command) error {
    // return all users in the users table
}
```

This also lead me to realising that during my previous "refactor" I had left dead code/repeated code in both `main.go` and `config.go`, so this proper refactor allowed me to clean that all up.

### SQL Additions

I added a new directory with two sub-directories, queries and schema. The schema directory holds a `.sql` file that has the goose Up and goose Down queries which is essentially create table and drop table respectively.

The queries directory holds currently one `.sql` file which has all the queries used for the users table. These are queries such as `CreateUser`, `GetUser`, `DeleteUsers`, and `GetUsers`.

With both Goose and SQLC, you use comments to explain what the purpose of the queries are. For example:

```sql
-- +goose Up
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    name VARCHAR UNIQUE NOT NULL
);

-- name: CreateUser :one
INSERT INTO users (
    id,
    created_at,
    updated_at,
    name
) VALUES ($1, $2, $3, $4)
RETURNING *;
```

The top query is one from the schema directory, the `--+goose Up` section is what defines it for Goose to use it as the up query. The bottom one is the `CreateUser` query. In this case the comment is used to provide the name and what the return will be (which for `CreateUser` is `:one` meaning it expects one entry to be returned).

For the SQLC stuff, you have to run `sqlc generate` in the terminal, this generates the necessary go files in a specified directory which will then allow you to use the queries like functions in your actual go code. Speaking of, I forgot to mention that you need to run `sqlc init` to generate a `.yaml` file first. This is where you can specify certain configs including where to generate the code. My `sqlc.yaml` looks like this:

```yaml
version: "2"
sql:
  - schema: "sql/schema"
    queries: "sql/queries"
    engine: "postgresql"
    gen:
      go:
        out: "internal/database"
```

### New Handler Functions

As you might've seen earlier, there are three new handler functions: `handlerRegister`, `handlerReset`, `handlerUsers`. These are new commands that can be used when running gator.

The command "register", registers a new user and inserts them into the database while also switching the current user to that newly registered user. For example, if the current user is "grace" and I registered a new user "bob", if bob is not already present in the database he'll be added and the current user in the `.gaterconfig.json` file will be changed to "bob". If bob is already present however, it will error.

The command "reset" does what you'd expect it to do, it wipes the users table completely, deleting all entries. It uses the sql query `DELETE FROM users;`, though I did try `TRUNCATE` since I'm fairly certain it's quicker but it seems like you're not allowed to do that with SQLC (not that it would've mattered anyway, the database is currently really small).

Finally, the command "users" returns a list of all the users registered in the database. It'll also show a little `(current)` tag next to the currently logged in username.

### Updated Previous Function

Pretty simple this one, I updated the old `handlerLogin` function to now check if the name provided is already in the database. If it is, it works completely the same and just logs you in as expected, however if it isn't it will throw an error.

### Wrap Up

That's about all I've added since the previous devlog. I had a lot of fun figuring out how to use SQLC specifically and I'm really glad I did a proper refactor, I think everything is a lot more organised and just looks a lot better now because of it. My current file structure is:

```md
blog-aggregator/
├── internal/
│ ├── config/
│ │ └── config.go # application configuration
│ └── database/
│ ├── db.go # database connection setup
│ ├── models.go # database-related models
│ └── users.sql.go # generated sqlc queries
├── sql/
│ ├── queries/
│ │ └── users.sql # raw SQL queries used by sqlc
│ └── schema/
│ └── 001_users.sql # database schema migration
├── commands.go # CLI command logic
├── handlers.go # command handler functions
├── main.go # application entry point
├── sqlc.yaml # sqlc configuration
├── go.mod
├── go.sum
└── .gitignore
```

You can view all this yourself including the source code [here](https://github.com/KayraBulbul/gator). I currently don't have a read me or anything so if you believe you can run it yourself from what you can see in the source code, go right ahead. I will be making a proper read me that explains all steps later on though.

Anyway that's the end of this log. I think I'm slowly getting better at writing these, I think the format I used today by listing changes at the top and making subsections for them and going in depth is a good way of doing it. Next plan is to add the actual RSS Feed functionality!

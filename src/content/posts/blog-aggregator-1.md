---
title: Blog Aggregator Project Devlog 1
date: 2026-06-22
description: First devlog to my most recent go project, a blog aggregator that receives updates from websites without manually visiting them.
tags: go, postgreSQL, goose, SQLC
published: true
---

## Go Blog Aggregator Project Devlog 1

I've begun working on my first real project in Go. It's one of the guided projects on [boot.dev](https://boot.dev), "Build a Blog Aggregator".

It's about creating, you guessed it, a blog aggregator. Specifically an RSS feed aggregator, which just means it allows me to receive updates from websites without manually having to visit them. Using Goose and SQLC, we can manage database migrations (the schema) and generate Go code that can interact with the database using the respective tools. There is also the feature for multiple users on the same device which is stored in a `.gatorconfig.json` file. I can't really go much more in depth about the functionalities because honestly I just haven't made it that far in the project yet but I can go over what I've done so far and what I've learnt.

Currently I have a `main.go` file which has the core logic of the app. At the moment all it can do is login a user which updates the previously mentioned config json's "current_user_name" field to the provided username. I have a config package which holds certain helper functions/structs that are used in the main package. Honestly I'm pretty good with figuring out and coming up with the flow in how data should move and be transformed between the functions. My only struggles so far have been actual Go related syntax issues and forgetting what the exact methods I need to execute my plans. For example, I needed to turn regular data into json format but I had completely forgotten about `json.Marshal()`, same thing with the opposite `json.Unmarshal()` to convert the json data to the struct type. Both of these were necessary for my read and write functions here:

```go
func write(cfg Config) error {
    // get filepath

	jsonData, err := json.Marshal(cfg)
	if err != nil {
		return err
	}

    // write the jsonData to file

	return nil
}

func Read() (Config, error) {
    // get filepath and get data contents in json format

	var config Config
	if err = json.Unmarshal(data, &config); err != nil {
		return Config{}, err
	}

	return config, nil
}
```

I left out some parts and replaced them with comments just to not make it overly long. For something that admittedly is very simple code, I do NOT want to admit how long it took me to figure out the correct methods to transform between regular structs and json formatted data.

This project also introduced me to the os package which was something I never used before. I used it in a few places: `os.ReadFile`, `os.WriteFile`, `os.UserHomeDir` and `os.Args`. The guide on boot.dev is pretty hands off and forces you to figure out a lot of things on your own, but they did help out in certain cases for things that were completely new (such as linking the docs for the os package).

This is currently my main function:

```go
func main() {
	cfg, err := config.Read()
	if err != nil {
		log.Fatalf("Error reading config: %v", err)
	}

	appState := &state{&cfg}
	appCommands := commands{make(map[string]func(*state, command) error)}
	arguments := os.Args

	if len(arguments) < 2 {
		log.Fatal("Not enough arguments")
	}

	appCommand := command{
		name:      arguments[1],
		arguments: arguments[2:],
	}

	appCommands.register("login", handlerLogin)
	err = appCommands.run(appState, appCommand)
	if err != nil {
		log.Fatalf("Error running command: %v", err)
	}
}
```

What it currently does is registers the login command and stores it in a map, where the name is the key and the actual handler function is the value. I have the program just stop if it comes across any errors along the way. If you looked close at the `appCommand` variable which initialises as a `command` struct object(? not sure if it's correct to call it an object), it skips the first input and takes the second element (1 index) as the name, this is because the input always starts with "gator" (not that there is any checks for it at the moment realistically it can be anything), so we have to skip that first input to get to the actual command the user wants to execute.

So that's where I'm at currently, next is the database setup using PostgreSQL. I don't know if this devlog is any good to be honest, I couldn't really think of specifically what would be important to talk about. I guess main things I learnt so far is that I'm not that good with Go yet haha. Pointers (`*`) and addresses (`&`) are something I'll have to look more into, I used them and I've got a rough idea on what they're used for but honestly it's still a bit of a black box to me which at the moment I hope ends up unraveling itself as I gain more experience using them.

I do have plans for the next project I want to build which isn't a boot.dev guided project. I want to build a chat app where multiple users can join and chat to each other in real-time. I don't know exactly how I'd do that yet other than suspecting that I'd need to use webhooks, but I don't even know what webhooks are. The next boot.dev course I'm going to cover is "Learn HTTP Servers" which I'm hoping with everything else I've learnt, equips me with the basic knowledge to build an app like that. Only using this project as a learning experience and will probably just have some friends test it for fun.

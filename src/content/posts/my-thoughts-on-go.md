---
title: My thoughts on Go
date: 2026-06-17
description: My likes, dislikes and overall opinion on Go so far
tags: go, learning
published: true
---

## My Thoughts on Go So Far

So I've finally completed the "Learn Go" course on [Boot.dev](https://www.boot.dev/"). I've got some opinions on it but I can't say these will be my thoughts forever, I'd still consider myself to be learning the language and I'm yet to build an actual project in Go. I'll make an updated devlog, or most likely you'll probably see how my opinions change as I make devlogs regarding an actual Go project while I work on it.

Overall I'd say I'm really enjoying the simplicity of Go, I think code (both mine and others') is really easy to read and understand in this language. When I look at other peoples' code, even if it's something I've never done before, I can derive a general understanding of what it's supposed to be doing fairly quickly without much effort. I'll get more specific of my likes and dislikes here:

### What I like About Go

- The simplicity in syntax - Again as I said above, In my opinion Go code is usually really easy to understand. There usually isn't weird cleverness going on, everything is outlined how you would expect it to be, such as function signatures.
- Errors as values - I actually think I really enjoy explicitly handling all errors as values. I think this adds on to the simplicity and readability of Go's code and makes debugging easier. By handling every error with a `if err != nil {}` statement, it's obvious to see where errors may occur and you can provide yourself more specific information on what the error is compared to a `try{} catch{}`. The error can be anywhere in the try block and the catch block will usually return a more general error message or status code. Using a try-catch in my experience makes it harder to diagnose which line of code or function/method call is actually causing the error.
- Returning multiple values - I don't think I've worked with a programming language where you can just return multiple values separated by a coma, it's usually some sort of object or tuple in python's case. It's different from what I'm used to but again adds to the simplicity of the language.

### What I Don't like About Go

- Public and private - I don't like how whether or not something is public or private is based on the capitalisation of the name. I also don't like how everything is private by default and you have to make it public, I feel like it should be the opposite but that's just my opinion. I think this is one of the things in Go that makes it slightly less readable compared to if there was just keywords for public and private.
- Capitalisation in built-in function calls - `fmt.Println`, `fmt.Sprintf()`, `errors.New()`, I just don't like capitalising it. I don't know what else to say tbh haha, I just like Python's `print()` or TypeScript's `console.log()`. This is just a skill issue in my typing ability, more I do it the better it'll get but if public functions didn't have to be defined using a capital letter we could've had `fmt.println()` which is a lot better imo.

### What I Haven't Made a Decision on Yet

These are just some parts of Go where I haven't explored in depth yet and still learning to form a proper opinion.

- Channels - The concept of channels sounds interesting and I reckon you can use them to do pretty cool stuff, I just don't have enough experience with them yet to fully understand their use cases and capability.
- Maps - Currently pretty iffy about maps in the sense that they zero to `nil`. If I try writing to a nil map what does it do? Panic? I don't know yet but feel like there's a lot of room here to end up doing some stupid shit by accident and crashing the program.
- Pointers - This is because I don't have much experience in languages where you use pointers. My only experience with pointers are in C (which was also on boot.dev and very brief). I'll need more experience with using them but I'm assuming when all the skill issues are out the way I'd feel a lot better about them.

### What's Next?

Obviously will still be continuing to learn Go, still have two more courses on Boot.dev that I want to do + the blog aggregator project. Then I'll move onto my own project using Go which will probably be the end of my Go learning journey, at least for now.

I'm still excited about learning Odin and after I finish up with the above I'd like to begin on that.

For now expect to see me yap more about Go as I get more confident in it and build actual projects with it!

---
title: AI-assisted software development (By Delaware)
date: 2026-05-26 15:05:00
tags:
  - SeminarNotes
  - Research
categories:
  - seminars
  - notes
disqusId: seminar_notes_2026_05_26
toc: true
widgets:
  - position: left
    type: profile
    author: Sai (Emily) Peng
    author_title: Researcher
    location: Bruges, Belgium
    avatar: /img/avatar.png
    avatar_rounded: true
    follow_link: https://github.com/EmilyPeng2017
    social_links:
      Github:
        icon: fab fa-github
        url: https://github.com/EmilyPeng2017
      Email:
        icon: fas fa-envelope
        url: mailto:emily.peng0627@gmail.com
      LinkedIn:
        icon: fab fa-linkedin
        url: https://www.linkedin.com/in/sai-emily-peng/
      ResearchGate:
        icon: fab fa-researchgate
        url: https://www.researchgate.net/profile/Sai-Peng
      GoogleScholar:
        icon: fab fa-google
        url: https://scholar.google.com/citations?user=I-YA-aMAAAAJ&hl=en
  - position: left
    type: toc
    index: true
    collapsed: true
    depth: 3
  - position: left
    type: recent_posts
  - position: left
    type: archives
  - position: left
    type: tags
    order_by: name
    show_count: true
---
<!-- toc -->

> Live notes from a research seminar. These notes are intended to capture the main ideas, methods, examples, questions, and follow-up readings while the seminar is still fresh.

<!-- more -->

## Seminar information
- **Title:** AI-assisted software development
- **Date:** 2026-05-26
- **Venue / event:** M-Group seminar
- **Topic keywords:** AI Agent, LLM 

## Key ideas
- what happens when you send a message to a large language model (LLM) and it responds with code?
- spectrum of AI-assisted research: completion, collaboration, operation, and delegation.

## Background and motivation
TODO: Capture the broader context, prior work, assumptions, and motivation.

## Method / approach
Context window:
system instructuions -> conversation history -> retrieved knowledge -> tool descriptions -> tool outputs -> user input

> more context!=better results
the U-shaped performance curve: performance first decreases as more context is added, then increases after a certain point.

> prompt engineering: Best practices - assign a role, define the task, provide context, specify the output format, set success criteria

> context engineering: retrieval augmented generation

> what is AI memory: AI memory lets a chatbot remember useful information from past chats, so future responses feel more personal and less repetitive



### Model context protocol
MCP is a standardized method for integrating external data and tools with large language models it is often compared to USB-C for LLMs, providing a universal interface for connecting various sources of information and capabilities.


> how does it work: MCP server, MCP client, MCP protocol, MCP tools, MCP memory, MCP agent
> you can use existing MCP servers or build your own

> MCP useful servers: GitHub MCP, Playwright MCP, Azure DevOps MCP, Context7

> MCP is fairly new and thus has security flaws. There are several techniques hackers exploit to execute illegitimate actions. and it can also be token theft.

### what is an AI workspace
Core features: files, project memory, custom instructions, shared workflows

> why they matter: faster onboarding, better continuity, more accurate assistance, personalized workflows, team collaboration.


### Skills for AI-assisted software development
- anatomy of a skill folder: skill.md (required), script.py (optional), test.py (optional), README.md (optional), data/ (optional)

## A second brain
> a persistent memory layer you agent can access and update over time, allowing it to remember important information, learn from past interactions, and provide more personalized and context-aware responses.

> knowledge graph: import from other apps and file formats


## AI workflow
1. build your knowledge graphe
2. query your knowledge graph
3. use as research basis


## AI-assisted development
- chat in VS Code, ask mode
- github copilot coding agent - cloud based -> assign issues to the coding agent as you would assign it to a colleague

## Spec-driven development
1. software methodology
2. detailed requirements specifications defined upfront
3. tries to prevent


## Automation (CLI)
> you, as the developer, are still responsible for the code, even if it's generated.


## Pitfalls
- overtrusting AI and is output
- having no guardrials
- losing context


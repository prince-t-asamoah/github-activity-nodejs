# GitHub User Activity CLI

> A lightweight, API-driven command-line tool for inspecting GitHub user activity — minimal surface area, maximum signal.

## Overview

This CLI implementation aligns with the **GitHub User Activity project** outlined on Roadmap.sh. For the official specification, see:

> <https://roadmap.sh/projects/github-user-activity>

GitHub User Activity CLI is a forward-looking command-line application that fetches and displays recent public activity for any GitHub user using the GitHub REST API. It focuses on clarity, simplicity, and extensibility—no frameworks, no unnecessary abstractions, just clean Node.js and a well-defined CLI contract.

This repository contains a reference README to standardize implementation and accelerate onboarding.

---

## Key Features

* Fetch recent public GitHub activity for any user.
* Support multiple event types (pushes, issues, pull requests, stars, forks).
* Human-readable activity summaries optimized for terminal output.
* Robust error handling for invalid users and API failures.
* Zero external dependencies (Node.js v18+).
* Architecture designed for easy extension (filters, pagination, output formats).

---

## Data Source

The CLI consumes data from the **GitHub REST API**:

```
GET https://api.github.com/users/{username}/events
```

Only **public activity** is fetched. Authentication is optional and can be added later to increase rate limits.

---

## CLI Specification

### Constraints

* Use positional arguments for input.
* Use native Node.js APIs (`fetch`, `fs`, `process.argv`).
* Do **not** rely on third-party libraries.
* Output must be readable, concise, and terminal-friendly.
* Fail fast with meaningful error messages.

### Exit Codes & Errors

* Exit `0` on success.
* Non-zero exit codes for:
  * Missing or invalid arguments.
  * User not found.
  * API rate limits or network failures.
* Errors must be explicit and user-centric.

---

## Commands & Usage

```bash
# Fetch recent activity for a user
# CLI: github-activity <username>

github-activity torvalds
```

### Example Output

```
Pushed commits to linux
Opened an issue in git
Starred vercel/next.js
Forked facebook/react
```

---

## Supported Event Types

| Event Type | Description |
|----------|------------|
| PushEvent | Pushed commits to a repository |
| IssuesEvent | Opened or closed an issue |
| PullRequestEvent | Opened, closed, or merged a pull request |
| WatchEvent | Starred a repository |
| ForkEvent | Forked a repository |
| CreateEvent | Created a branch or repository |

---

## Implementation Guidance

1. Argument parsing via `process.argv`
2. Native `fetch` for API requests (Node 18+)
3. Deterministic event formatting
4. Graceful rate-limit handling
5. Clean separation of concerns

---

## License

MIT License

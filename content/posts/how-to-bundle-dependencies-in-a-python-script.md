---
title: How to bundle dependencies in a Python script
description: Using `uv` to run scripts with external dependencies.
date: 2024-12-07
creationDate: 2024-12-07
featured: true
draft: false
tags:
  - how-to
  - development
  - python
  - uv
---

Whenever I write utility Python scripts, I'm always hurt by the constraint of not using external dependencies, because I want them to run in _any_ environment. But if I want to use [`typer`](https://github.com/fastapi/typer) for a nice CLI experience, or [`requests`](https://requests.readthedocs.io/en/latest/) to avoid going mad over an HTTP requets, or [`sh`](https://github.com/amoffat/sh) for easy interactions with the underlying shell?

I found out you can bundle dependencies in your scripts by running them with [`uv`](https://github.com/astral-sh/uv):

```python
#!/usr/bin/env -S uv run -s -q
# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "typer>0.15",
#   "requests==2.32.3",
#   "sh",
# ]
# ///
import sh
import requests
... # your python script
```

The `uv run ` shebang takes care of everything:

- the `-s` flag tells `uv run` it's interacting with a script;
- the `-q` flag suppresses `uv`'s own messages about getting your dependencies.

The first time you run your script it might take slightly longer (because `uv` will download and cache your dependencies), but all the subsequent calls will be instant! 🌈

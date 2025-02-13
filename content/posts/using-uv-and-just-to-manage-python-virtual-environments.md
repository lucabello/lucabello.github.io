---
title: Using `uv` and `just` to manage Python virtual environments
description: How to make an extremely lightweight venv manager.
date: 2024-12-07
creationDate: 2024-12-07
modDatetime:
featured: true
draft: false
tags:
  - how-to
  - development
---

Over time, I tried lots of tools to manage my Python virtual environments, but I didn't end up liking any of them:

- [**`python -m venv`**](https://docs.python.org/3/library/venv.html) is too "manual" for me, and I usually want my virtual environments all in one place;
- [**`virtualenvwrapper`**](https://pypi.org/project/virtualenvwrapper/) is a 1.4k-lines Bash script - I want something simple and solid;
- [**`pew`**](https://github.com/pew-org/pew) worked for me, but it's a lot more complex than what I need.

I decided to write my own, and started to brainstorming what I wanted from my "venv manager".

## Designing the _perfect_ venv manager 📐

I came up with a few requirements:

- it should be very simple and self-contained;
- it should allow me to easily create, activate, list, and delete virtual environments;
- it should be fast;

Luckily, there are two tools for the job: [`uv`](https://github.com/astral-sh/uv) and [`just`](https://github.com/casey/just).

`uv` is "an extremely fast Python package and project manager, written in Rust" (from their GitHub description). It's so fast that in lots of cases it removes the need for virtual environments entirely - you can just create an ephemeral one and istall the dependencies almost instantly. With `uv venv` you can create virtual environments very easily, and after activating you can `uv pip install` (or just `pip install`) everything you need.  
While `uv` addresses a part of my requirements (venv creation, speed), it doesn't cover all on its own.

`just` is a command runner inspired by `make`: this makes its syntax extremely familiar, and it brings a lot of quality-of-life improvements to the table. Among other things, `just` allows you to define recipes that accept arguments, and to effectively show and document the available commands with `just --list`.

Both of them are in Snapcraft, so you can easily install them with:

```bash
snap install astral-uv
snap install just
```

## Putting the pieces together 🧩

This is the `uv-venv` script that lives somewhere in my `PATH`:

```makefile
#!/usr/bin/env -S just --justfile
set quiet

uv := `which uv` # require `uv`
venv_home := env('WORKON_HOME') # require env variable

[private]
default:
  echo "Virtual Environment manager - in Just!\n"
  just --justfile={{justfile()}} --list

# Create a new virtual environment under {{venv_home}}
new name:
  uv venv --allow-existing --relocatable --no-config --directory="{{venv_home}}" "{{name}}"

alias rm := remove
# Remove a virtual environment from {{venv_home}}
remove name:
  echo "Removing {{venv_home}}/{{name}}"
  rm -rI "{{venv_home}}/{{name}}"

alias ls := list
# List all the virtual environments in {{venv_home}}
list:
  ls "{{venv_home}}"

# Activate a virtual environment
activate name:
  #!/usr/bin/env bash
  source "{{venv_home}}/{{name}}/bin/activate"
  exec $SHELL -i
```

Let's go over the different sections of the script.

- `set quiet` makes recipes silent by default, so they are not printed before being executed;
- `uv` and `venv_home` are Just variables; `just` will fail if `which uv` fails (effectively enforcing it as a requirement), or if `WORKON_HOME` is not an environment variable;
- the `default` recipe is what's executed when I run the script without any recipe: it will show all the available recipes next to their verbose explanation;
- the other recipes are pretty self-explanatory;
- `alias` allows to call a recipe via multiple names: `uv-venv list` and `uv-venv ls` will both run the `list` recipe.

If I run it, it displays the following (with colored output):

```bash
∮ uv-venv
Virtual Environment manager - in Just!

Available recipes:
    activate name # Activate a virtual environment
    list          # List all the virtual environments in {{venv_home}}
    ls            # alias for `list`
    new name      # Create a new virtual environment under {{venv_home}}
    remove name   # Remove a virtual environment from {{venv_home}}
    rm name       # alias for `remove`
```

## Conclusions 🌷

This little script made my workflows a lot faster, it's tiny (30 lines of code!), and it does exactly what I wanted.

Hope it's useful for you too!

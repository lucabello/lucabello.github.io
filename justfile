set shell := ["bash", "-cu"]

# Corepack-managed npm/npx live under ~/.local/bin; make sure they win over the
# older system-wide npm 9.2.0 that ships with node 22.22 on Debian.
export PATH := env_var('HOME') + "/.local/bin:" + env_var('PATH')

# List of available recipes.
default:
    @just --list

# Install project dependencies (uses corepack-pinned npm) and the `d2` CLI
# (used at build time to render ```d2 diagram code blocks to SVG; see src/plugins/d2.ts).
install:
    npm ci
    command -v d2 >/dev/null || curl -fsSL https://d2lang.com/install.sh | sh -s -- --prefix "$HOME/.local"

# Type-check and lint.
check:
    npm run check

# Auto-format the repo with prettier.
format:
    npm run format

# Serve the site locally with hot reload at http://localhost:4321
dev:
    npm run dev

# Alias for `dev`.
serve: dev

# Build the static site into ./dist.
build:
    npm run build

# Preview the production build locally.
preview:
    npm run preview

# Remove build artefacts.
clean:
    rm -rf dist .astro

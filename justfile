set shell := ["bash", "-cu"]

# Corepack-managed npm/npx live under ~/.local/bin; make sure they win over the
# older system-wide npm 9.2.0 that ships with node 22.22 on Debian.
export PATH := env_var('HOME') + "/.local/bin:" + env_var('PATH')

# List available commands
[private]
@default:
    just --list
    echo ""
    echo "For help with a specific recipe, run: just --usage <recipe>"

# ============================================================================
# Development
# ============================================================================

# Serve the site locally with hot reload at http://localhost:4321
[group("dev")]
dev:
    npm run dev

# Alias for `dev`.
[group("dev")]
serve: dev

# Preview the production build locally.
[group("dev")]
preview:
    npm run preview

# Type-check and lint.
[group("dev")]
check:
    npm run check

# Auto-format the repo with prettier.
[group("dev")]
format:
    npm run format

# ============================================================================
# Build & Package
# ============================================================================

# Build the static site into ./dist.
[group("build")]
build:
    npm run build

# Remove build artefacts.
[group("build")]
clean:
    rm -rf dist .astro

# ============================================================================
# Maintenance
# ============================================================================

# Install project dependencies (uses corepack-pinned npm) and the `d2` CLI
# (used at build time to render ```d2 diagram code blocks to SVG; see src/plugins/d2.ts).
[group("maintenance")]
install:
    npm ci
    command -v d2 >/dev/null || curl -fsSL https://d2lang.com/install.sh | sh -s -- --prefix "$HOME/.local"

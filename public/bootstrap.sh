#!/usr/bin/env bash
# Bootstrap a fresh Ubuntu machine for the private lucabello/dotfiles repo:
# fetch the GitHub SSH key from Bitwarden and load it into ssh-agent (keychain),
# so chezmoi can clone the dotfiles over SSH.
#
# Usage:
#   curl -fsSL https://lucabello.github.io/bootstrap.sh | bash
set -euo pipefail

GITHUB_USER="lucabello"
DOTFILES_REPO="${GITHUB_USER}/dotfiles"
# Same version and path as dotfiles' dot_scripts/executable_bitwarden-cli, so chezmoi's
# setup script reuses this install and login. Keep BW_TAG in sync with TAG there.
BW_TAG="cli-v2026.1.0"
BW="${HOME}/.local/bin/bw"
SSH_DIR="${HOME}/.ssh"
PACKAGES=(git openssh-client keychain unzip jq)

log() { printf '\033[1;34m+ %s\033[0m\n' "$*" >&2; }
die() {
  printf '\033[1;31mx %s\033[0m\n' "$*" >&2
  exit 1
}

main() {
  [[ "${EUID}" -ne 0 ]] || die "Run as your normal user (sudo is used where needed), not as root."

  TMP_DIR="$(mktemp -d)"
  trap 'rm -rf "${TMP_DIR}"' EXIT

  log "Installing packages: ${PACKAGES[*]}"
  sudo apt-get update -qq
  sudo apt-get install -y -qq "${PACKAGES[@]}"
  if ! command -v chezmoi >/dev/null 2>&1 && [[ ! -x /snap/bin/chezmoi ]]; then
    log "Installing chezmoi"
    sudo snap install chezmoi --classic
  fi

  if [[ ! -x "${BW}" ]]; then
    log "Installing Bitwarden CLI ${BW_TAG#cli-v} to ${BW}"
    curl -fsSL -o "${TMP_DIR}/bw.zip" \
      "https://github.com/bitwarden/clients/releases/download/${BW_TAG}/bw-linux-${BW_TAG#cli-v}.zip"
    unzip -q "${TMP_DIR}/bw.zip" -d "${TMP_DIR}"
    install -D -m 755 "${TMP_DIR}/bw" "${BW}"
  fi

  BW_SESSION=""
  local attempt
  for attempt in 1 2 3; do
    if "${BW}" login --check >/dev/null 2>&1; then
      log "Unlocking Bitwarden (attempt ${attempt}/3)"
      BW_SESSION="$("${BW}" unlock --raw || true)"
    else
      log "Logging in to Bitwarden (attempt ${attempt}/3)"
      BW_SESSION="$("${BW}" login --raw || true)"
    fi
    [[ -z "${BW_SESSION}" ]] || break
  done
  [[ -n "${BW_SESSION}" ]] || die "Could not unlock Bitwarden"
  export BW_SESSION
  trap 'rm -rf "${TMP_DIR}"; "${BW}" lock >/dev/null 2>&1 || true' EXIT
  "${BW}" sync >/dev/null

  log "Fetching the GitHub SSH key for ${GITHUB_USER}"
  local item_id name
  item_id="$("${BW}" list items --url github.com --search "${GITHUB_USER}" | jq -r '.[0].id // empty')"
  [[ -n "${item_id}" ]] || die "No Bitwarden item with URL github.com matching '${GITHUB_USER}'"
  for name in git git.pub; do
    "${BW}" get attachment "${name}" --itemid "${item_id}" --output "${TMP_DIR}/${name}" >/dev/null
  done
  install -d -m 700 "${SSH_DIR}"
  install -m 600 "${TMP_DIR}/git" "${SSH_DIR}/git"
  install -m 644 "${TMP_DIR}/git.pub" "${SSH_DIR}/git.pub"

  log "Loading ${SSH_DIR}/git into ssh-agent via keychain"
  keychain --quiet --nogui "${SSH_DIR}/git"

  log "Done. Now clone and apply the dotfiles (Bitwarden will ask for your password once more):"
  # shellcheck disable=SC2016 # printed literally for the user to run
  printf '\n  eval "$(keychain --eval --quiet)" && chezmoi init --apply --ssh %s\n\n' "${DOTFILES_REPO}" >&2
}

# Read prompts from the terminal even when the script itself arrives on stdin (curl | bash).
if { : </dev/tty; } 2>/dev/null; then
  main "$@" </dev/tty
else
  main "$@"
fi

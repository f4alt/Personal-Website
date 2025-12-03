#!/usr/bin/env bash
#
# initial-setup.sh
#
# Master initial setup script for a fresh Ubuntu server.
#
# Modes:
#   1) Default (no args):
#        - apt update/upgrade
#        - create DEPLOY_USER user (if not exists)
#        - add DEPLOY_USER to sudo
#        - disable root SSH login (but keep password login for users)
#        - configure UFW, Fail2ban, unattended security updates
#        - reboot
#
#   2) --ssh-only-login-setup:
#        - enforce SSH key-only authentication (PasswordAuthentication no)
#        - keep root login disabled
#        - no reboot
#
source "$(dirname "$0")/deploy.env"
set -euo pipefail

SSH_ONLY_MODE=0

if [[ "${1:-}" == "--ssh-only-login-setup" ]]; then
  SSH_ONLY_MODE=1
fi

# --- Safety checks ----------------------------------------------------------

if [[ $EUID -ne 0 ]]; then
  echo "Run this script with sudo or as root." >&2
  exit 1
fi

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This script expects an apt-based system (Ubuntu/Debian)." >&2
  exit 1
fi

SSH_SERVICE="ssh"
SSHD_CONFIG="/etc/ssh/sshd_config"
BACKUP="/etc/ssh/sshd_config.$(date +%Y%m%d-%H%M%S).bak"

# --- Helper: SSH reload with test ------------------------------------------

reload_sshd() {
  echo "==> Testing SSH configuration..."
  sshd -t
  echo "==> Reloading SSH daemon..."
  systemctl reload $SSH_SERVICE
}

# =====================================================================
# SSH-only hardening (run after initial setup + reboot)
# =====================================================================
if [[ "$SSH_ONLY_MODE" -eq 1 ]]; then
  echo "==> SSH-only-login setup mode"

  echo "==> Backing up sshd_config to $BACKUP"
  cp "$SSHD_CONFIG" "$BACKUP"

  echo "==> Enforcing SSH key-only authentication (disabling passwords)..."

  # Remove existing relevant lines
  sed -i '/^\s*PasswordAuthentication\s\+/d' "$SSHD_CONFIG"
  sed -i '/^\s*ChallengeResponseAuthentication\s\+/d' "$SSHD_CONFIG"
  sed -i '/^\s*UsePAM\s\+/d' "$SSHD_CONFIG"
  sed -i '/^\s*PermitRootLogin\s\+/d' "$SSHD_CONFIG"
  sed -i '/^\s*MaxAuthTries\s\+/d' "$SSHD_CONFIG"
  sed -i '/^\s*LoginGraceTime\s\+/d' "$SSHD_CONFIG"

  cat >> "$SSHD_CONFIG" <<'EOF'

# --- Hardened SSH settings (key-only; added by initial-setup.sh --ssh-only-login-setup) ---
PermitRootLogin no
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM no
MaxAuthTries 3
LoginGraceTime 20
# Optional: change SSH port (also update UFW if you do)
# Port 2222
# -----------------------------------------------------------------
EOF

  reload_sshd

  echo
  echo "==> SSH-only hardening complete."
  echo "  - Root SSH login disabled"
  echo "  - Password-based SSH logins disabled (key-only)"
  echo "  - Keep this terminal open and test a NEW SSH session using your key before closing."
  echo
  exit 0
fi

# =====================================================================
# Initial full setup for fresh server
# =====================================================================

echo "==> Running initial server setup (fresh server mode)..."

# 1) apt update + upgrade
echo "==> Updating and upgrading packages..."
apt-get update -y
apt-get upgrade -y

# 2) create user if missing
USER_NAME="$DEPLOY_USER"

if id "$USER_NAME" >/dev/null 2>&1; then
  echo "==> User '$USER_NAME' already exists, skipping creation."
else
  echo "==> Creating user '$USER_NAME' (you will be prompted for password and details)..."
  adduser "$USER_NAME"
fi

# 3) give user sudo privileges
echo "==> Adding '$USER_NAME' to sudo group..."
usermod -aG sudo "$USER_NAME"

# 4) minimal hardening: disable root login, keep password auth
echo "==> Backing up sshd_config to $BACKUP"
cp "$SSHD_CONFIG" "$BACKUP"

echo "==> Applying minimal SSH hardening (disable root login, keep password login)..."

# Remove existing conflicting lines
sed -i '/^\s*PermitRootLogin\s\+/d' "$SSHD_CONFIG"
sed -i '/^\s*PasswordAuthentication\s\+/d' "$SSHD_CONFIG"
sed -i '/^\s*ChallengeResponseAuthentication\s\+/d' "$SSHD_CONFIG"
sed -i '/^\s*UsePAM\s\+/d' "$SSHD_CONFIG"
sed -i '/^\s*MaxAuthTries\s\+/d' "$SSHD_CONFIG"
sed -i '/^\s*LoginGraceTime\s\+/d' "$SSHD_CONFIG"

cat >> "$SSHD_CONFIG" <<'EOF'

# --- Minimal SSH hardening (added by initial-setup.sh) ---
PermitRootLogin no
PasswordAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
MaxAuthTries 5
LoginGraceTime 30
# Optional: change SSH port (also update UFW if you do)
# Port 2222
# --------------------------------------------------------
EOF

reload_sshd

# UFW firewall
echo "==> Installing and configuring UFW firewall..."
if ! command -v ufw >/dev/null 2>&1; then
  apt-get install -y ufw
fi

ufw allow OpenSSH || true
# Allow HTTP/HTTPS; 'Nginx Full' may not exist yet, so do both styles:
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw allow "Nginx Full" || true

if ! ufw status | grep -q "Status: active"; then
  echo "==> Enabling UFW..."
  ufw --force enable
else
  echo "==> UFW already active."
fi

echo "==> UFW status:"
ufw status

# Fail2ban
echo "==> Installing Fail2ban..."
apt-get install -y fail2ban

JAIL_LOCAL="/etc/fail2ban/jail.local"
if [[ ! -f "$JAIL_LOCAL" ]]; then
  echo "==> Creating basic /etc/fail2ban/jail.local..."
  cat > "$JAIL_LOCAL" <<'EOF'
[DEFAULT]
bantime  = 10m
findtime = 10m
maxretry = 5

[sshd]
enabled = true
EOF
else
  echo "==> jail.local already exists, leaving as-is."
fi

echo "==> Enabling and starting Fail2ban..."
systemctl enable --now fail2ban || true

echo "==> Fail2ban systemd status:"
systemctl is-active --quiet fail2ban && systemctl status fail2ban --no-pager || echo "Fail2ban is not active."

echo "==> Fail2ban sshd jail status:"
if systemctl is-active --quiet fail2ban; then
  if fail2ban-client status sshd >/dev/null 2>&1; then
    fail2ban-client status sshd
  else
    echo "Fail2ban sshd jail not reporting (may not be enabled yet or config needs review)."
  fi
else
  echo "Fail2ban service is not running; check logs with: journalctl -u fail2ban"
fi

# Unattended security updates
echo "==> Enabling unattended security updates..."
apt-get install -y unattended-upgrades

AUTO_UPGRADES_CONF="/etc/apt/apt.conf.d/20auto-upgrades"
cat > "$AUTO_UPGRADES_CONF" <<'EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOF

systemctl enable --now unattended-upgrades || true

# Summary + reboot
echo
echo "==> Initial setup complete."
echo
echo "Summary:"
echo "  - System updated and upgraded"
echo "  - User '$USER_NAME' created (or already existed) and added to sudo"
echo "  - Root SSH login disabled"
echo "  - SSH password login still enabled for normal users"
echo "  - UFW enabled (SSH + HTTP/HTTPS allowed)"
echo "  - Fail2ban installed with sshd jail"
echo "  - Unattended security updates enabled"
echo
echo "A reboot is recommended now to finalize everything."
echo "Rebooting in 10 seconds... (Ctrl+C to cancel)"
sleep 10
reboot


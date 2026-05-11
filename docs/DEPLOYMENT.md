# Deployment Guide

> VPS (Ubuntu 22.04) + Nginx + PM2 + GitHub Actions CI/CD + SSL via Certbot.

---

## 1. VPS Initial Setup

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Update system
apt update && apt upgrade -y

# Install Node 18 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Install Nginx
apt install nginx -y

# Install PM2 globally
npm install -g pm2

# Create a non-root user (recommended)
adduser deploy
usermod -aG sudo deploy
# Copy your SSH key: ssh-copy-id deploy@YOUR_VPS_IP
```

---

## 2. Clone & Build on VPS

```bash
su - deploy

# Clone your repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio-project

# Backend setup
cd backend
npm install --production
cp .env.example .env
nano .env   # fill in real values

# Frontend build
cd ../frontend
npm install
npm run build   # outputs to frontend/dist/
```

---

## 3. PM2 — Keep Node.js Alive

```bash
cd ~/portfolio-project/backend

# Start with PM2
pm2 start server.js --name portfolio-api

# Save PM2 process list (survives reboots)
pm2 save
pm2 startup   # follow the printed command to enable on boot
```

**Useful PM2 commands:**
```bash
pm2 status          # check running processes
pm2 logs portfolio-api   # tail logs
pm2 restart portfolio-api
pm2 stop portfolio-api
```

---

## 4. Nginx Configuration

Create config file:
```bash
nano /etc/nginx/sites-available/portfolio
```

Paste this (replace `yourdomain.com`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Serve React build (static files)
    root /home/deploy/portfolio-project/frontend/dist;
    index index.html;

    # SPA fallback — React Router handles routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to Express
    location /api/ {
        proxy_pass         http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static asset caching
    location ~* \.(js|css|png|webp|jpg|jpeg|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable and test:
```bash
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t          # test config
systemctl reload nginx
```

---

## 5. SSL — HTTPS via Certbot

```bash
apt install certbot python3-certbot-nginx -y

# Issue certificate (follow prompts)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Certbot auto-renews. Test renewal:
certbot renew --dry-run
```

After this, Certbot rewrites your Nginx config to include SSL automatically.

---

## 6. GitHub Actions CI/CD

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: SSH Deploy
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/portfolio-project
            git pull origin main

            # Rebuild frontend
            cd frontend
            npm install
            npm run build

            # Restart backend
            cd ../backend
            npm install --production
            pm2 restart portfolio-api

            echo "Deploy complete"
```

**GitHub Secrets to add** (Settings → Secrets → Actions):
| Secret | Value |
|--------|-------|
| `VPS_HOST` | Your VPS IP or domain |
| `VPS_USER` | `deploy` (or your user) |
| `VPS_SSH_KEY` | Contents of `~/.ssh/id_rsa` (private key) |

---

## 7. DNS Setup

Point these records to your VPS IP (in your domain registrar):
```
A    @              YOUR_VPS_IP
A    www            YOUR_VPS_IP
```

Propagation: up to 48h, usually under 1h.

---

## 8. Production Checklist

- [ ] `.env` has real SMTP credentials on VPS
- [ ] `NODE_ENV=production` in `.env`
- [ ] `FRONTEND_URL` in `.env` matches your actual domain
- [ ] Nginx config tested (`nginx -t`)
- [ ] SSL certificate active (https:// works)
- [ ] PM2 process survives reboot (`pm2 startup` done)
- [ ] GitHub Actions secret keys set
- [ ] First deploy pushed and confirmed working
- [ ] Contact form tested end-to-end (sends real email)

# Deployment Guide

This directory contains the scripts used to provision a fresh server and deploy the website.  
The workflow covers DNS setup, server bootstrapping, nginx configuration, SSL certificates, and automatic deployments.

---

## 1. Configure DNS

Update DNS records at your registrar so the domain points to your server:

### **A Records**
| Host | Type | Value |
|------|------|--------|
| `@`  | A    | `<your server IP>` |
| `www` | A *(optional)* | `<your server IP>` |

DNS may take several minutes to propagate.

---

## 2. Create Your Environment File

From the `deploy/` directory:

```bash
cp deploy.env.example deploy.env
```

Edit `deploy.env` and update:

- `DOMAIN` — your domain name  
- `DEPLOY_USER` — the user running deployments  
- `APP_DIR` — location of the cloned repo  
- `LETSENCRYPT_EMAIL` — email for certificate renewal alerts  
- `DOCROOT` — nginx’s web root for the site  

---

## 3. Bootstrap the Server

Run the bootstrap script **with sudo**:

```bash
sudo ./bootstrap-server.sh
```

This script:

- installs system packages (git, node, npm, nginx, certbot)  
- creates the document root  
- configures UFW firewall rules  
- registers an `@reboot` cron job to auto-deploy the site  

---

## 4. Configure Nginx + SSL

Run:

```bash
sudo ./setup-nginx-and-ssl.sh
```

This will:

- write the nginx vhost  
- configure a default redirect for raw IP access  
- obtain or renew Let's Encrypt certificates  
- reload nginx with HTTPS enabled  

---

## 5. Deploy the Website

Manual deploy:

```bash
./deployWebsite.sh
```

This script:

- pulls the latest repo changes  
- installs dependencies  
- builds the production bundle  
- syncs the output into `/var/www/<domain>`  

A deploy also runs automatically when the server reboots.

---

## 6. Verification

### Check nginx:
```bash
systemctl status nginx
```

Visit your site:

- `http://your-domain`  
- `https://your-domain`  
- `http://your-ip` → should redirect to your domain  

### Check SSL renewal:
```bash
sudo certbot renew --dry-run
```

### Check deploy-on-reboot:
```bash
sudo reboot
sudo tail -n 50 /var/log/personal-website-deploy.log
```

You should see the repo pull, build, and sync steps.

---


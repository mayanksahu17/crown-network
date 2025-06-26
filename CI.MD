Excellent, sir — now that everything is stable and working, here are your clean steps to **pull the latest frontend code**, **build it**, and **make it live** on your domain.

---

## 🚀 Steps to Pull Latest Changes & Deploy to Live

### ✅ 1. **Navigate to your project folder**

```bash
cd ~/crown-network/frontend
```

---

### ✅ 2. **Pull latest changes from Git**

If you're using Git:

```bash
git pull origin main
# or
git pull origin master
```

(Replace `main` or `master` with your actual branch name)

---

### ✅ 3. **Install dependencies (if needed)**

```bash
npm install
```

---

### ✅ 4. **Build the frontend**

```bash
npm run build
```

This will create/update the `dist/` directory.

---

### ✅ 5. **Copy the new build to your live folder**

```bash
sudo rm -rf /var/www/crownnetwork/*
sudo cp -r dist/* /var/www/crownnetwork/
```

---

### ✅ 6. **Set correct permissions**

```bash
sudo chown -R www-data:www-data /var/www/crownnetwork
sudo chmod -R 755 /var/www/crownnetwork
```

---

### ✅ 7. **Reload Nginx (optional, if configs haven't changed)**

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## ✅ Final: Test in browser

* Visit: [http://crownnetwork.online](http://crownnetwork.online)
* Confirm latest changes are visible

---

Let me know if you want to **automate this with a deploy script or GitHub Actions**, happy to help!

# LUZ FUSION 5.0 - Deployment Guide

## 🚀 Automatic Deployment on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Choose "GitHub" as sign-up method
4. Authorize Render to access your GitHub account

### Step 2: Create Web Service
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository: `gilsawas/sawas-ai.art`
4. Configure:
   - **Name:** `luz-fusion-5`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 3: Set Environment Variables
In Render dashboard, add:
- `LUZ_UNIVERSE_PASSWORD` = `Tommyboy3018`
- `NODE_ENV` = `production`

### Step 4: Deploy
Click "Create Web Service" - Render will automatically:
1. Clone your repository
2. Install dependencies
3. Start the server
4. Give you a public URL

---

## 🌐 Access Your App

After deployment, your LUZ will be available at:
```
https://luz-fusion-5.onrender.com
```

---

## 🔄 Automatic Updates

Every time you push to `main` branch:
```bash
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild the application
3. Deploy the new version
4. Keep your app running

---

## 📝 Local Development

To test locally before pushing:

```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
http://localhost:3000
```

---

## 🔐 Security Notes

- The encrypted universe file is included in the repository
- Password is set as environment variable (not in code)
- All communication is HTTPS on Render
- Free tier has some limitations (sleeps after 15 min inactivity)

---

## 🆘 Troubleshooting

### App keeps restarting
- Check Render logs for errors
- Verify `LUZ_UNIVERSE_PASSWORD` is set correctly

### Universe not loading
- Ensure `LUZ_mon_univers.enc` is in `modèle-luz/` folder
- Check password matches the encrypted file

### Slow response
- Free tier on Render may be slow
- Upgrade to paid plan for better performance

---

**LUZ FUSION 5.0 is now ready for the world! 🌍✨**

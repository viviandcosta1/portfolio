# 🚀 DEPLOYMENT GUIDE

Ready to deploy your portfolio to the world? Here's how!

## Quick Start Options

### ⭐ Option 1: Vercel (Recommended - Easiest)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

3. **Deploy on Vercel**
   - Click "New Project"
   - Import your GitHub repo
   - Set environment variables (.env values)
   - Click Deploy

4. **Domain Setup**
   - Vercel gives you a free .vercel.app domain
   - Or add your custom domain

### 🏃 Option 2: Heroku (Traditional)

1. **Create Heroku Account**
   - Go to [heroku.com](https://heroku.com)
   - Sign up

2. **Install Heroku CLI**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create App**
   ```bash
   heroku create your-portfolio-app
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set ADMIN_API_KEY=your-secret-key
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### 🚄 Option 3: Railway (Simple & Modern)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repo

3. **Add Environment Variables**
   - Go to Variables tab
   - Add EMAIL_USER, EMAIL_PASSWORD, ADMIN_API_KEY

4. **Deploy**
   - Railway auto-deploys on push

## Detailed Setup for Each Platform

### Vercel Detailed Steps

**1. Create Vercel Account & Connect Git**
```bash
# Initialize git (if not already)
git init
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

**2. Add to Vercel**
- Visit [vercel.com/new](https://vercel.com/new)
- Select "Import Git Repository"
- Paste your GitHub repo URL
- Click Import

**3. Configure Project**
- Framework: Other (since we're using Node.js)
- Root Directory: ./
- Build Command: (leave empty - no build needed)

**4. Add Environment Variables**
In Vercel dashboard:
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = your-app-password
ADMIN_API_KEY = your-secret-admin-key
```

**5. Deploy**
- Click Deploy
- Wait for deployment to complete
- Your site will be live at: `https://your-app.vercel.app`

### Heroku Detailed Steps

**1. Create Heroku App**
```bash
heroku create your-unique-app-name
```

**2. Add Buildpack**
```bash
heroku buildpacks:add heroku/nodejs
```

**3. Create Procfile**
```bash
echo "web: node server.js" > Procfile
git add Procfile
git commit -m "Add Procfile"
```

**4. Push to Heroku**
```bash
git push heroku main
```

**5. View Logs**
```bash
heroku logs --tail
```

**6. Your app is at**
```
https://your-unique-app-name.herokuapp.com
```

### Railway Detailed Steps

**1. Create Railway Account & Project**
- Go to railway.app
- Click "New Project"
- Select "Deploy from GitHub Repo"

**2. Connect GitHub**
- Authorize Railway
- Select your repository
- Select your portfolio folder (if mono-repo)

**3. Add Variables**
In Railway project settings → Variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_API_KEY=your-secret-key
```

**4. Add Custom Domain (Optional)**
- Go to Settings → Custom Domain
- Add your domain
- Update DNS settings

## Frontend-Only Deployment (No Backend)

If you want to deploy just the frontend without backend:

**1. Deploy to Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**2. Update script.js**
Comment out contact form:
```javascript
// const response = await fetch('http://localhost:3001/api/contact', {
```

## Database Considerations

### SQLite (Current Setup)
- ✓ Simple, works locally
- ✗ Not ideal for production with multiple dynos
- Solution: Migrate to PostgreSQL

### Migrate to PostgreSQL

1. **Install PostgreSQL Driver**
```bash
npm install pg
```

2. **Update server.js** (replace SQLite with pg)
- See separate PostgreSQL setup guide

3. **Services with PostgreSQL**
- Heroku: PostgreSQL add-on (automatic)
- Railway: Add PostgreSQL service
- Vercel: Use Vercel Postgres (paid)

## SSL/HTTPS

Most platforms provide free SSL:
- ✓ Vercel: Automatic
- ✓ Heroku: Automatic
- ✓ Railway: Automatic

For custom domains, SSL is automatic on all platforms.

## Email Configuration for Production

### Gmail Setup (Works but not ideal for large volume)
Already configured - see .env file

### SendGrid (Better for Production)

1. **Get SendGrid API Key**
   - Sign up at sendgrid.com
   - Create API key

2. **Update server.js**
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

3. **Add to .env**
```
SENDGRID_API_KEY=your-key-here
```

## Performance Optimization

### Frontend
- ✓ Already optimized with CSS animations
- ✓ Images are lightweight (uses icons)
- ✓ JavaScript is minimal and efficient

### Backend
- ✓ Database queries are indexed
- ✓ Error handling is in place
- ✓ CORS is properly configured

### Further Optimization
```javascript
// Add caching headers in server.js
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

## Monitoring & Maintenance

### Check Deployment Status
```bash
# Vercel
vercel --prod

# Heroku
heroku apps:info

# Railway
railway status
```

### View Logs
```bash
# Vercel (via dashboard)

# Heroku
heroku logs --tail

# Railway
railway logs
```

### Update Deployment
```bash
# Make changes locally
git add .
git commit -m "Update portfolio"
git push origin main

# Auto-deploys on all platforms!
```

## Troubleshooting Deployment

### Issue: "Application crashed"
```bash
# Check logs
heroku logs --tail

# Or check platform-specific logs in dashboard
```

### Issue: "Build failed"
- ✓ Ensure package.json is in root
- ✓ Check all dependencies are listed
- ✓ Verify Node.js version matches

### Issue: "Email not sending"
- ✓ Verify EMAIL_USER and EMAIL_PASSWORD in dashboard
- ✓ Check Gmail is allowing app password
- ✓ See email logs in server

### Issue: "CORS errors in production"
Update CORS origin in server.js:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
```

## Custom Domain Setup

### Using Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS settings (Vercel shows instructions)
4. SSL auto-enabled

### Using Heroku
1. Go to Settings → Domains
2. Add domain
3. Update DNS to Heroku DNS

### Using Railway
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS settings

## Security Checklist

- [ ] Change ADMIN_API_KEY to something unique
- [ ] Use App Password for Gmail (not regular password)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS/SSL
- [ ] Hide .env from Git (add to .gitignore)
- [ ] Set secure API keys in platform dashboard
- [ ] Update package.json regularly
- [ ] Monitor logs for errors

## Final Checklist

- [ ] Repository on GitHub
- [ ] All environment variables set
- [ ] Backend server tested locally
- [ ] Contact form working
- [ ] Database properly configured
- [ ] Admin dashboard accessible
- [ ] Custom domain configured
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Backups configured

## Deployed! 🎉

Your portfolio is now live and accessible to the world!

### Next Steps
1. Share your portfolio link
2. Monitor for contacts
3. Respond to inquiries
4. Update projects regularly
5. Keep backend running smoothly

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Heroku Docs**: https://devcenter.heroku.com
- **Railway Docs**: https://docs.railway.app
- **Node.js Docs**: https://nodejs.org/docs
- **Express Docs**: https://expressjs.com

Good luck with your deployment! 🚀

# 🚀 GETTING STARTED GUIDE

Welcome to your beautiful new portfolio! Follow these steps to get everything running.

## Step 1: Install Dependencies

```bash
cd /Users/vvndcosta/Desktop/portfolio
npm install
```

This will install all required packages:
- express (web server)
- cors (cross-origin requests)
- nodemailer (email sending)
- sqlite3 (database)
- dotenv (environment variables)

## Step 2: Configure Gmail (For Email Notifications)

### Option A: Use Gmail with App Password (Recommended)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Go back to Security → "App passwords"
5. Select "Mail" and "Windows Computer" (or your device)
6. Copy the 16-character password
7. Open `.env` file in your project
8. Replace `EMAIL_PASSWORD` with this password:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Option B: Use Regular Gmail Password (Less Secure)

1. Open `.env` file
2. Set:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-regular-gmail-password
   ```

## Step 3: Set Admin API Key

The admin API key protects admin endpoints. Choose a strong key:

```env
ADMIN_API_KEY=my-super-secret-admin-key-2024
```

Keep this private and secure!

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Portfolio Backend Server             ║
║   Server running on port 3001          ║
║   Environment: development             ║
╚════════════════════════════════════════╝
```

## Step 5: Open the Portfolio

Option A: Using Python's built-in server
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

Option B: Using Node.js (install http-server)
```bash
npx http-server -p 8000
```
Then visit: `http://localhost:8000`

Option C: Just open index.html directly in your browser

## Step 6: Test the Features

### Test Contact Form
1. Fill out the contact form
2. Click "Send Message"
3. You should receive an email at your EMAIL_USER address
4. Contact should also be saved in the database

### Test Newsletter
1. Scroll to footer
2. Enter an email in "Newsletter" section
3. Click "Subscribe"
4. Check your email for confirmation

### Access Admin Dashboard
1. Open `admin-dashboard.html` in your browser
2. Enter your ADMIN_API_KEY
3. Click "Verify"
4. View all contacts, subscribers, and analytics

## File Structure Explained

```
portfolio/
├── index.html              # Main portfolio website
├── admin-dashboard.html    # Admin panel to manage contacts
├── style.css               # All styling and animations
├── script.js               # Frontend JavaScript
├── server.js               # Backend server (Node.js)
├── package.json            # Dependencies list
├── .env                    # Your configuration (KEEP SECRET!)
├── .env.example            # Template for .env
├── portfolio.db            # SQLite database (auto-created)
├── README.md               # Full documentation
├── GETTING-STARTED.md      # This file
└── SETUP.sh                # Automated setup script
```

## Common Tasks

### Customize Portfolio Content

**Edit Hero Section (index.html):**
```html
<h1 class="hero-title">Hi, I'm <span class="gradient-text">Your Name</span></h1>
<p class="hero-subtitle">Your Title | Your Skills</p>
```

**Edit Projects (index.html):**
Add new project cards in the projects section with appropriate icons and details.

**Edit Skills (index.html):**
Modify skill cards to match your actual skills and proficiency levels.

### Change Colors

Edit `:root` variables in `style.css`:
```css
:root {
  --primary-color: #667eea;      /* Main color */
  --secondary-color: #764ba2;    /* Secondary color */
  --accent-color: #f093fb;       /* Accent color */
  /* ... */
}
```

### Add More Skills

In `index.html`, duplicate a skill-card div:
```html
<div class="skill-card">
  <i class="fas fa-brain"></i>
  <h3>Your Skill</h3>
  <p>Description</p>
  <div class="skill-bar">
    <div class="skill-progress" style="width: 85%"></div>
  </div>
</div>
```

### Add More Projects

In `index.html`, duplicate a project-card and modify:
```html
<div class="project-card" data-category="web">
  <div class="project-image" style="background: linear-gradient(...)">
    <i class="fas fa-icon"></i>
  </div>
  <div class="project-content">
    <h3>Project Name</h3>
    <p>Description</p>
    <!-- ... -->
  </div>
</div>
```

## API Quick Reference

### Send Contact (from frontend - automatic)
The contact form automatically sends to:
```
POST /api/contact
```

### Get Contacts (admin only)
```bash
curl -H "X-API-Key: your-key" http://localhost:3001/api/admin/contacts
```

### Get Statistics (admin only)
```bash
curl -H "X-API-Key: your-key" http://localhost:3001/api/admin/stats
```

### Check Server Health
```bash
curl http://localhost:3001/api/health
```

## Troubleshooting

### Issue: "Email failed to send"
- ✓ Check EMAIL_USER is correct
- ✓ Verify EMAIL_PASSWORD (use App Password)
- ✓ Ensure Gmail account has 2FA enabled
- ✓ Check .env file is properly configured

### Issue: "Port 3001 already in use"
```bash
# Find what's using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Then start again
npm start
```

### Issue: "Cannot POST /api/contact"
- ✓ Make sure server is running (`npm start`)
- ✓ Check server URL in script.js is correct
- ✓ Verify CORS is enabled in server.js

### Issue: "Database error"
- ✓ Delete `portfolio.db` file
- ✓ Restart server (it will recreate database)
- ✓ Check folder permissions (should be readable/writable)

### Issue: "Cannot find module 'express'"
```bash
# Reinstall dependencies
npm install
```

## Advanced Configuration

### Change Server Port

In `.env`:
```env
PORT=3002
```

Then update script.js:
```javascript
const response = await fetch('http://localhost:3002/api/contact', {
```

### Add Database Backup

Create a backup script to preserve your data:
```bash
# Create backups folder
mkdir backups

# Copy database
cp portfolio.db backups/portfolio-$(date +%Y%m%d-%H%M%S).db
```

### Enable HTTPS (for production)

Use a reverse proxy like nginx or deploy to services like Vercel, Heroku, or Railway.

## Next Steps

1. ✅ **Personalize** - Update all personal information
2. ✅ **Deploy** - Use Vercel, Heroku, or Railway
3. ✅ **Share** - Send portfolio link to employers/clients
4. ✅ **Monitor** - Check admin dashboard for contacts
5. ✅ **Engage** - Respond to inquiries promptly

## Need More Help?

- 📖 See README.md for full documentation
- 🔍 Check browser console for error messages
- 💻 Use admin-dashboard.html to verify data is saving
- 🌐 Test API endpoints with Postman or curl

## Security Tips

⚠️ **IMPORTANT:**
- Never share your `.env` file
- Never commit `.env` to GitHub
- Keep `ADMIN_API_KEY` secure
- Use strong, unique passwords
- For production, use environment variables from hosting provider

## Ready to Deploy?

When ready to deploy to production:

1. Update .env with production credentials
2. Set `NODE_ENV=production`
3. Deploy to hosting (Vercel, Heroku, etc.)
4. Update frontend API URL to production server
5. Set up SSL/HTTPS certificate

## Celebrate! 🎉

Your modern portfolio is now live with:
- ✨ Beautiful animations
- 🎨 Modern design
- 📧 Email notifications
- 📊 Analytics dashboard
- 💾 Database storage
- 🔐 Admin controls

Good luck! You've got this! 💪

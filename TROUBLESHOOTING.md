╔════════════════════════════════════════════════════════════════════════════╗
║                   TROUBLESHOOTING GUIDE & FAQ                               ║
║                    Portfolio Website v1.0                                   ║
╚════════════════════════════════════════════════════════════════════════════╝

🔍 COMMON ISSUES & SOLUTIONS
══════════════════════════════════════════════════════════════════════════════

INSTALLATION & SETUP ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "command not found: npm"
   Problem: Node.js is not installed
   Solution:
     • Install Node.js from https://nodejs.org
     • Verify: node --version && npm --version
     • Restart terminal

❌ "EACCES: permission denied"
   Problem: Permission issues with npm install
   Solution:
     • Try: sudo npm install
     • Or fix permissions: npm config set prefix '~/.npm-global'
     • Then add to PATH: export PATH=~/.npm-global/bin:$PATH

❌ ".env file not found"
   Problem: Missing configuration file
   Solution:
     • Copy .env.example to .env: cp .env.example .env
     • Fill in your configuration details
     • Make sure .env is in portfolio root directory

❌ "Cannot find module 'express'"
   Problem: Dependencies not installed
   Solution:
     • Run: npm install
     • Check package.json exists in root
     • Delete node_modules and try again: rm -rf node_modules && npm install

❌ "syntax error in .env file"
   Problem: Invalid configuration format
   Solution:
     • Use format: KEY=value (no quotes needed)
     • Don't use spaces around =
     • Example: EMAIL_USER=your-email@gmail.com
     • Check for special characters


BACKEND SERVER ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Port 3001 already in use"
   Problem: Another process is using port 3001
   Solution:
     # Find what's using the port:
     lsof -i :3001
     
     # Kill the process (replace PID with actual number):
     kill -9 <PID>
     
     # Or change port in .env:
     PORT=3002
     
     # Then update script.js to use new port

❌ "Server won't start"
   Problem: Various startup issues
   Solution:
     • Check console for error messages
     • Verify all files exist in portfolio directory
     • Check .env syntax
     • Make sure Node.js is installed
     • Try: node server.js (to see detailed error)

❌ "Cannot POST /api/contact"
   Problem: Server is not running
   Solution:
     • Make sure server is running: npm start
     • Check console output - should show "Server running on port 3001"
     • Verify API URL in script.js matches your server
     • Check CORS is not blocking requests

❌ "Server crashes after startup"
   Problem: Database or configuration error
   Solution:
     • Check .env file is properly formatted
     • Delete portfolio.db to reset database
     • Restart server: npm start
     • Check error message in console
     • See logs for specific error


EMAIL & NOTIFICATION ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Email not sending - EAUTH"
   Problem: Email authentication failed
   Solution:
     • Verify EMAIL_USER is correct Gmail address
     • Verify EMAIL_PASSWORD (must be App Password, not regular password)
     • Check Gmail has 2-Factor Authentication enabled
     • Generate new App Password at: https://myaccount.google.com/apppasswords
     • Update .env with new password

❌ "Email service error: connection timeout"
   Problem: Network or firewall issue
   Solution:
     • Check internet connection
     • Disable VPN if using one
     • Check Gmail SMTP settings
     • Try with a different email provider (SendGrid, Mailgun)
     • Check firewall/antivirus isn't blocking SMTP

❌ "Invalid app password"
   Problem: App password is wrong or expired
   Solution:
     • Go to Google Account Settings: https://myaccount.google.com
     • Click Security in left menu
     • If 2FA not enabled, enable it first
     • Go to "App passwords"
     • Select Mail + Windows Computer
     • Generate new password
     • Copy 16-character password (ignore spaces)
     • Update EMAIL_PASSWORD in .env

❌ "Failed to send email but message was saved"
   Problem: Contact was saved but email notification failed
   Solution:
     • Check email configuration
     • Verify sender email is correct
     • Check recipient email is valid
     • Try test email again
     • Check error in server console
     • Consider using SendGrid for production


DATABASE ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Database is locked"
   Problem: Database file is being accessed elsewhere
   Solution:
     • Close any other processes using portfolio.db
     • Stop server: Ctrl+C
     • Delete portfolio.db: rm portfolio.db
     • Restart server: npm start

❌ "Table already exists error"
   Problem: Database already initialized
   Solution:
     • This is usually just a warning, not an error
     • Check if data is still there
     • If corrupted, delete portfolio.db and restart

❌ "No data showing in admin dashboard"
   Problem: Database not storing data
   Solution:
     • Check server console for database errors
     • Verify database file exists: portfolio.db
     • Try clearing database: rm portfolio.db
     • Restart server: npm start
     • Test contact form again

❌ "Database queries too slow"
   Problem: Performance issue with SQLite
   Solution:
     • For production, consider PostgreSQL
     • Check database size: ls -lh portfolio.db
     • For large datasets, migrate to PostgreSQL
     • See DEPLOYMENT.md for PostgreSQL setup


FRONTEND ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Styles not loading (white page)"
   Problem: CSS file not found or not linked
   Solution:
     • Check style.css exists in portfolio directory
     • Verify index.html has: <link rel="stylesheet" href="style.css">
     • Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)
     • Check browser console for errors (F12)
     • Check file permissions

❌ "JavaScript not working"
   Problem: JavaScript file not loaded
   Solution:
     • Check script.js exists in portfolio directory
     • Verify index.html has: <script src="script.js"></script>
     • Hard refresh browser
     • Open console (F12) and check for errors
     • Check file permissions

❌ "Contact form not submitting"
   Problem: Frontend to backend connection issue
   Solution:
     • Check server is running (npm start)
     • Check API URL in script.js matches server
     • Open browser console (F12) for error messages
     • Verify CORS is enabled in server.js
     • Check firewall/antivirus not blocking requests

❌ "Animations not smooth"
   Problem: Performance issue
   Solution:
     • Check GPU acceleration enabled
     • Disable browser extensions
     • Clear browser cache: Cmd+Shift+Delete
     • Try different browser
     • Check system resources (Activity Monitor on Mac)

❌ "Mobile view broken"
   Problem: Responsive design issue
   Solution:
     • Hard refresh browser (Cmd+Shift+R)
     • Check viewport meta tag in HTML
     • Try different device/screen size
     • Check media queries in CSS
     • Test in Chrome DevTools device mode

❌ "Icons not showing"
   Problem: Font Awesome CDN issue
   Solution:
     • Check internet connection
     • Verify CDN link in HTML: font-awesome CDN
     • Check browser console for failed resource load
     • Try clearing browser cache
     • Update CDN link to latest version


ADMIN DASHBOARD ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Admin dashboard shows 'Unauthorized'"
   Problem: Incorrect API key
   Solution:
     • Verify ADMIN_API_KEY in .env file
     • Copy exact key from .env (no extra spaces)
     • Make sure API key is consistent (don't change it)
     • Check .env file format: ADMIN_API_KEY=your-key

❌ "Dashboard loads but no data shows"
   Problem: API request failed
   Solution:
     • Check server is running
     • Verify API key is correct
     • Check browser console for error messages (F12)
     • Verify contacts exist in database
     • Check network tab in DevTools (F12 → Network)

❌ "Export contacts button doesn't work"
   Problem: Export endpoint issue
   Solution:
     • Check API key is correct
     • Check server is running
     • Verify endpoint in browser (check network tab)
     • Try different browser
     • Check file download settings


DEPLOYMENT ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Deployment failed on Vercel"
   Problem: Build error during deployment
   Solution:
     • Check build log in Vercel dashboard
     • Ensure package.json is in root directory
     • Verify all dependencies are listed
     • Check Node.js version matches
     • Try local build: npm run build

❌ "Deployment failed on Heroku"
   Problem: Push or build failed
   Solution:
     • Check Heroku logs: heroku logs --tail
     • Ensure Procfile exists (web: node server.js)
     • Verify git is set up correctly
     • Check buildpack: heroku buildpacks
     • Try: git push heroku main --force

❌ "Environment variables not working"
   Problem: .env not being read in production
   Solution:
     • Set variables in platform dashboard
     • Don't push .env to repository
     • Verify variable names match code
     • Restart deployment after adding variables
     • Check platform-specific documentation

❌ "API endpoints return 404"
   Problem: Frontend URL pointing to wrong server
   Solution:
     • Update API URL in script.js
     • Use environment variable for API URL
     • Check frontend/backend are same origin or CORS enabled
     • Verify backend server is running
     • Check network requests in DevTools


NETWORK & CONNECTIVITY ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "CORS error in console"
   Problem: Cross-origin request blocked
   Solution:
     • CORS is already enabled in server.js
     • Check origin URL matches
     • Clear browser cache
     • Try from same origin for testing
     • Verify API URL is correct

❌ "Connection refused to localhost:3001"
   Problem: Server not running or wrong port
   Solution:
     • Start server: npm start
     • Check port: echo $PORT
     • Verify .env has PORT=3001
     • Check firewall allows port 3001
     • Try from different terminal

❌ "Mixed content error (HTTPS/HTTP)"
   Problem: Loading HTTP content on HTTPS
   Solution:
     • Update all URLs to use same protocol (HTTPS)
     • Use protocol-relative URLs: //domain.com
     • Update .env with HTTPS URLs
     • Deploy to HTTPS-enabled server


PERFORMANCE ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Website is slow"
   Problem: Performance issue
   Solution:
     • Check Network tab (F12) for slow requests
     • Verify email sending isn't blocking UI
     • Consider caching strategies
     • Check database query performance
     • Optimize images/assets

❌ "High memory usage"
   Problem: Memory leak
   Solution:
     • Check for infinite loops in code
     • Verify event listeners are cleaned up
     • Check database connections
     • Monitor with: top (Mac/Linux)
     • Consider code optimization


SECURITY ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ ".env file was accidentally shared"
   Problem: Sensitive data exposed
   Solution:
     • Change ADMIN_API_KEY immediately
     • Change EMAIL_PASSWORD
     • Generate new Gmail App Password
     • Update .env with new credentials
     • Add .env to .gitignore: echo ".env" >> .gitignore

❌ "Getting spam contacts"
   Problem: No validation/protection
   Solution:
     • Add rate limiting to API
     • Implement CAPTCHA
     • Add email verification
     • Filter spam keywords
     • Review contacts before responding

❌ "Unauthorized access to admin endpoints"
   Problem: API key security issue
   Solution:
     • Use strong API key (32+ characters)
     • Change API key regularly
     • Never commit API key to git
     • Use environment variables only
     • Implement rate limiting


BROWSER-SPECIFIC ISSUES
──────────────────────────────────────────────────────────────────────────────

❌ "Works in Chrome but not Safari"
   Problem: Browser compatibility
   Solution:
     • Check CSS support in Safari
     • Use vendor prefixes: -webkit-, -moz-, -ms-
     • Test animation support
     • Check ES6 JavaScript compatibility
     • Use transpiler if needed

❌ "Mobile safari won't scroll smoothly"
   Problem: Mobile performance
   Solution:
     • Reduce animation complexity
     • Optimize images for mobile
     • Check network speed
     • Test on actual device
     • Consider progressive enhancement


GETTING HELP
══════════════════════════════════════════════════════════════════════════════

If Issue Not Listed Here:

1. Check Error Message
   • Read exact error in console (F12)
   • Note any codes or line numbers

2. Search Documentation
   • README.md - Comprehensive guide
   • GETTING-STARTED.md - Setup help
   • DEPLOYMENT.md - Deployment issues
   • FEATURES.md - What's available

3. Check Console
   • Browser: Press F12, go to Console tab
   • Terminal: Read server output
   • Look for specific error messages

4. Debug Step by Step
   • Test backend separately (curl requests)
   • Test frontend without backend
   • Check each component individually
   • Use DevTools Network tab

5. Common Commands for Debugging
   
   # Test backend health:
   curl http://localhost:3001/api/health
   
   # Check if port is in use:
   lsof -i :3001
   
   # Kill process on port:
   kill -9 <PID>
   
   # Reinstall dependencies:
   rm -rf node_modules && npm install
   
   # Reset database:
   rm portfolio.db
   
   # Check .env syntax:
   cat .env


FREQUENTLY ASKED QUESTIONS
══════════════════════════════════════════════════════════════════════════════

Q: How do I change the colors?
A: Edit :root variables in style.css
   --primary-color, --secondary-color, --accent-color, etc.

Q: How do I add more projects?
A: Duplicate project-card div in index.html and modify content

Q: How do I change the name?
A: Edit hero-title in index.html

Q: How do I deploy?
A: See DEPLOYMENT.md for Vercel, Heroku, Railway instructions

Q: Will email work without Gmail?
A: Yes, use SendGrid, Mailgun, or other SMTP providers

Q: Can I use PostgreSQL instead of SQLite?
A: Yes, see DEPLOYMENT.md for PostgreSQL setup

Q: How do I backup my data?
A: Copy portfolio.db to safe location or export via API

Q: How do I update the portfolio?
A: Edit files, test locally, then push to deployed version

Q: Is it secure?
A: Yes, with API key authentication and input validation

Q: Can I use this for production?
A: Yes, follow deployment guide and security checklist


═══════════════════════════════════════════════════════════════════════════════

Need More Help?
• Open browser console (F12) and check for errors
• Read documentation files completely
• Check if issue is in this troubleshooting guide
• Try simplest solution first
• Restart server and clear cache
• Try different browser

You've got this! 💪

═══════════════════════════════════════════════════════════════════════════════

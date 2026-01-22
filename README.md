# 🚀 Modern Portfolio Website

A stunning, fully-functional portfolio website with AI/ML focus, beautiful animations, and a powerful backend system.

## ✨ Features

### Frontend
- **Modern UI/UX** - Sleek gradient design with smooth animations
- **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)
- **Interactive Sections**
  - Hero section with floating cards
  - About section with stats
  - Skills showcase with progress bars
  - 6 Featured projects with filtering
  - Contact form with validation
  - Newsletter subscription
  - Dynamic footer with social links

### Backend (Node.js + Express)
- **Contact Form Management** - Save and receive email notifications
- **Newsletter System** - Subscribe with email confirmation
- **Admin Dashboard Data** - View all contacts and statistics
- **Visitor Tracking** - Track page visits and unique visitors
- **Database** - SQLite for data persistence
- **Email Notifications** - Automated email responses
- **Data Export** - Export contacts as JSON
- **Security** - API key authentication for admin endpoints

## 📋 Project Structure

```
portfolio/
├── index.html           # Main HTML file
├── style.css            # Styling with animations
├── script.js            # Frontend JavaScript
├── server.js            # Backend server
├── package.json         # Dependencies
├── .env                 # Environment variables
├── .env.example         # Example env file
├── portfolio.db         # SQLite database (auto-created)
└── README.md            # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for email functionality)

### Installation

1. **Navigate to project directory**
   ```bash
   cd /Users/vvndcosta/Desktop/portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Open `.env` file
   - Update email credentials:
     ```env
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password
     ADMIN_API_KEY=your-secret-key
     ```

   **For Gmail:**
   - Enable 2-Factor Authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Use the app password in EMAIL_PASSWORD

4. **Start the backend server**
   ```bash
   npm start
   ```
   Or with auto-reload (development):
   ```bash
   npm run dev
   ```

5. **Open the website**
   - Open `index.html` in your browser (or use a local server)
   - Or run a simple HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
   - Then visit: `http://localhost:8000`

## 🎨 Customization

### Update Personal Information
Edit `index.html`:
- Change name and title in hero section
- Update email and phone in contact section
- Modify projects in the projects grid
- Change social media links

### Modify Colors
Edit `:root` variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
  /* ... more variables */
}
```

## 📡 API Endpoints

### Public Endpoints

#### 1. Submit Contact Form
```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in working with you..."
}
```

#### 2. Subscribe to Newsletter
```bash
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

#### 3. Get All Projects
```bash
GET /api/projects
```

#### 4. Get Recent Contacts
```bash
GET /api/recent-contacts
```

#### 5. Health Check
```bash
GET /api/health
```

### Admin Endpoints (Require API Key)

Add header: `X-API-Key: your-secret-admin-key-12345`

#### 1. Get All Contacts
```bash
GET /api/admin/contacts
Headers: X-API-Key: your-secret-admin-key-12345
```

#### 2. Get Dashboard Statistics
```bash
GET /api/admin/stats
Headers: X-API-Key: your-secret-admin-key-12345
```

#### 3. Mark Contact as Read
```bash
PATCH /api/admin/contacts/:id
Headers: X-API-Key: your-secret-admin-key-12345

{
  "status": "read"
}
```

#### 4. Delete Contact
```bash
DELETE /api/admin/contacts/:id
Headers: X-API-Key: your-secret-admin-key-12345
```

#### 5. Add New Project
```bash
POST /api/projects
Headers: X-API-Key: your-secret-admin-key-12345

{
  "name": "Project Name",
  "description": "Project description",
  "technologies": "React, Node.js, MongoDB",
  "link": "https://project-url.com",
  "github": "https://github.com/username/project"
}
```

#### 6. Get Visitor Statistics
```bash
GET /api/admin/visitor-stats
Headers: X-API-Key: your-secret-admin-key-12345
```

#### 7. Export Contacts
```bash
GET /api/admin/export-contacts
Headers: X-API-Key: your-secret-admin-key-12345
```

#### 8. Send Bulk Newsletter
```bash
POST /api/admin/send-newsletter
Headers: X-API-Key: your-secret-admin-key-12345

{
  "subject": "Newsletter Subject",
  "message": "<h2>HTML Email Content</h2>"
}
```

## 🎯 Key Features Explained

### 1. **Contact Form with Validation**
- Real-time validation
- Email notification to admin
- Confirmation email to user
- Data saved to database

### 2. **Newsletter System**
- Prevent duplicate subscriptions
- Welcome email on signup
- Bulk email capability
- Subscriber management

### 3. **Visitor Analytics**
- Track page views
- Count unique visitors
- Analyze traffic patterns
- Weekly statistics

### 4. **Admin Dashboard Data**
- View all contacts
- Statistics overview
- Export data as JSON
- Manage contacts (mark as read/delete)

### 5. **Beautiful Animations**
- Smooth scroll navigation
- Floating cards in hero
- Skill progress bars
- Project card hover effects
- Modal animations

## 🔐 Security Features

- API key authentication for admin endpoints
- Input validation and sanitization
- Email verification for contacts
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## 🚀 Deployment

### Using Vercel
1. Create a Vercel account
2. Connect your GitHub repository
3. Set environment variables in Vercel
4. Deploy

### Using Heroku
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name
git push heroku main
```

### Using Railway
1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy

## 📊 Database Schema

### contacts table
- id (PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- subject (TEXT)
- message (TEXT)
- created_at (DATETIME)
- status (TEXT) - 'new', 'read'

### subscribers table
- id (PRIMARY KEY)
- email (TEXT, UNIQUE)
- subscribed_at (DATETIME)
- status (TEXT) - 'active'

### projects table
- id (PRIMARY KEY)
- name (TEXT)
- description (TEXT)
- technologies (TEXT)
- link (TEXT)
- github (TEXT)
- created_at (DATETIME)

### visitors table
- id (PRIMARY KEY)
- ip_address (TEXT)
- visit_date (DATETIME)
- page (TEXT)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Email Not Sending
- Verify Gmail App Password is correct
- Check if "Less secure app access" is enabled (not needed with App Password)
- Verify EMAIL_USER in .env matches Gmail account

### Database Errors
- Delete `portfolio.db` to reset database
- Ensure write permissions in directory

### CORS Errors
- Check that frontend and backend ports are different
- Verify CORS is enabled in server.js

## 📝 Customization Tips

1. **Change theme colors** - Modify CSS variables
2. **Add more projects** - Use admin API endpoint
3. **Update skills** - Edit HTML skill cards
4. **Modify animations** - Edit @keyframes in CSS
5. **Add more sections** - Create new HTML sections and CSS

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Nodemailer Guide](https://nodemailer.com/about/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)

## 💡 Future Enhancements

- [ ] Admin dashboard UI
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Blog section
- [ ] Project comments/reviews
- [ ] Social media integration
- [ ] Google Analytics
- [ ] Performance optimization

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💼 About

Created by Vivian Dcosta - AI/ML Enthusiast & Web Developer

---

**Need help?** Open an issue or contact me through the portfolio!

Happy coding! 🎉

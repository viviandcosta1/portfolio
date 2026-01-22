const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'X-API-Key']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== DATABASE SETUP ====================
let db;

function connectDatabase() {
  db = new sqlite3.Database('./portfolio.db', (err) => {
    if (err) {
      console.error('❌ Database connection failed:', err.message);
      // Retry after 2 seconds
      setTimeout(connectDatabase, 2000);
    } else {
      console.log('✅ Connected to SQLite database');
      initializeDatabase();
    }
  });
}

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Create contacts table
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'new'
      )
    `, (err) => {
      if (!err) console.log('✅ Contacts table ready');
    });

    // Create newsletter subscribers table
    db.run(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'active'
      )
    `, (err) => {
      if (!err) console.log('✅ Subscribers table ready');
    });

    // Create projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        technologies TEXT,
        link TEXT,
        github TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (!err) console.log('✅ Projects table ready');
    });

    // Create visitors table
    db.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT,
        visit_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        page TEXT
      )
    `, (err) => {
      if (!err) console.log('✅ Visitors table ready');
    });

    // Create testimonials table
    db.run(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        message TEXT NOT NULL,
        rating INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (!err) console.log('✅ Testimonials table ready');
    });

    console.log('✅ Database tables initialized');
  });
}

// ==================== EMAIL SETUP ====================
// Simple email transporter (no Gmail required for testing)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'test@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'test-password'
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.log('⚠️  Email not configured (this is OK for testing)');
  } else if (success) {
    console.log('✅ Email service ready');
  }
});

// ==================== HELPER FUNCTIONS ====================
function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

// ==================== SIMPLE API ENDPOINTS ====================

// 1. HEALTH CHECK - Test if server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running!',
    timestamp: new Date(),
    uptime: Math.floor(process.uptime()),
    database: 'Connected'
  });
});

// 2. SUBMIT CONTACT FORM
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Save to database
    db.run(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message],
      (err) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to save contact' });
        }

        // Send email (optional - won't block if fails)
        const mailOptions = {
          from: process.env.EMAIL_USER || 'noreply@portfolio.com',
          to: process.env.EMAIL_USER || email,
          subject: `New Contact: ${subject}`,
          html: `<h2>New Contact</h2><p><b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Subject:</b> ${subject}</p><p><b>Message:</b></p><p>${message}</p>`
        };

        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            console.log('Email not sent (OK for testing):', err.message);
          } else {
            console.log('✅ Email sent successfully');
          }
        });

        res.status(201).json({ 
          success: true,
          message: 'Contact saved successfully!',
          data: { name, email, subject }
        });
      }
    );
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. GET ALL CONTACTS
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// 4. DELETE A CONTACT
app.delete('/api/contacts/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM contacts WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Delete failed' });
    }
    res.json({ success: true, message: 'Contact deleted' });
  });
});

// 5. NEWSLETTER SUBSCRIPTION
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    db.run(
      'INSERT INTO subscribers (email) VALUES (?)',
      [email],
      (err) => {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ error: 'Already subscribed' });
          }
          return res.status(500).json({ error: 'Subscription failed' });
        }

        res.status(201).json({ 
          success: true,
          message: 'Subscribed successfully!'
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 6. GET ALL SUBSCRIBERS
app.get('/api/subscribers', (req, res) => {
  db.all('SELECT email, subscribed_at FROM subscribers ORDER BY subscribed_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// 7. ADD NEW PROJECT
app.post('/api/projects', (req, res) => {
  try {
    const { name, description, technologies, link, github } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Project name required' });
    }

    db.run(
      'INSERT INTO projects (name, description, technologies, link, github) VALUES (?, ?, ?, ?, ?)',
      [name, description, technologies, link, github],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to add project' });
        }
        res.status(201).json({ 
          success: true,
          message: 'Project added!',
          projectId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 8. GET ALL PROJECTS
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// 9. TRACK VISITOR
app.post('/api/track-visitor', (req, res) => {
  try {
    const { page } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    db.run(
      'INSERT INTO visitors (ip_address, page) VALUES (?, ?)',
      [ipAddress, page],
      (err) => {
        if (err) {
          console.error('Visitor tracking error:', err);
          return res.status(500).json({ error: 'Tracking failed' });
        }
        res.json({ success: true });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 10. GET VISITOR STATS
app.get('/api/stats', (req, res) => {
  db.all(`
    SELECT 
      (SELECT COUNT(*) FROM contacts) as total_contacts,
      (SELECT COUNT(*) FROM subscribers) as total_subscribers,
      (SELECT COUNT(*) FROM visitors) as total_visitors,
      (SELECT COUNT(DISTINCT ip_address) FROM visitors) as unique_visitors
  `, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows[0] || {});
  });
});

// 11. ADD TESTIMONIAL
app.post('/api/testimonials', (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message required' });
    }

    db.run(
      'INSERT INTO testimonials (name, message, rating) VALUES (?, ?, ?)',
      [name, message, rating || 5],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to add testimonial' });
        }
        res.status(201).json({ 
          success: true,
          message: 'Testimonial added!',
          testimonialId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 12. GET ALL TESTIMONIALS
app.get('/api/testimonials', (req, res) => {
  db.all('SELECT * FROM testimonials ORDER BY created_at DESC LIMIT 10', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows || []);
  });
});

// 13. EXPORT ALL DATA
app.get('/api/export', (req, res) => {
  try {
    db.all('SELECT * FROM contacts', (err, contacts) => {
      if (err) return res.status(500).json({ error: 'Export failed' });

      db.all('SELECT * FROM subscribers', (err, subscribers) => {
        if (err) return res.status(500).json({ error: 'Export failed' });

        const exportData = {
          exported_at: new Date(),
          contacts: contacts || [],
          subscribers: subscribers || []
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=portfolio-data.json');
        res.json(exportData);
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 14. GET RECENT CONTACTS
app.get('/api/recent-contacts', (req, res) => {
  db.all(
    'SELECT name, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5',
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows || []);
    }
  );
});

// 15. SEARCH CONTACTS
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Search query required' });
  }

  db.all(
    "SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR message LIKE ?",
    [`%${q}%`, `%${q}%`, `%${q}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Search failed' });
      }
      res.json(rows || []);
    }
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Portfolio Backend Server             ║
║   Server running on port ${PORT}        ║
║   Environment: ${process.env.NODE_ENV || 'development'}      ║
╚════════════════════════════════════════╝
  `);
  console.log('Available endpoints:');
  console.log('POST   /api/contact           - Submit contact form');
  console.log('POST   /api/newsletter        - Subscribe to newsletter');
  console.log('GET    /api/projects          - Get all projects');
  console.log('GET    /api/admin/contacts    - Get all contacts (admin)');
  console.log('GET    /api/admin/stats       - Get statistics (admin)');
  console.log('GET    /api/health            - Health check');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  if (db) {
    db.close();
  }
  process.exit(0);
});

// Smooth scroll to sections
function scrollTo(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.style.display = 'none';
  });
});

// Project filtering
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  const buttons = document.querySelectorAll('.filter-btn');

  // Update active button
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // Filter projects
  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'grid';
      setTimeout(() => {
        project.style.animation = 'slideUp 0.5s ease';
      }, 0);
    } else {
      project.style.display = 'none';
    }
  });
}

// Modal functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

function viewProject(projectName) {
  const projectDetails = {
    'Food Ordering': {
      description: 'A full-featured food ordering platform with real-time order tracking, payment integration, and restaurant management dashboard.',
      details: 'Technologies: React, Node.js, MongoDB, Stripe API, Socket.io'
    },
    'AI Chatbot': {
      description: 'Intelligent conversational AI using natural language processing and machine learning to understand and respond to user queries.',
      details: 'Technologies: Python, TensorFlow, NLTK, Flask, Seq2Seq Models'
    },
    'Portfolio': {
      description: 'Modern portfolio website with smooth animations, responsive design, and integrated backend for contact forms.',
      details: 'Technologies: HTML5, CSS3, JavaScript, Node.js, Express'
    },
    'Analytics': {
      description: 'Interactive dashboard for data visualization and analysis with ML-powered predictive analytics.',
      details: 'Technologies: Python, Pandas, Scikit-learn, Plotly, Django'
    },
    'Fitness App': {
      description: 'Cross-platform fitness tracking application with workout plans, progress monitoring, and social features.',
      details: 'Technologies: React Native, Firebase, Redux, Google Fit API'
    },
    'Streaming': {
      description: 'High-performance video streaming platform with adaptive bitrate streaming and personalized recommendations.',
      details: 'Technologies: Vue.js, WebRTC, FFmpeg, AWS S3, Machine Learning'
    }
  };

  const project = projectDetails[projectName];
  if (project) {
    document.getElementById('modalTitle').textContent = projectName;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalDetails').innerHTML = `<p><strong>${project.details}</strong></p>`;
    modal.style.display = 'block';
  }
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

function validateForm() {
  let isValid = true;

  // Name validation
  const name = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  if (name.value.trim().length < 2) {
    nameError.textContent = 'Name must be at least 2 characters';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  // Email validation
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.textContent = 'Please enter a valid email';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  // Subject validation
  const subject = document.getElementById('subject');
  const subjectError = document.getElementById('subjectError');
  if (subject.value.trim().length < 3) {
    subjectError.textContent = 'Subject must be at least 3 characters';
    isValid = false;
  } else {
    subjectError.textContent = '';
  }

  // Message validation
  const message = document.getElementById('message');
  const messageError = document.getElementById('messageError');
  if (message.value.trim().length < 10) {
    messageError.textContent = 'Message must be at least 10 characters';
    isValid = false;
  } else {
    messageError.textContent = '';
  }

  return isValid;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    formMessage.textContent = 'Please fix the errors above';
    formMessage.className = 'error';
    formMessage.style.display = 'block';
    return;
  }

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      formMessage.textContent = '✓ Message sent successfully!';
      formMessage.className = 'success';
      contactForm.reset();
    } else {
      formMessage.textContent = '✗ Failed to send message: ' + data.message;
      formMessage.className = 'error';
    }
  } catch (error) {
    formMessage.textContent = '✗ Error sending message. Please try again.';
    formMessage.className = 'error';
  }

  formMessage.style.display = 'block';
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
});

// Newsletter subscription
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = newsletterForm.querySelector('input[type="email"]').value;

  try {
    const response = await fetch('http://localhost:3001/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✓ Subscribed successfully!');
      newsletterForm.reset();
    } else {
      alert('✗ Subscription failed: ' + data.message);
    }
  } catch (error) {
    alert('✗ Error subscribing. Please try again.');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 15, 30, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.1)';
  } else {
    navbar.style.background = 'rgba(15, 15, 30, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Animation for elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.animation = 'none';
  observer.observe(el);
});

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Cursor effects (optional enhancement)
document.addEventListener('mousemove', (e) => {
  const cursorX = e.clientX;
  const cursorY = e.clientY;
  
  // You can add cursor effects here
});

// Initialize animations on page load
window.addEventListener('load', () => {
  console.log('Portfolio loaded successfully');
  // Trigger initial animations
  document.querySelectorAll('.section').forEach((section, index) => {
    section.style.animation = `slideUp 0.6s ease ${index * 0.1}s forwards`;
  });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn, .btn-link, .filter-btn');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Create ripple effect with CSS
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
  });
});

// Prevent right-click on portfolio (optional)
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault();
// });

// Update year in footer
const year = new Date().getFullYear();
document.querySelector('.footer-bottom p').textContent = `© ${year} Vivian Dcosta. All rights reserved.`;

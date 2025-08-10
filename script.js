// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.classList.toggle('dark', currentTheme === 'dark');

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const newTheme = html.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  
  // Add a visual feedback
  themeToggle.style.transform = 'scale(0.95)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1)';
  }, 150);
});

// System theme detection
if (currentTheme === 'system' || !localStorage.getItem('theme')) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.classList.toggle('dark', systemDark);
}

// Get modal element
const modal = document.getElementById('contactModal');
// Get open button
const contactBtn = document.getElementById('contactBtn');
// Get close button
const closeBtn = document.getElementsByClassName('close')[0];
// Get form inside modal
const form = modal.querySelector("form");

// Open modal
contactBtn.onclick = function(event) {
  event.preventDefault(); // Prevent default behavior
  modal.style.display = "block";
  // Add fade-in animation
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

// Close modal
closeBtn.onclick = function() {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

// Close modal if clicked outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
}

// Handle form submission with fetch
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form behavior

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.innerHTML = "<p style='color: #4af626; font-size: 1.2rem; text-align: center;'>Thank you! Your message has been sent successfully.</p>";
    } else {
      form.innerHTML = "<p style='color: #ff0000; text-align: center;'>Oops! Something went wrong. Please try again later.</p>";
    }
  }).catch(error => {
    form.innerHTML = "<p style='color: #ff0000; text-align: center;'>Oops! Something went wrong. Please try again later.</p>";
  });
});

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// Pipeline status simulation (for demo purposes)
function updatePipelineStatus() {
  const stages = ['source', 'build', 'test', 'deploy'];
  const statuses = ['complete', 'running', 'pending', 'waiting'];
  
  // This would normally connect to a real API
  // For now, we'll just add some visual feedback
  const pipelineStages = document.querySelectorAll('.pipeline-stage');
  pipelineStages.forEach((stage, index) => {
    if (index < 2) {
      stage.classList.add('animate-pipeline-pulse');
    }
  });
}

// Initialize pipeline status
setTimeout(updatePipelineStatus, 1000);

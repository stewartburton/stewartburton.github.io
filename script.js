// Get modal element
const modal = document.getElementById('contactModal');
// Get open button
const contactBtn = document.getElementById('contactBtn');
// Get close button
const closeBtn = document.getElementsByClassName('close')[0];
// Get form inside modal
const form = modal.querySelector("form");

// Open modal from hero button
if (contactBtn) {
  contactBtn.onclick = function(event) {
    event.preventDefault(); // Prevent default behavior
    modal.style.display = "block";
    // Clear pre-filled content for general contact
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';
  }
}

// Handle specialized contact buttons
document.addEventListener('DOMContentLoaded', function() {
  const contactButtons = document.querySelectorAll('.contact-btn');
  
  contactButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const subject = this.getAttribute('data-subject');
      const message = this.getAttribute('data-message');
      
      // Pre-fill the form
      document.getElementById('contactSubject').value = subject;
      document.getElementById('contactMessage').value = message;
      
      // Open modal
      modal.style.display = "block";
    });
  });
});

// Close modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close modal if clicked outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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
      form.innerHTML = "<p style='color: #4CAF50; font-size: 1.2rem;'>Thank you! Your message has been sent successfully.</p>";
    } else {
      form.innerHTML = "<p style='color: red;'>Oops! Something went wrong. Please try again later.</p>";
    }
  }).catch(error => {
    form.innerHTML = "<p style='color: red;'>Oops! Something went wrong. Please try again later.</p>";
  });
});

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const certificateModal = document.getElementById('certificateModal');
  const certificateFrame = document.getElementById('certificateFrame');
  const certificateClose = document.querySelector('.certificate-close');
  const clickableCerts = document.querySelectorAll('.cert-badge.clickable');

  // Open certificate modal
  clickableCerts.forEach(cert => {
    cert.addEventListener('click', function() {
      const certFile = this.getAttribute('data-cert');
      const certPath = `assets/certificates/${certFile}`;
      
      certificateFrame.src = certPath;
      certificateModal.style.display = 'block';
    });
  });

  // Close certificate modal
  certificateClose.addEventListener('click', function() {
    certificateModal.style.display = 'none';
    certificateFrame.src = ''; // Clear the iframe
  });

  // Close modal if clicked outside
  window.addEventListener('click', function(event) {
    if (event.target === certificateModal) {
      certificateModal.style.display = 'none';
      certificateFrame.src = ''; // Clear the iframe
    }
  });
});

// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const caseStudies = document.querySelectorAll('.case-study');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter case studies
      caseStudies.forEach(study => {
        const categories = study.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          study.style.display = 'block';
          study.style.animation = 'fadeIn 0.5s ease';
        } else {
          study.style.display = 'none';
        }
      });
    });
  });
});

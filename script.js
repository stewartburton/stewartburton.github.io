// Get modal element
const modal = document.getElementById('contactModal');
// Get open button
const contactBtn = document.getElementById('contactBtn');
// Get close button
const closeBtn = document.getElementsByClassName('close')[0];
// Get form inside modal
const form = modal.querySelector("form");

// Open modal
contactBtn.onclick = function() {
  modal.style.display = "block";
}

// Close modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close modal if clicked outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission with fetch and custom success/error message
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form behavior (no redirect)

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

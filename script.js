// Get modal element
var modal = document.getElementById("contactModal");
// Get open button
var btn = document.getElementById("contactBtn");
// Get close button
var span = document.getElementsByClassName("close")[0];
// Get form element
var form = modal.querySelector("form");
// Get modal content
var modalContent = modal.querySelector(".modal-content");

// Open modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Close modal
span.onclick = function() {
  modal.style.display = "none";
}

// Close if clicked outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission with success message
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Stop default submit

  // Actually submit the form using fetch
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

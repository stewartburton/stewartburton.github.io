// Get modal element
var modal = document.getElementById("contactModal");
// Get open button
var btn = document.getElementById("contactBtn");
// Get close button
var span = document.getElementsByClassName("close")[0];

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

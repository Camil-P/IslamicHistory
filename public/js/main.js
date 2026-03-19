document.getElementById("logout-btn").addEventListener("click", function(e) {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

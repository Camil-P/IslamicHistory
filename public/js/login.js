document.getElementById("login-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const response = await fetch("users.json");
  const users = await response.json();

  const match = users.find(u => u.email === email && u.password === password);

  if (match) {
    localStorage.setItem("loggedInUser", JSON.stringify({ email: match.email }));
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
});
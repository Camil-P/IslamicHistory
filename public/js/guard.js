function requireLogin() {
  const user = localStorage.getItem("loggedInUser");
  const onLoginPage = window.location.pathname.endsWith("login.html");

  if (!user && !onLoginPage) {
    window.location.href = "login.html";
  } else if (user && onLoginPage) {
    window.location.href = "index.html";
  }
}

requireLogin();

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showRegister = document.getElementById("show-register");
  const showLogin = document.getElementById("show-login");

  showRegister.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });

  showLogin.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "admin") {
      alert("Login Successful!");
    } else {
      alert("Incorrect Username or Password.");
    }
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newUsername = document.getElementById("new-username").value.trim();
    const email = document.getElementById("email").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    if (newUsername && email && newPassword) {
      alert("Account Created Successfully!");

      
      // Reset fields or store to backend if needed
      registerForm.reset();
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    } else {
      alert("Please fill all fields.");
    }
  });
});

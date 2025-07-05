// MAIN.JS - Typing Speed Master Pro Core Script

// 🟢 Handle Register Form
document.getElementById("register-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value;

  if (localStorage.getItem(username)) {
    alert("⚠️ User already exists!");
  } else {
    const userData = {
      password: password,
      stats: {
        bestWPM: 0,
        avgAccuracy: 0,
        totalTests: 0,
      },
    };
    localStorage.setItem(username, JSON.stringify(userData));
    alert("✅ Registered successfully!");
    document.getElementById("tab-login")?.click(); // Switch to login
  }
});

// 🟢 Handle Login Form
document.getElementById("login-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    localStorage.setItem("loggedInUser", username);
    alert("✅ Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("❌ Invalid username or password.");
  }
});

// 🟢 Dashboard Initialization
if (window.location.pathname.includes("dashboard.html")) {
  const username = localStorage.getItem("loggedInUser");

  if (!username || !localStorage.getItem(username)) {
    window.location.href = "login.html";
  }

  const userData = JSON.parse(localStorage.getItem(username));
  document.getElementById("username-display").textContent = `Welcome, ${username}!`;
  document.getElementById("avatar").textContent = username[0].toUpperCase();

  const stats = userData.stats || { bestWPM: 0, avgAccuracy: 0, totalTests: 0 };

  document.getElementById("best-wpm")?.textContent = stats.bestWPM;
  document.getElementById("avg-accuracy")?.textContent = stats.avgAccuracy + "%";
  document.getElementById("total-tests")?.textContent = stats.totalTests;

  // Progress bar animation
  const progressFill = document.querySelector(".progress-bar-fill");
  if (progressFill) {
    const percent = Math.min(stats.bestWPM, 100);
    progressFill.style.width = percent + "%";
  }
}

// 🟢 Logout Button
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// 🟢 Typing Mode Redirection
function startPractice(mode) {
  window.location.href = `practice.html?mode=${mode}`;
}

<?php
include "db.php";

if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Smart Study Planner | Dashboard</title>
  <link rel="stylesheet" href="css/style.css">
</head>

<body class="dashboard-bg">

<!-- 🔷 TOP LEFT BRAND -->
<div class="top-left-brand">
  <img src="logo.png" alt="Logo" class="logo-small">
  <div class="brand-info">
    <h4>FocusFlow</h4>
    <p>Turn Focus into Progress</p>
    <span>Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?></span>
  </div>
</div>

<!-- 🔴 LOGOUT -->
<a href="logout.php" class="logout-btn">Logout</a>

<!-- 🔝 CENTER TITLE -->
<header class="center-title">📘 FocusFlow</header>

<!-- 🔘 NAVIGATION -->
<nav class="pill-nav">
  <a class="active" href="index.php">Dashboard</a>
  <a href="timetable.html">Timetable</a>
  <a href="goals.html">Goals</a>
  <a href="progress.html">Progress</a>
</nav>

<!-- 📊 DASHBOARD CONTENT -->
<div class="dashboard-center">

  <div class="card glass">
    <h3>📊 Dashboard</h3>
    <p>Total Subjects Planned: <b id="totalSubjects">0</b></p>
    <p>🔥 Study Streak: <b id="streakDays">0 days</b></p>
  </div>

  <div class="card glass">
    <h3>💡 Instant Motivation</h3>
    <p>Small steps every day create big success.</p>
    <button class="primary-btn">Motivate Me</button>
  </div>

  <div class="card glass">
    <h3>🎧 Soundscapes</h3>
    <button onclick="playSound('forest')">🌲 Forest</button>
    <button onclick="playSound('rain')">🌧 Rain</button>
    <button onclick="playSound('noise')">📻 Noise</button>
    <button class="danger" onclick="stopSound()">Stop</button>
  </div>

</div>

<!-- 🔊 JS -->
<script src="js/motivation.js"></script>
<script src="js/soundscape.js"></script>

<!-- ✅ LOAD DASHBOARD DATA -->
<script>
  // 🔥 Load streak
  const streak = localStorage.getItem("streak") || 0;
  document.getElementById("streakDays").innerText = streak + " days";

  // 📊 Load total planned subjects
  const planned = localStorage.getItem("plannedSlots") || 0;
  document.getElementById("totalSubjects").innerText = planned;
</script>
<script>
  document.getElementById("streakDays").innerText =
    (localStorage.getItem("streak") || 0) + " days";

  document.getElementById("totalSubjects").innerText =
    localStorage.getItem("plannedSlots") || 0;
</script>


</body>
</html>

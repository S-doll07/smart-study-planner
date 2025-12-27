<?php
include "db.php";

$username = trim($_POST['username']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Check existing user
$check = $conn->prepare("SELECT id FROM users WHERE username=?");
$check->bind_param("s", $username);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo "<script>
        alert('Username already exists!');
        window.location.href='register.html';
    </script>";
    exit();
}

$stmt = $conn->prepare("INSERT INTO users(username,password) VALUES(?,?)");
$stmt->bind_param("ss", $username, $password);

if ($stmt->execute()) {
    echo "<script>
        alert('Registration successful! Please login.');
        window.location.href='login.html';
    </script>";
}
?>

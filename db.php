<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$conn = new mysqli("localhost", "root", "", "focusflow");

if ($conn->connect_error) {
    die("Database connection failed");
}
?>

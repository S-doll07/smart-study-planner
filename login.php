<?php
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $conn->prepare("SELECT password FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($hashed);
    $stmt->fetch();

    if (password_verify($password, $hashed)) {
        $_SESSION['username'] = $username;
        header("Location: index.php");
        exit();
    }
}

echo "<script>
    alert('Invalid username or password');
    window.location.href='login.html';
</script>";
?>

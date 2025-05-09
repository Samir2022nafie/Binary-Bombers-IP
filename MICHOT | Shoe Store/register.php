<?php
session_start();
require_once 'db.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $file = $_FILES['profile_image'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format!";
    } elseif ($password !== $confirm_password) {
        $error = "Passwords do not match!";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters!";
    } else {
        // File upload validation
        $allowed = ['image/jpeg', 'image/png'];
        if (!in_array($file['type'], $allowed)) {
            $error = "Only JPG/PNG files allowed!";
        } elseif ($file['size'] > 5 * 1024 * 1024) {
            $error = "File size exceeds 5MB!";
        } else {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $filename = uniqid() . '_' . basename($file['name']);
            move_uploaded_file($file['tmp_name'], 'uploads/' . $filename);

            try {
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password, profile_image) VALUES (?, ?, ?, ?)");
                $stmt->execute([$name, $email, $hashed_password, $filename]);
                header("Location: index.php");
                exit();
            } catch (PDOException $e) {
                $error = "Email already exists!";
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="form-container">
        <h1>Register New</h1>
        <?php if (!empty($error)): ?>
            <div class="error"><?= $error ?></div>
        <?php endif; ?>
        <form action="register.php" method="POST" enctype="multipart/form-data">
            <div class="form-group">
                <input type="text" name="name" placeholder="Your Name *" required>
            </div>
            <div class="form-group">
                <input type="email" name="email" placeholder="Your Email *" required>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Your Password *" required minlength="6">
            </div>
            <div class="form-group">
                <input type="password" name="confirm_password" placeholder="Confirm Password *" required>
            </div>
            <div class="form-group">
                <input type="file" name="profile_image" accept=".jpg, .jpeg, .png" required>
            </div>
            <button type="submit">Register Now</button>
        </form>
        <div class="link">
            Already Have An Account? <a href="login.php">Login Now</a>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>

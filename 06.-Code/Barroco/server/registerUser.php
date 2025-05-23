<?php

session_start();
include '../server/conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $usuario = trim($_POST["usuario"]);
    $password = trim($_POST["contrasena"]);
    $confirmar = trim($_POST["confirmar"]);

    if (!$email || empty($usuario) || empty($password) || empty($confirmar)) {
        echo "<script>alert('Por favor completa todos los campos.'); window.history.back();</script>";
        exit;
    }

    if ($password !== $confirmar) {
        echo "<script>alert('Las contrase\u00f1as no coinciden.'); window.history.back();</script>";
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO user (firstName, lastName, email, password) VALUES (?, '', ?, ?)");
    $stmt->bind_param("sss", $usuario, $email, $passwordHash);

    if ($stmt->execute()) {
        $idUser = $stmt->insert_id;
        $conn->query("INSERT INTO customer (idCustomer) VALUES ($idUser)");
        $_SESSION["idUser"] = $idUser;
        $_SESSION["email"] = $email;
        $_SESSION["usuario"] = $usuario;
        header("Location: ../pages/index.php");
        exit;
    } else {
        if ($conn->errno === 1062) {
            echo "<script>alert('Este correo ya est\u00e1 registrado.'); window.history.back();</script>";
        } else {
            echo "<script>alert('Error: " . $conn->error . "'); window.history.back();</script>";
        }
        exit;
    }
    $stmt->close();
    $conn->close();
} else {
    header("Location: ../pages/register.php");
    exit;
}
?>

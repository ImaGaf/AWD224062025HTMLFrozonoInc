<?php
session_start();
include 'conexion.php'; 

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = $_POST['password'];

    if (empty($usuario) || empty($password)) {
        echo "<script>alert('Completa todos los campos.');</script>";
    } else {
        $stmt = $conn->prepare("SELECT idUser, password FROM user WHERE email = ? OR firstName = ?");
        $stmt->bind_param("ss", $usuario, $usuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row['password'])) {
                $_SESSION['idUser'] = $row['idUser'];
                
                header("Location: ../pages/index.php");
                exit;
            } else {
                echo "<script>alert('Contraseña incorrecta.');
                window.location.href = '../pages/login.php';</script>";
                header("Location: ../pages/login.php");
            }
        } else {
            echo "<script>alert('Usuario no encontrado.');
            window.location.href = '../pages/login.php';</script>";
        }
    }
}
?>

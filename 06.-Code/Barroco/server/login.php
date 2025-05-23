<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario']);
    $password = $_POST['password'];

    if (empty($usuario) || empty($password)) {
        echo "<script>alert('Completa todos los campos.'); window.location.href = '../pages/login.php';</script>";
        exit;
    }

    $stmt = $conn->prepare("SELECT idUser, email, firstName, password FROM user WHERE email = ? OR firstName = ?");
    $stmt->bind_param("ss", $usuario, $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['idUser'] = $row['idUser'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['usuario'] = $row['firstName'];

            $idUser = $row['idUser'];
            $customerId = $idUser;
            $cartQuery = $conn->prepare("
                SELECT sc.idShoppingCart 
                FROM shopping_cart sc
                JOIN `order` o ON sc.idOrder = o.idOrder
                WHERE o.idCustomer = ? AND o.status = 'pendiente'
                LIMIT 1
            ");
            $cartQuery->bind_param("i", $customerId);
            $cartQuery->execute();
            $cartResult = $cartQuery->get_result();

            if ($cartResult->num_rows > 0) {
                $cartRow = $cartResult->fetch_assoc();
                $_SESSION['cart_id'] = $cartRow['idShoppingCart'];
            } else {
                unset($_SESSION['cart_id']);
            }

            header("Location: ../pages/index.php");
            exit;
        } else {
            echo "<script>alert('Contrase\u00f1a incorrecta.'); window.location.href = '../pages/login.php';</script>";
            exit;
        }
    } else {
        echo "<script>alert('Usuario no encontrado.'); window.location.href = '../pages/login.php';</script>";
        exit;
    }
}
?>

<?php 
session_start();
if (!isset($_SESSION['idUser']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../pages/login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assests/css/header.css" />
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />
    <title>Panel Admin | Barroco</title>
</head>
<body>
<header class="barroco-header">
    <div class="header-container">
        <a href="../pages/adminDashboard.php" class="logo-link">
            <img class="logo" src="../assests/imgs/barrocoLogo.png" alt="Logo" />
        </a>
        <h1>ADMIN BARROCO</h1>
        <div class="icon-links">
            <a href="../pages/profile.php">
                <i class="fa-regular fa-user"></i>
            </a>
            <a href="../server/logout.php" title="Cerrar sesión">
                <i class="fa-solid fa-right-from-bracket"></i>
            </a>
        </div>
    </div>
    <nav class="nav-links">
        <a href="../pages/adminUsers.php">Usuarios</a>
        <a href="../pages/adminOrders.php">Pedidos</a>
        <a href="../pages/adminProducts.php">Productos</a>
    </nav>
</header>
</body>
</html>

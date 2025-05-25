<?php 
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assests/css/header.css" />
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />
    <title>Barroco</title>
</head>
<body>
<header class="barroco-header">
    <div class="header-container">
        <a href="../pages/index.php" class="logo-link">
            <img class="logo" src="../assests/imgs/barrocoLogo.png" alt="Logo" />
        </a>
        <h1>BARROCO</h1>
        <div class="icon-links">
            <a href="<?php echo isset($_SESSION['idUser']) ? '../pages/profile.php' : '../pages/login.php'; ?>">
                <i class="fa-regular fa-user"></i>
            </a>
            <a href="<?php echo isset($_SESSION['idUser']) ? '../pages/cart.php' : '../pages/login.php'; ?>">
                <i class="fa-solid fa-cart-shopping"></i>
            </a>
            <a href="<?php echo isset($_SESSION['idUser']) ? '../pages/orders.php' : '../pages/login.php'; ?>">
                <i class="fa-solid fa-clipboard-list"></i>
            </a>
            <?php if (isset($_SESSION['idUser'])): ?>
                <a href="../server/logout.php" title="Cerrar sesión">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </a>
            <?php else: ?>
                <a href="../pages/login.php" title="Iniciar sesión">
                    <i class="fa-solid fa-right-to-bracket"></i>
                </a>
            <?php endif; ?>
        </div>
    </div>
    <nav class="nav-links">
        <a href="#" data-filter="1">Jarros</a>
        <a href="#" data-filter="2">Platos</a>
        <a href="#" data-filter="3">Floreros</a>
        <a href="#" data-filter="4">Macetas</a>
        <a href="#" data-filter="5">Jarrones</a>
        <a href="#" data-filter="6">Cuencos</a>
        <a href="#" data-filter="7">Bowls</a>
    </nav>
</header>
</body>
</html>

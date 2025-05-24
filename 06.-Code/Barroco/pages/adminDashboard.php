<?php
include '../server/conexion.php';
session_start();

// Redirigir si no está logueado o no es usuario
if (!isset($_SESSION['idUser']) || $_SESSION['role'] !== 'user') {
    header('Location: login.php');
    exit;
}

$conn->set_charset("utf8mb4");

$idUsuario = $_SESSION['idUser'];

// Total gastado por el usuario
$totalGastado = 0.00;
$result = $conn->query("SELECT SUM(total) AS totalGastado FROM `order` WHERE idUser = $idUsuario");
if ($result && $row = $result->fetch_assoc()) {
    $totalGastado = (float) $row['totalGastado'];
}

// Total de pedidos del usuario
$totalPedidos = 0;
$result = $conn->query("SELECT COUNT(*) AS total FROM `order` WHERE idUser = $idUsuario");
if ($result && $row = $result->fetch_assoc()) {
    $totalPedidos = (int) $row['total'];
}

// Total de productos comprados
$productosComprados = 0;
$result = $conn->query("
    SELECT SUM(ci.quantity) AS total 
    FROM cart_item ci
    INNER JOIN `order` o ON ci.order_id = o.idOrder
    WHERE o.idUser = $idUsuario
");
if ($result && $row = $result->fetch_assoc()) {
    $productosComprados = (int) $row['total'];
}

// Fechas y totales para el gráfico
$ventasUsuario = $conn->query("
    SELECT date, SUM(total) AS total 
    FROM `order` 
    WHERE idUser = $idUsuario 
    GROUP BY date 
    ORDER BY date ASC
");

$fechas = [];
$totales = [];
while ($row = $ventasUsuario->fetch_assoc()) {
    $fechas[] = $row['date'];
    $totales[] = (float) $row['total'];
}

// Ventas por categoría
$ventasPorCategoria = $conn->query("SELECT c.name AS categoria, SUM(o.total) AS totalVentas FROM `order` o JOIN shopping_cart sc ON o.idOrder = sc.idOrder JOIN cart_item ci ON sc.idShoppingCart = ci.idShoppingCart JOIN product p ON ci.idProduct = p.idProduct JOIN category c ON p.category = c.idCategory GROUP BY c.name");
$categorias = [];
$ventasCategoria = [];
while ($row = $ventasPorCategoria->fetch_assoc()) {
    $categorias[] = $row['categoria'];
    $ventasCategoria[] = (float) $row['totalVentas'];
}

// Órdenes por estado
$ordenesPorEstado = $conn->query("SELECT status, COUNT(*) AS total FROM `order` GROUP BY status");
$estados = [];
$conteoEstados = [];
while ($row = $ordenesPorEstado->fetch_assoc()) {
    $estados[] = $row['status'];
    $conteoEstados[] = (int) $row['total'];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Mi Panel | Barroco</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <?php include '../components/headerUser.php'; ?>

    <main class="main-dashboard">
        <h1 style="text-align: center; color: #A6C3AD; margin-bottom: 40px;">Bienvenido a tu Panel</h1>

        <div class="metrics">
            <div class="card">
                <h2>$<?= number_format($totalGastado, 2) ?></h2>
                <p>Total Gastado</p>
            </div>
            <div class="card">
                <h2><?= $totalPedidos ?></h2>
                <p>Pedidos Realizados</p>
            </div>
            <div class="card">
                <h2><?= $productosComprados ?></h2>
                <p>Productos Comprados</p>
            </div>
        </div>
        
        <h2 style="text-align: center; color: #B9CCAE; margin-bottom: 20px;">Ventas por Día</h2>
        <canvas class="chart1" id="ventasChart"></canvas>

        <div class="chartsRow">
            <div>
                <h2 style="text-align: center; color: #B9CCAE; margin-top: 40px;">Ventas por Categoría</h2>
                <canvas class="chart" id="categoriaChart"></canvas>
            </div>

            <div>
                <h2 style="text-align: center; color: #B9CCAE; margin-top: 40px;">Órdenes por Estado</h2>
                <canvas class="chart" id="estadoChart"></canvas>
            </div>

        </div>


        <script>
            const fechas = <?= json_encode($fechas) ?>;
            const totales = <?= json_encode($totales) ?>;
            const categorias = <?= json_encode($categorias) ?>;
            const ventasCategoria = <?= json_encode($ventasCategoria) ?>;
            const estados = <?= json_encode($estados) ?>;
            const conteoEstados = <?= json_encode($conteoEstados) ?>;
        </script>
        <script src="../assests/js/dashboard.js"></script>
    </main>
</body>
</html>

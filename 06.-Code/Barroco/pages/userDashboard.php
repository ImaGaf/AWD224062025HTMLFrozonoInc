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

        <h2 style="text-align: center; color: #B9CCAE; margin-bottom: 20px;">Gastos por Día</h2>
        <canvas id="gastosChart" width="600" height="300"></canvas>

        <script>
            const ctx = document.getElementById('gastosChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: <?= json_encode($fechas) ?>,
                    datasets: [{
                        label: 'Gasto ($)',
                        data: <?= json_encode($totales) ?>,
                        backgroundColor: 'rgba(166, 195, 173, 0.2)',
                        borderColor: '#A6C3AD',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.3,
                        pointBackgroundColor: '#D3A373'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        </script>
    </main>
</body>
</html>

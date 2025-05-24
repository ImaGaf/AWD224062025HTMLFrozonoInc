<?php
include '../server/conexion.php'; // Ajusta la ruta si es necesario

// Establecer codificación UTF-8 si no está en el archivo de conexión
$conn->set_charset("utf8mb4");

// Total de ventas
$totalVentas = 0.00;
$result = $conn->query("SELECT SUM(total) AS totalVentas FROM `order`");
if ($result && $row = $result->fetch_assoc()) {
    $totalVentas = (float) $row['totalVentas'];
}

// Total de órdenes
$totalOrdenes = 0;
$result = $conn->query("SELECT COUNT(*) AS total FROM `order`");
if ($result && $row = $result->fetch_assoc()) {
    $totalOrdenes = (int) $row['total'];
}

// Total de clientes
$clientesTotales = 0;
$result = $conn->query("SELECT COUNT(*) AS total FROM customer");
if ($result && $row = $result->fetch_assoc()) {
    $clientesTotales = (int) $row['total'];
}

// Productos vendidos
$productosVendidos = 0;
$result = $conn->query("SELECT SUM(quantity) AS total FROM cart_item");
if ($result && $row = $result->fetch_assoc()) {
    $productosVendidos = (int) $row['total'];
}

// Ventas por día
$ventasPorDia = $conn->query("SELECT date, SUM(total) AS total FROM `order` GROUP BY date ORDER BY date ASC");
$fechas = [];
$totales = [];
while ($row = $ventasPorDia->fetch_assoc()) {
    $fechas[] = $row['date'];
    $totales[] = (float) $row['total'];
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Dashboard Admin</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="../assests/css/adminDashboard.css">
</head>

<body>
    <header>
        <?php include '../components/headerAdmin.php'; ?>
    </header>
    <main class="main-dashboard">
        <h1 style="text-align: center; color: #A6C3AD; margin-bottom: 40px;">Dashboard de Administración</h1>

        <div class="metrics">
            <div class="card">
                <h2>$<?= number_format($totalVentas, 2) ?></h2>
                <p>Total Ventas</p>
            </div>
            <div class="card">
                <h2><?= $totalOrdenes ?></h2>
                <p>Total Órdenes</p>
            </div>
            <div class="card">
                <h2><?= $clientesTotales ?></h2>
                <p>Clientes Registrados</p>
            </div>
            <div class="card">
                <h2><?= $productosVendidos ?></h2>
                <p>Productos Vendidos</p>
            </div>
        </div>

        <h2 style="text-align: center; color: #B9CCAE; margin-bottom: 20px;">Ventas por Día</h2>
        <canvas id="ventasChart" width="600" height="300"></canvas>

        <script>
            const ctx = document.getElementById('ventasChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: <?= json_encode($fechas) ?>,
                    datasets: [{
                        label: 'Ventas ($)',
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
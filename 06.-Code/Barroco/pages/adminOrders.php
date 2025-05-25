<?php
include '../server/conexion.php';

$sql = "
    SELECT 
        o.idOrder,
        CONCAT(u.firstName, ' ', u.lastName) AS customerName,
        o.products,
        o.total,
        o.date,
        o.deliveryAddress,
        o.status
    FROM `order` o
    JOIN customer c ON o.idCustomer = c.idCustomer
    JOIN user u ON c.idCustomer = u.idUser
    ORDER BY o.date DESC
";

$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Órdenes</title>
    <link rel="stylesheet" href="../assests/css/orders.css">
</head>

<body>
    <header>
        <?php include '../components/headerAdmin.php'; ?>
    </header>
    <main class="orders-main">
        <h1>Órdenes</h1>
        <div class="ordenes-container">
            <?php while ($row = $result->fetch_assoc()): ?>
                <div class="orden">
                    <p><strong>Cliente:</strong> <?= htmlspecialchars($row['customerName']) ?></p>
                    <p><strong>ID Orden:</strong> <?= $row['idOrder'] ?></p>
                    <p><strong>Productos:</strong>
                    <ul>
                        <?php
                        $productIds = explode(',', $row['products']);
                        foreach ($productIds as $pid) {
                            $pid = intval($pid);
                            $prodQuery = $conn->query("SELECT name FROM product WHERE idProduct = $pid");
                            if ($prod = $prodQuery->fetch_assoc()) {
                                echo "<li>ID {$pid} - " . htmlspecialchars($prod['name']) . "</li>";
                            }
                        }
                        ?>
                    </ul>
                    </p>
                    <p><strong>Fecha:</strong> <?= $row['date'] ?></p>
                    <p><strong>Total:</strong> $<?= number_format($row['total'], 2) ?></p>
                    <p><strong>Dirección:</strong> <?= htmlspecialchars($row['deliveryAddress']) ?></p>
                    <p><strong>Estado:</strong> <span id="estado-<?= $row['idOrder'] ?>"><?= $row['status'] ?></span></p>
                    <?php if ($row['status'] !== 'Despachado'): ?>
                        <button onclick="changeOrderStatus(event, <?= $row['idOrder'] ?>)">Marcar como Despachado</button>
                    <?php else: ?>
                        <button disabled>Despachado</button>
                    <?php endif; ?>
                </div>
            <?php endwhile; ?>
        </div>
    </main>
    <script src="../assests/js/orders.js"></script>
</body>

</html>

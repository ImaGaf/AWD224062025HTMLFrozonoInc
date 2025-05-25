<?php
include '../server/conexion.php';
session_start();

if (!isset($_SESSION['idUser']) || $_SESSION['role'] !== 'user') {
    header('Location: login.php');
    exit;
}

$conn->set_charset("utf8mb4");
$idUsuario = $_SESSION['idUser'];


$result = $conn->query("
    SELECT o.idOrder, o.date, o.total 
    FROM `order` o
    WHERE o.idUser = $idUsuario
    ORDER BY o.date DESC
");
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Historial de Compras | Barroco</title>
</head>
<body>
    <?php include '../components/headerUser.php'; ?>

    <main class="main-dashboard">
        <h1 style="text-align: center; color: #A6C3AD; margin-bottom: 30px;">Historial de Compras</h1>

        <table class="tabla">
            <thead>
                <tr>
                    <th>ID Orden</th>
                    <th>Fecha</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <td><?= $row['idOrder'] ?></td>
                        <td><?= $row['date'] ?></td>
                        <td>$<?= number_format($row['total'], 2) ?></td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </main>
</body>
</html>

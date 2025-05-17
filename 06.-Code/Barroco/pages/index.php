<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assests/css/mainPage.css">
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet">
    <title>Barroco</title>
</head>

<body>
    <?php include '../components/header.php'; ?>
    <main class="grid-container">
        <?php
        $stmt = $pdo->query("SELECT * FROM productos");
        while ($product = $stmt->fetch()) {
            include 'partials/product-card.php';
        }
        ?>
    </main>
</body>

</html>
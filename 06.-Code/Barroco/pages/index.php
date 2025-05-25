<?php
include '../server/conexion.php';
$sql = "SELECT * FROM product";
$result = $conn->query($sql);
ob_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../assests/css/mainPage.css" />
    <link rel="stylesheet" href="../assests/css/cardList.css" />
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
    <title>Barroco</title>
</head>
<body>
    <header>
        <?php include '../components/header.php'; ?>
    </header>
    <main class="main-page">
        <div class="search-bar">
            <input id="searchInput" type="text" placeholder="Ingrese su producto a buscar" />
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="grid-container">
            <div class="product-container">
                <?php if ($result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <div class="product-card" 
                             data-id="<?php echo $row['idProduct']; ?>" 
                             data-category="<?php echo $row['category']; ?>"
                             data-description="<?php echo htmlspecialchars(strtolower($row['description'])); ?>">
                            <img src="<?php echo htmlspecialchars($row['url']); ?>"
                                 alt="<?php echo htmlspecialchars($row['name']); ?>" 
                                 class="product-image" />
                            <div class="product-info">
                                <h3 class="product-title"><?php echo htmlspecialchars($row['name']); ?></h3>
                                <p class="product-price">$<?php echo number_format($row['price'], 2); ?></p>
                            </div>
                        </div>
                    <?php endwhile; ?>
                <?php else: ?>
                    <p>No hay productos disponibles.</p>
                <?php endif; ?>
            </div>
        </div>
    </main>
    <script src="../assests/js/index.js"></script>
</body>
</html>
<?php
$conn->close();
ob_end_flush();
?>

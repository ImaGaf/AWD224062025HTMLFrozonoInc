<?php
include '../server/conexion.php';

if (!isset($_GET['id'])) {
    echo "Producto no encontrado.";
    exit;
}

$productId = intval($_GET['id']);
$sql = "SELECT * FROM product WHERE idProduct = $productId";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo "Producto no encontrado.";
    exit;
}

$product = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($product['name']); ?> - Barroco</title>
    <link rel="stylesheet" href="../assests/css/singleProduct.css">
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet">
</head>

<body>
    <header>
        <?php include '../components/header.php'; ?>
    </header>
    <main class="product-page">
        <div class="product-card">
            <div class="image-section">
                <img src="<?php echo htmlspecialchars($product['url']); ?>"
                    alt="<?php echo htmlspecialchars($product['name']); ?>">
                <div class="image-dots">
                    <span></span><span></span><span></span><span></span>
                </div>
            </div>
            <div class="info-section">
                <h1 class="title"><?php echo htmlspecialchars($product['name']); ?></h1>
                <p class="price">$<?php echo number_format($product['price'], 2); ?></p>
                <h3>¿POR QUÉ NOS ENCANTA?</h3>
                <p class="description"><?php echo htmlspecialchars($product['description']); ?></p>

                <div class="colors">
                    <span style="background-color: #D3A373;"></span>
                    <span style="background-color: #A6C3AD;"></span>
                    <span style="background-color: #CCD5AE;"></span>
                    <span style="background-color: #B9CCAE;"></span>
                </div>

                <div class="quantity">
                    <button id="decrease"><i class="fa-solid fa-minus"></i></button>
                    <input type="number" id="quantity" value="1" min="1">
                    <button id="increase"><i class="fa-solid fa-plus"></i></button>
                </div>
                <button class="add-to-cart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </main>
    <script src="../assests/js/singleProduct.js"></script>
</body>

</html>

<?php $conn->close(); ?>
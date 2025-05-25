<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assests/css/cart.css">
    <title>Barroco</title>
</head>

<body>
    <header>
        <?php include '../components/header.php'; ?>
    </header>
    <main class="car-page">
        <div class="cart-hero">
            <h2>Mi carrito</h2>
        </div>

        <div class="cart-container">
            <div id="cart-items"></div>

            <div class="cart-footer">
                <button class="pay-btn" id="pay-button">Pagar</button>
                <p id="total-price"><strong>Total: 0$</strong></p>
            </div>
        </div>
    </main>
    <script src="../assests/js/cart.js"></script>
</body>

</html>
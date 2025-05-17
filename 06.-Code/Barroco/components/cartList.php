main class="grid-container">
    <?php
    $stmt = $pdo->query("SELECT * FROM productos");
    while ($product = $stmt->fetch()) {
        include 'partials/product-card.php';
    }
    ?>
</main>
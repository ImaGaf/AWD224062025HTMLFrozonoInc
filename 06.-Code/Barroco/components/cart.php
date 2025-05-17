<div class="card">
    <img src="assets/imgs/<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
    <h3><?= htmlspecialchars($product['name']) ?></h3>
    <p>$<?= number_format($product['price'], 2) ?></p>
</div>

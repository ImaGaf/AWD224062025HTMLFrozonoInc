<?php
// Datos quemados del carrito
$cartItems = [
    [
        "id" => 1,
        "img" => "../assests/imgs/cart1.png",
        "name" => "Frasco de Ornitorrinco",
        "price" => 25.00,
        "desc" => "Frasco en forma de Ornitorrinco.",
        "quantity" => 1
    ],
    [
        "id" => 2,
        "img" => "../assests/imgs/cart2.png",
        "name" => "Juegos de platos",
        "price" => 74.99,
        "desc" => "Juego de platos de cerámica; 4 platos soperos, 4 platos pequeños, 4 tazas.",
        "quantity" => 1
    ],
    [
        "id" => 3,
        "img" => "../assests/imgs/cart3.png",
        "name" => "Florero con decoraciones doradas",
        "price" => 15.50,
        "desc" => "Florero de cerámica con estampado de flores en azul y decoraciones doradas.",
        "quantity" => 1
    ],
    [
        "id" => 4,
        "img" => "../assests/imgs/cart2.png",
        "name" => "Taza personalizada",
        "price" => 9.99,
        "desc" => "Taza de cerámica blanca con diseño personalizado.",
        "quantity" => 1
    ]
];

$total = 0;
?>

<?php foreach ($cartItems as $item): ?>
    <div class="cart-item">
        <input type="checkbox" checked>
        <img src="<?= $item['img'] ?>" alt="<?= $item['name'] ?>" class="cart-img">
        <div class="cart-info">
            <h3><?= $item['name'] ?></h3>
            <p><strong>Precio:</strong> <?= number_format($item['price'], 2) ?>$</p>
            <p><?= $item['desc'] ?></p>
        </div>
        <div class="cart-quantity">
            <button>-</button>
            <span><?= $item['quantity'] ?></span>
            <button>+</button>
        </div>
    </div>
    <?php $total += $item['price'] * $item['quantity']; ?>
    <hr>
<?php endforeach; ?>

<div class="cart-footer">
    <button class="pay-btn">Pagar</button>
    <p><strong>Total: <?= number_format($total, 2) ?>$</strong></p>
</div>

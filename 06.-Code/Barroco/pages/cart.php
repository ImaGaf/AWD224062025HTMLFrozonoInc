<?php
include_once "../components/header.php";
?>
<link rel="stylesheet" href="../assests/css/cart.css">

<div class="cart-hero">
    <h2>Mi carrito</h2>
</div>

<div class="cart-container">
    <div id="cart-items"></div>

    <div class="cart-footer">
        <button class="pay-btn">Pagar</button>
        <p id="total-price"><strong>Total: 0$</strong></p>
    </div>
</div>

<script src="../assests/js/cart.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        renderCart();

        document.addEventListener("click", function (e) {
            if (e.target.classList.contains("btn-minus")) {
                const id = parseInt(e.target.dataset.id);
                updateQty(id, -1);
            }
            if (e.target.classList.contains("btn-plus")) {
                const id = parseInt(e.target.dataset.id);
                updateQty(id, 1);
            }
        });
    });
</script>

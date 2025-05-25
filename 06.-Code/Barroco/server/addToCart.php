<?php
session_start();
include '../server/conexion.php';

$productId = intval($_POST['productId']);
$quantity = intval($_POST['quantity']);

if ($quantity < 1) $quantity = 1;

if (!isset($_SESSION['cart_id'])) {
    $sqlCart = "INSERT INTO shopping_cart (total) VALUES (0)";
    $conn->query($sqlCart);
    $_SESSION['cart_id'] = $conn->insert_id;
}

$cartId = $_SESSION['cart_id'];

$productQuery = $conn->query("SELECT price FROM product WHERE idProduct = $productId");
$product = $productQuery->fetch_assoc();
$subtotal = $quantity * $product['price'];

$sqlInsert = "INSERT INTO cart_item (idShoppingCart, idProduct, quantity, subtotal)
            VALUES ($cartId, $productId, $quantity, $subtotal)";
$conn->query($sqlInsert);

$conn->query("UPDATE shopping_cart 
            SET total = (SELECT SUM(subtotal) FROM cart_item WHERE idShoppingCart = $cartId)
            WHERE idShoppingCart = $cartId");

echo json_encode(["success" => true]);

$conn->close();
?>

<?php
session_start();
include 'conexion.php';

if (!isset($_SESSION['idUser'])) {
    echo json_encode(["success" => false, "message" => "Usuario no autenticado."]);
    exit;
}

$productId = intval($_POST['productId']);
$quantity = max(1, intval($_POST['quantity']));
$userId = $_SESSION['idUser'];

$result = $conn->query("SELECT idCustomer FROM customer WHERE idCustomer = $userId");
if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Cliente no encontrado."]);
    exit;
}
$idCustomer = $result->fetch_assoc()['idCustomer'];

if (!isset($_SESSION['cart_id'])) {
    $conn->query("INSERT INTO `order` (idCustomer, total, date, status) VALUES ($idCustomer, 0, NOW(), 'pendiente')");
    $idOrder = $conn->insert_id;
    $conn->query("INSERT INTO shopping_cart (idOrder, total) VALUES ($idOrder, 0)");
    $_SESSION['cart_id'] = $conn->insert_id;
}

$cartId = $_SESSION['cart_id'];
$productQuery = $conn->query("SELECT price FROM product WHERE idProduct = $productId");
if ($productQuery->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Producto no encontrado."]);
    exit;
}

$product = $productQuery->fetch_assoc();
$subtotal = $quantity * $product['price'];
$conn->query("INSERT INTO cart_item (idShoppingCart, idProduct, quantity, subtotal) VALUES ($cartId, $productId, $quantity, $subtotal)");

$conn->query("UPDATE shopping_cart SET total = (SELECT IFNULL(SUM(subtotal), 0) FROM cart_item WHERE idShoppingCart = $cartId) WHERE idShoppingCart = $cartId");
$conn->query("UPDATE `order` SET total = (SELECT total FROM shopping_cart WHERE idShoppingCart = $cartId) WHERE idOrder = (SELECT idOrder FROM shopping_cart WHERE idShoppingCart = $cartId)");

echo json_encode(["success" => true]);
$conn->close();
?>
<?php
session_start();
include '../server/conexion.php';

if (!isset($_SESSION['idShoppingCart'])) {
    http_response_code(404);
    echo json_encode(["error" => "No hay carrito activo"]);
    exit;
}

$idCart = intval($_SESSION['idShoppingCart']);

$sql = "SELECT ci.idItemCart, p.url AS img, p.name, p.description AS `desc`, p.price, ci.quantity
        FROM cart_item ci
        JOIN product p ON ci.idProduct = p.idProduct
        WHERE ci.idShoppingCart = $idCart";

$result = $conn->query($sql);
$items = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($items);
$conn->close();

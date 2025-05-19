<?php
session_start();
header('Content-Type: application/json');
include '../server/conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['idItemCart']) || !isset($data['quantity'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

$idItemCart = intval($data['idItemCart']);
$quantity = intval($data['quantity']);
if ($quantity < 1) $quantity = 1;

$sql = "SELECT p.price 
        FROM cart_item ci
        JOIN product p ON ci.idProduct = p.idProduct
        WHERE ci.idItemCart = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $idItemCart);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Producto no encontrado']);
    exit;
}

$row = $result->fetch_assoc();
$price = floatval($row['price']);
$subtotal = $price * $quantity;

$updateSql = "UPDATE cart_item SET quantity = ?, subtotal = ? WHERE idItemCart = ?";
$updateStmt = $conn->prepare($updateSql);
$updateStmt->bind_param("idi", $quantity, $subtotal, $idItemCart);

if ($updateStmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al actualizar']);
}

$conn->close();

<?php
session_start();
include 'conexion.php';

header('Content-Type: application/json');

if (!isset($_SESSION['idUser'])) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit();
}

$idUser = $_SESSION['idUser'];

$stmt = $conn->prepare("SELECT firstName, lastName, email FROM user WHERE idUser = ?");
$stmt->bind_param("i", $idUser);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

$stmt = $conn->prepare("SELECT phone, billingAddress FROM customer WHERE idCustomer = ?");
$stmt->bind_param("i", $idUser);
$stmt->execute();
$result = $stmt->get_result();
$customer = $result->fetch_assoc();

echo json_encode([
    'user' => $user,
    'customer' => $customer
]);

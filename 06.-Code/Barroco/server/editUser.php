<?php
session_start();
include 'conexion.php';

if (!isset($_SESSION['idUser'])) {
    http_response_code(401);
    echo "No autorizado";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $field = $_POST['field'];
    $value = $_POST['value'];
    $idUser = $_SESSION['idUser'];

    $allowedFields = ['firstName', 'lastName', 'email', 'phone', 'billingAddress'];

    if (!in_array($field, $allowedFields)) {
        http_response_code(400);
        echo "Campo no válido";
        exit();
    }

    // Define qué tabla editar
    if (in_array($field, ['firstName', 'lastName', 'email'])) {
        $query = "UPDATE user SET $field = ? WHERE idUser = ?";
    } else {
        $query = "UPDATE customer SET $field = ? WHERE idCustomer = ?";
    }

    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $value, $idUser);

    if ($stmt->execute()) {
        echo "Actualizado correctamente";
    } else {
        http_response_code(500);
        echo "Error al actualizar";
    }
}

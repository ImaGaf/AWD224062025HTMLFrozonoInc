<?php
include_once "conexion.php";

// Validar campos obligatorios
if (!isset($_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['role'])) {
    die("Campos obligatorios faltantes");
}

$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$email = $_POST['email'];
$role = $_POST['role'];
$password = password_hash("123456", PASSWORD_DEFAULT); // Contraseña por defecto

// Insertar en tabla `user`
$stmt = $conn->prepare("INSERT INTO `user` (firstName, lastName, email, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $firstName, $lastName, $email, $password);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $idUser = $stmt->insert_id;

    // Insertar en `employee`
    $stmtEmp = $conn->prepare("INSERT INTO `employee` (idEmployee, role) VALUES (?, ?)");
    $stmtEmp->bind_param("is", $idUser, $role);
    $stmtEmp->execute();

    // Si el rol es Administrador, insertarlo también
    if ($role === 'Administrador') {
        $stmtAdm = $conn->prepare("INSERT INTO `administrator` (idAdmin) VALUES (?)");
        $stmtAdm->bind_param("i", $idUser);
        $stmtAdm->execute();
    }

    header("Location: ../pages/editUser.php");
} else {
    echo "Error al agregar usuario.";
}
?>

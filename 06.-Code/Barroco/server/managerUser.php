<?php
include "../server/conexion.php";

$action = $_POST['action'];

switch ($action) {
    case 'add':
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $role = $_POST['role'];

        $sql = "INSERT INTO `user` (`firstName`, `lastName`, `email`, `role`) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $firstName, $lastName, $email, $role);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Empleado agregado correctamente.']);
        break;

    case 'edit':
        $idUser = $_POST['idUser'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $role = $_POST['role'];

        $sql = "UPDATE `user` SET `firstName` = ?, `lastName` = ?, `email` = ?, `role` = ? WHERE `idUser` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $firstName, $lastName, $email, $role, $idUser);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Empleado actualizado correctamente.']);
        break;

    case 'delete':
        $idUser = $_POST['idUser'];

        $sql = "DELETE FROM `user` WHERE `idUser` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idUser);
        $stmt->execute();

        echo json_encode(['status' => 'success', 'message' => 'Empleado eliminado correctamente.']);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Acción no válida.']);
        break;
}
?>

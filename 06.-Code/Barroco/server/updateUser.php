<?php
include_once "conexion.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario
    $idUser = $_POST['idUser'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $role = $_POST['role'];  // Asegurarnos de que 'role' esté presente

    // Verificar que el rol esté definido
    if (isset($role)) {
        // Actualizar la tabla 'user'
        $updateUserSql = "UPDATE `user` SET `firstName` = '$firstName', `lastName` = '$lastName', `email` = '$email' WHERE `idUser` = $idUser";
        if ($conn->query($updateUserSql) === TRUE) {
            // Actualizar la tabla 'employee'
            $updateEmployeeSql = "UPDATE `employee` SET `role` = '$role' WHERE `idEmployee` = $idUser";
            $conn->query($updateEmployeeSql);

            // Si el rol es Administrador, insertamos en la tabla 'administrator'
            if ($role == 'Administrador') {
                // Verificar si el usuario ya es administrador
                $checkAdminSql = "SELECT * FROM `administrator` WHERE `idAdmin` = $idUser";
                $result = $conn->query($checkAdminSql);
                if ($result->num_rows == 0) {
                    $insertAdminSql = "INSERT INTO `administrator` (idAdmin) VALUES ($idUser)";
                    $conn->query($insertAdminSql);
                }
            } else {
                // Si no es administrador, eliminarlo de la tabla 'administrator'
                $deleteAdminSql = "DELETE FROM `administrator` WHERE `idAdmin` = $idUser";
                $conn->query($deleteAdminSql);
            }

            echo "Usuario actualizado correctamente.";
        } else {
            echo "Error: " . $conn->error;
        }
    } else {
        echo "Error: El rol no está definido.";
    }
}
?>

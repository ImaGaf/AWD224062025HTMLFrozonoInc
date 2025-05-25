<?php
include_once "conexion.php";

$idUser = $_GET['idUser'];

// Eliminar primero de `administrator` si existe
$conn->query("DELETE FROM `administrator` WHERE idAdmin = $idUser");

// Eliminar de `employee`
$conn->query("DELETE FROM `employee` WHERE idEmployee = $idUser");

// Eliminar de `user`
$conn->query("DELETE FROM `user` WHERE idUser = $idUser");

header("Location: ../pages/editUser.php");
?>

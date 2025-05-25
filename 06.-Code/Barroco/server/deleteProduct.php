<?php
include("conexion.php");

$id = $_POST['id'];

$sql = "DELETE FROM products WHERE id=?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

echo $stmt->affected_rows > 0 ? "success" : "error";
?>

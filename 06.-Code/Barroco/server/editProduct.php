<?php
include("conexion.php");

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];

$sql = "UPDATE products SET name=?, description=?, price=? WHERE id=?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ssdi", $name, $description, $price, $id);
$stmt->execute();

echo $stmt->affected_rows > 0 ? "success" : "error";
?>

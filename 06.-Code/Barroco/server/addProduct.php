<?php
include("conexion.php");

$name = $_POST['name'];
$description = $_POST['description'];
$price = $_POST['price'];

$sql = "INSERT INTO products (name, description, price) VALUES (?, ?, ?)";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("ssd", $name, $description, $price);
$stmt->execute();

echo $stmt->affected_rows > 0 ? "success" : "error";
?>

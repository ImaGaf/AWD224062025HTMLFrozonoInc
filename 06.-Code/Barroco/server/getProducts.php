<?php
include("conexion.php");

$sql = "SELECT * FROM products";
$result = $mysqli->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>

<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $idOrder = intval($_POST['idOrder']);
    $sql = "UPDATE `order` SET status = 'Despachado' WHERE idOrder = $idOrder";
    if ($conn->query($sql)) {
        echo 'ok';
    } else {
        echo 'error';
    }
}
?>

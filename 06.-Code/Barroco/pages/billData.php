<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmar Factura - Barroco</title>
    <link rel="stylesheet" href="../assests/css/billStyle.css">
</head>
<body>

<?php include '../components/header.php'; ?>

<div class="main-payment">
    <div class="resumen">
        <h2>Confirmar Datos de Factura</h2>
        <form action="generarFactura.php" method="POST">
            <input type="hidden" name="idOrder" value="<?= $idOrder ?>">

            <label>Correo electrónico</label>
            <input type="email" name="email" required value="">

            <label>Teléfono</label>
            <input type="text" name="phone" required value="">

            <label>Domicilio;</label>
            <textarea name="deliveryAddress" required></textarea>

            <button type="submit" class="pagar">CONFIRMAR FACTURA</button>
        </form>
    </div>

    <div class="formulario-pago">
        <h3>Resumen de Pedido</h3>
        
            <p><strong></strong><br>
                Cantidad: <br>
                Subtotal: $</p><hr>
        
        <p><strong>Total Pedido:</strong> $</p>
    </div>
</div>

</body>
</html>

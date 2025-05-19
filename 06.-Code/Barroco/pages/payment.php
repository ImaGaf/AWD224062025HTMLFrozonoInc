<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assests/css/paymentPage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <title>Barroco</title>
</head>
<body>
<?php include '../components/header.php'; ?>
<div class="main-payment">
    <div class="resumen">
        <h2>¡Gracias por tu compra!</h2>
        <p>Valoras el arte y trabajo artesanal<br>¡Te lo agradecemos!</p>
        <p class="orden">Orden #31221<br>Llega en 4 días aproximadamente.</p>
        <button class="boton-volver" onclick="window.location.href='index.php'">SEGUIR COMPRANDO</button>
    </div>

    <div class="formulario-pago">
        <button class="apple-pay">
            <i class="fab fa-apple"></i> PAY
        </button>

        <div class="separator">— ¿Desea pagar de otra manera? —</div>
        <form onsubmit="return pagar(event)">
            <label for="correo">Correo</label>
            <input type="email" id="correo" name="correo" required>

            <label for="tarjeta">Información de tarjeta</label>
            <div class="tarjeta-flex">
                <input type="text" placeholder="1234 5678 9012 3456" required>
                <input type="text" placeholder="MM/AA" required>
            </div>

            <label for="nombre">Nombre en tarjeta</label>
            <input type="text" id="nombre" name="nombre" required>

            <button type="submit" class="pagar">PAGAR</button>
        </form>
    </div>
</div>

<script>
    function pagar(event) {
        event.preventDefault();
        alert('¡Pago realizado con éxito!');
        window.location.href = 'index.php';
    }
</script>

</body>
</html>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="../assests/css/loginPage.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div class="contenedor">
        <div class="formulario">
            <h2>BIENVENIDO</h2>
            <form action="../server/login.php" method="post">
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>

                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Contraseña" required>

                <button type="submit">ENTRAR</button>
            </form>
            <div class="google-login">
                <p class="separador">O ingresa con</p>
                <div class="google-icon">G</div>
            </div>
            <p class="registro">¿No tienes una cuenta? <a href="../pages/register.php">Regístrate</a></p>
        </div>

        <div class="imagen">
            <img src="../assests/imgs/backLogin.jpg" alt="Decoración" />
        </div>
    </div>
</body>
</html>
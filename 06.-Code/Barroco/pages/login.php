<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="../assests/css/loginPage.css">
</head>
<body>
    <div class="contenedor">
        <div class="formulario">
            <h2>BIENVENIDO</h2>
            <form action="login.php" method="post">
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>

                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required>

                <button type="submit">ENTRAR</button>
            </form>

            <div class="google-login">
                <span>o</span>
                <div class="google-icon">G</div>
            </div>

            <p class="registro">¿No tienes una cuenta? <a href="register.php">Regístrate</a></p>
        </div>
        <div class="imagen"></div>
    </div>
</body>
</html>

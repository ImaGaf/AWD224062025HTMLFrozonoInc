<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    <link rel="stylesheet" href="../assests/css/register.css">
</head>
<body>
    <div class="contenedor">
        <div class="formulario">
            <h2>CREAR CUENTA</h2>
            <form action="register.php" method="post">
                <label for="usuario">Usuario</label>
                <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>

                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required>

                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required>

                <label for="confirmar">Confirmar contraseña</label>
                <input type="password" id="confirmar" name="confirmar" placeholder="Repite la contraseña" required>

                <button type="submit">REGISTRARSE</button>
            </form>

            <div class="google-login">
                <span>o</span>
                <div class="google-icon">G</div>
            </div>

            <p class="registro">¿Ya tienes una cuenta? <a href="login.php">Inicia sesión</a></p>
        </div>
        <div class="imagen"></div>
    </div>
</body>
</html>


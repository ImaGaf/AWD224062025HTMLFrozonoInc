<!-- login.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../assests/css/loginPage.css">
</head>
<body>
    <div class="card"
    >
        <img src="portadalogin.png" alt="Login portada">

        <div class="form-container">

            <h2>Iniciar Sesión</h2>

            <form method="POST" action="login.php" onsubmit="return validateForm()">
                <input type="email" id="email" name="email" placeholder="Correo electrónico" required>

                <input type="password" id="password" name="password" placeholder="Contraseña" required>
                
                <button type="submit" name="login">Ingresar</button>

                <button type="button" class="google" onclick="loginWithGoogle()">Iniciar con Google</button>
            </form>
            <div class="register-link">
                ¿No tienes cuenta? <a href="#">Regístrate</a>
            </div>
        </div>
    </div>

    <script>
        function validateForm() {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            if (!email || !password) {
                alert('Por favor, completa todos los campos.');
                return false;
            }
            return true;
        }

        function loginWithGoogle() {
            alert('Redirigiendo a inicio de sesión con Google (simulado)');
        }
    </script>

</body>
</html>

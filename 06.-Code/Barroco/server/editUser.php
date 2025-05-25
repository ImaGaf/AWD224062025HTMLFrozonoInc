<?php
include_once "conexion.php";

$editUser = false;
$userData = null;
$userRole = null;  // Inicializar la variable

// Verificar si estamos editando un usuario
if (isset($_GET['id'])) {
    $idUser = $_GET['id'];

    // Consultar el usuario para obtener la información
    $sql = "SELECT u.*, e.role FROM `user` u 
            LEFT JOIN `employee` e ON u.idUser = e.idEmployee
            WHERE u.idUser = $idUser";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        $editUser = true;
        $userRole = $userData['role']; // Obtener el rol del usuario
    }
}

?>

<form action="updateUser.php" method="POST">
    <input type="hidden" name="idUser" value="<?php echo $editUser ? $userData['idUser'] : ''; ?>">

    <label for="firstName">Nombre:</label>
    <input type="text" name="firstName" value="<?php echo $editUser ? $userData['firstName'] : ''; ?>" required><br><br>

    <label for="lastName">Apellido:</label>
    <input type="text" name="lastName" value="<?php echo $editUser ? $userData['lastName'] : ''; ?>" required><br><br>

    <label for="email">Correo electrónico:</label>
    <input type="email" name="email" value="<?php echo $editUser ? $userData['email'] : ''; ?>" required><br><br>

    <!-- Selección del rol -->
    <label for="role">Rol:</label>
    <select id="role" name="role" required>
        <option value="Empleado" <?php echo ($editUser && $userRole == 'Empleado') ? 'selected' : ''; ?>>Empleado</option>
        <option value="Administrador" <?php echo ($editUser && $userRole == 'Administrador') ? 'selected' : ''; ?>>Administrador</option>
        <option value="Cliente" <?php echo ($editUser && $userRole == 'Cliente') ? 'selected' : ''; ?>>Cliente</option>
    </select><br><br>

    <button type="submit"><?php echo $editUser ? 'Actualizar' : 'Registrar'; ?></button>
</form>

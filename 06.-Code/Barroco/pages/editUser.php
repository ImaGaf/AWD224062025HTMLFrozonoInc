<?php
include_once "../server/conexion.php";

// Obtenemos todos los usuarios
$sql = "SELECT * FROM `user`";
$result = $conn->query($sql);

// Comprobar si se está editando un usuario (editar o agregar)
$editUser = isset($_GET['idUser']) ? $_GET['idUser'] : null;

if ($editUser) {
    $editQuery = "SELECT * FROM `user` WHERE `idUser` = $editUser";
    $editResult = $conn->query($editQuery);
    $userData = $editResult->fetch_assoc();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Empleados</title>
    <link rel="stylesheet" href="../assests/css/editUserStyle.css">
</head>
<body>
    <div class="container">
    <h1>Gestión de Empleados</h1>

    <!-- Formulario de Agregar/Editar Empleado -->
    <h2><?php echo $editUser ? 'Editar' : 'Agregar'; ?> Empleado</h2>
    <form id="employeeForm" method="POST" action="../server/<?php echo $editUser ? 'updateUser.php' : 'addUser.php'; ?>">
        <input type="hidden" name="idUser" id="idUser" value="<?php echo $editUser ? $userData['idUser'] : ''; ?>">

        <label for="firstName">Nombre:</label>
        <input type="text" id="firstName" name="firstName" value="<?php echo $editUser ? $userData['firstName'] : ''; ?>" required><br><br>

        <label for="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" value="<?php echo $editUser ? $userData['lastName'] : ''; ?>" required><br><br>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value="<?php echo $editUser ? $userData['email'] : ''; ?>" required><br><br>

        <label for="role">Rol:</label>
        <select id="role" name="role" required>
            <option value="Empleado" <?php echo $editUser && $userData['role'] == 'Empleado' ? 'selected' : ''; ?>>Empleado</option>
            <option value="Administrador" <?php echo $editUser && $userData['role'] == 'Administrador' ? 'selected' : ''; ?>>Administrador</option>
        </select><br><br>

        <button type="submit"><?php echo $editUser ? 'Actualizar' : 'Agregar'; ?> Empleado</button>
    </form>

    <h2>Lista de Empleados</h2>
    <table id="employeeList">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php while ($row = $result->fetch_assoc()): ?>
                <tr>
                    <td><?php echo $row['idUser']; ?></td>
                    <td><?php echo $row['firstName']; ?></td>
                    <td><?php echo $row['lastName']; ?></td>
                    <td><?php echo $row['email']; ?></td>
                    <td><?php echo $row['role']; ?></td>
                    <td>
                        <a href="editUser.php?idUser=<?php echo $row['idUser']; ?>">Editar</a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>

    <script src="assets/js/app.js"></script>
    </div>
</body>
</html>

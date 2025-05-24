<?php
include_once "../server/conexion.php";

$sql = "SELECT * FROM `user`";
$result = $conn->query($sql);
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
    <h2>Agregar o Editar Empleado</h2>
    <form id="employeeForm">
        <input type="hidden" name="action" id="action" value="add">
        <input type="hidden" name="idUser" id="idUser" value="">

        <label for="firstName">Nombre:</label>
        <input type="text" id="firstName" name="firstName" required><br><br>

        <label for="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" required><br><br>

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="role">Rol:</label>
        <input type="text" id="role" name="role" required><br><br>

        <button type="submit" id="submitBtn">Agregar Empleado</button>
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
                        <button class="editBtn" data-id="<?php echo $row['idUser']; ?>">Editar</button>
                        <button class="deleteBtn" data-id="<?php echo $row['idUser']; ?>">Eliminar</button>
                    </td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>

    <script src="assets/js/app.js"></script>
    </div>
</body>
</html>

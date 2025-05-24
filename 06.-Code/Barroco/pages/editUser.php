<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Empleados</title>
</head>
<body>
    <h2>Formulario de Empleados</h2>
        <form id="employeeForm" action="/backend/controllers/employeeController.php" method="POST">
        <input type="hidden" name="action" value="add">
        <label for="firstName">Nombre:</label>
        <input type="text" id="firstName" name="firstName" required><br><br>

        <label for="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" required><br><br>

        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="role">Rol:</label>
        <input type="text" id="role" name="role" required><br><br>

        <input type="submit" value="Agregar Empleado">
    </form>

    <h2>Lista de Empleados</h2>
    <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
            </tr>
        </thead>
    <tbody id="employeeList"></tbody>
    </table>

    <script src="components/employeeList.js"></script>
    <script src="components/employeeForm.js"></script>
</body>
</html>

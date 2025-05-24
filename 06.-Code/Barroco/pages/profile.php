<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <title>Mi Perfil</title>
    <link rel="stylesheet" href="../assests/css/userProfile.css" />
</head>

<body>
    <header>
        <?php include '../components/header.php'; ?>
    </header>

    <main class="profile-main">
        <h2 class="profile-title">Perfil</h2>
        <div class="profile-container">


            <div class="profile-item" data-field="firstName">
                <span class="label">Nombre:</span>
                <span class="value" id="value-firstName">Cargando...</span>
                <button class="edit-icon" id="edit-firstName"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="save-btn" id="save-firstName" style="display:none;">Guardar</button>
            </div>

            <div class="profile-item" data-field="lastName">
                <span class="label">Apellido:</span>
                <span class="value" id="value-lastName">Cargando...</span>
                <button class="edit-icon" id="edit-lastName"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="save-btn" id="save-lastName" style="display:none;">Guardar</button>
            </div>

            <div class="profile-item" data-field="email">
                <span class="label">Correo:</span>
                <span class="value" id="value-email">Cargando...</span>
                <button class="edit-icon" id="edit-email"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="save-btn" id="save-email" style="display:none;">Guardar</button>
            </div>

            <div class="profile-item" data-field="phone">
                <span class="label">Teléfono:</span>
                <span class="value" id="value-phone">Cargando...</span>
                <button class="edit-icon" id="edit-phone"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="save-btn" id="save-phone" style="display:none;">Guardar</button>
            </div>

            <div class="profile-item" data-field="billingAddress">
                <span class="label">Dirección de Facturación:</span>
                <span class="value" id="value-billingAddress">Cargando...</span>
                <button class="edit-icon" id="edit-billingAddress"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="save-btn" id="save-billingAddress" style="display:none;">Guardar</button>
            </div>
        </div>
    </main>

    <script src="../assests/js/profile.js"></script>
</body>

</html>
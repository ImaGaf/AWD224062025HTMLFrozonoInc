document.getElementById('employeeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let formData = new FormData(this);
    let action = formData.get('action');

    fetch('server/manageUser.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            location.reload();
        }
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('editBtn')) {
        let id = e.target.dataset.id;

        fetch(`server/manageUser.php?action=edit&idUser=${id}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('action').value = 'edit';
                document.getElementById('idUser').value = id;
                document.getElementById('firstName').value = data.firstName;
                document.getElementById('lastName').value = data.lastName;
                document.getElementById('email').value = data.email;
                document.getElementById('role').value = data.role;
                document.getElementById('submitBtn').textContent = 'Actualizar Empleado';
            })
            .catch(error => console.error('Error:', error));
    }

    if (e.target.classList.contains('deleteBtn')) {
        let id = e.target.dataset.id;

        // Confirmación antes de eliminar
        if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
            fetch('server/manageUser.php', {
                method: 'POST',
                body: new URLSearchParams({
                    action: 'delete',
                    idUser: id
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.status === 'success') {
                    location.reload();
                }
            })
            .catch(error => console.error('Error:', error));
        }
    }
});

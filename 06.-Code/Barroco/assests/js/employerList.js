fetch('/backend/controllers/employeeController.php')
    .then(response => response.json())
    .then(data => {
        const employeeList = document.getElementById('employeeList');
        data.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.idUser}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.role}</td>
                <td>
                    <button onclick="editEmployee(${employee.idUser})">Editar</button>
                    <button onclick="deleteEmployee(${employee.idUser})">Eliminar</button>
                </td>
            `;
            employeeList.appendChild(row);
        });
    });

function editEmployee(id) {
    // Lógica para editar empleado
    window.location.href = `/frontend/editEmployee.html?id=${id}`;
}

function deleteEmployee(id) {
    fetch('/backend/controllers/employeeController.php', {
        method: 'POST',
        body: JSON.stringify({ deleteEmployeeId: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

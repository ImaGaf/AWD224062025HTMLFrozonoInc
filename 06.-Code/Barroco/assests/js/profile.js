document.addEventListener('DOMContentLoaded', () => {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'billingAddress'];

    fetch('../server/getUser.php')   
        .then(res => {
            if (!res.ok) throw new Error("No autorizado");
            return res.json();
        })
        .then(data => {
            document.getElementById('value-firstName').textContent = data.user.firstName;
            document.getElementById('value-lastName').textContent = data.user.lastName;
            document.getElementById('value-email').textContent = data.user.email;
            document.getElementById('value-phone').textContent = data.customer.phone;
            document.getElementById('value-billingAddress').textContent = data.customer.billingAddress;
        })
        .catch(err => {
            alert("Error cargando los datos del perfil.");
            console.error(err);
        });

    fields.forEach(field => {
        document.getElementById(`edit-${field}`).addEventListener('click', () => editField(field));
        document.getElementById(`save-${field}`).addEventListener('click', () => saveField(field));
    });
});

function editField(field) {
    const valueSpan = document.getElementById(`value-${field}`);
    const currentValue = valueSpan.innerText;
    valueSpan.innerHTML = `<input type="text" id="input-${field}" value="${currentValue}">`;

    document.getElementById(`edit-${field}`).style.display = 'none';
    document.getElementById(`save-${field}`).style.display = 'inline-block';
}

function saveField(field) {
    const input = document.getElementById(`input-${field}`);
    const newValue = input.value.trim();

    if (newValue === "") {
        alert("El campo no puede estar vacío.");
        return;
    }

    fetch("../server/editUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `field=${encodeURIComponent(field)}&value=${encodeURIComponent(newValue)}`
    })
        .then(response => {
            if (!response.ok) throw new Error('Error al guardar los cambios');
            return response.text();
        })
        .then((msg) => {
            const valueSpan = document.getElementById(`value-${field}`);
            valueSpan.innerHTML = newValue;

            document.getElementById(`edit-${field}`).style.display = 'inline-block';
            document.getElementById(`save-${field}`).style.display = 'none';

        })
        .catch(error => {
            alert("Hubo un problema al guardar el cambio.");
            console.error(error);
        });
}

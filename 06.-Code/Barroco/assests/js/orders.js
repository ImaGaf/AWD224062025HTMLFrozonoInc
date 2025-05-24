function changeOrderStatus(event, idOrder) {
    fetch('../server/changeOrderStatus.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `idOrder=${idOrder}`
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'ok') {
            document.getElementById(`estado-${idOrder}`).textContent = 'Despachado';
            const button = event.target;
            button.textContent = 'Despachado';
            button.disabled = true;
        } else {
            alert('Error al cambiar el estado.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error de red al cambiar estado.');
    });
}

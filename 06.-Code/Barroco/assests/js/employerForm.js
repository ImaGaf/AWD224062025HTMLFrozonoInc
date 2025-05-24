const form = document.getElementById('employeeForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const action = formData.get('action');
    
    fetch('/backend/controllers/employeeController.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

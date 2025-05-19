
document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.getElementById("quantity");
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");

    decreaseBtn.addEventListener("click", () => {
        let current = parseInt(quantityInput.value);
        if (current > 1) {
            quantityInput.value = current - 1;
        }
    });

    increaseBtn.addEventListener("click", () => {
        let current = parseInt(quantityInput.value);
        quantityInput.value = current + 1;
    });
});

document.querySelector('.add-to-cart').addEventListener('click', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const quantity = parseInt(document.getElementById('quantity').value);
    fetch('../server/addToCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `productId=${productId}&quantity=${quantity}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Producto añadido al carrito.');
            window.location.href = `index.php`;
        } else {
            alert('Error al añadir al carrito.');
        }
    });
});


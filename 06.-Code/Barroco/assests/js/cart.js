async function getCartFromServer() {
    try {
        const response = await fetch('../server/getCar.php');
        if (!response.ok) throw new Error("Error al cargar carrito");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function updateQty(idItemCart, change) {
    const itemSpan = document.querySelector(`button[data-id='${idItemCart}']`).parentNode.querySelector("span");
    let quantity = parseInt(itemSpan.innerText) + change;
    if (quantity < 1) quantity = 1;

    const response = await fetch('../server/updateCart.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idItemCart, quantity })
    });

    const result = await response.json();
    if (result.success) {
        renderCart();
    } else {
        alert("Error al actualizar el carrito: " + (result.message || "Desconocido"));
    }
}


async function renderCart() {
    const cart = await getCartFromServer();
    const container = document.getElementById("cart-items");
    container.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <input type="checkbox" checked>
            <img src="${item.img}" alt="${item.name}" class="cart-img">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p><strong>Precio:</strong> ${parseFloat(item.price).toFixed(2)}$</p>
                <p>${item.desc}</p>
            </div>
            <div class="cart-quantity">
                <button data-id="${item.idItemCart}" class="btn-minus">-</button>
                <span>${item.quantity}</span>
                <button data-id="${item.idItemCart}" class="btn-plus">+</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById("total-price").innerHTML = `<strong>Total: ${total.toFixed(2)}$</strong>`;
}


document.addEventListener("DOMContentLoaded", () => {
    renderCart();

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-minus")) {
            const id = parseInt(e.target.dataset.id);
            updateQty(id, -1);
        }
        if (e.target.classList.contains("btn-plus")) {
            const id = parseInt(e.target.dataset.id);
            updateQty(id, 1);
        }
    });
});

document.getElementById("pay-button").addEventListener("click", () => {
    window.location.href = "../pages/payment.php";
});

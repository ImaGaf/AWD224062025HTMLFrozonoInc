// Datos iniciales quemados
const defaultCart = [
    {
        id: 1,
        img: "../assests/imgs/cart1.png",
        name: "Frasco de Ornitorrinco",
        price: 25.00,
        desc: "Frasco en forma de Ornitorrinco.",
        quantity: 1
    },
    {
        id: 2,
        img: "../assests/imgs/cart2.png",
        name: "Juegos de platos",
        price: 74.99,
        desc: "Juego de platos de cerámica; 4 platos soperos, 4 platos pequeños, 4 tazas.",
        quantity: 1
    },
    {
        id: 3,
        img: "../assests/imgs/cart3.png",
        name: "Florero con decoraciones doradas",
        price: 15.50,
        desc: "Florero de cerámica con estampado de flores en azul y decoraciones doradas.",
        quantity: 1
    },
    {
        id: 4,
        img: "../assests/imgs/cart2.png",
        name: "Taza personalizada",
        price: 9.99,
        desc: "Taza de cerámica blanca con diseño personalizado.",
        quantity: 1
    }
];

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart) {
        cart = JSON.parse(cart);
        // Agrega automáticamente productos nuevos del defaultCart que no estén en el cart actual
        defaultCart.forEach(defaultItem => {
            if (!cart.some(item => item.id === defaultItem.id)) {
                cart.push(defaultItem);
            }
        });
        return cart;
    } else {
        return defaultCart;
    }
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
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
                <p><strong>Precio:</strong> ${item.price.toFixed(2)}$</p>
                <p>${item.desc}</p>
            </div>
            <div class="cart-quantity">
                <button data-id="${item.id}" class="btn-minus">-</button>
                <span>${item.quantity}</span>
                <button data-id="${item.id}" class="btn-plus">+</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById("total-price").innerHTML = `<strong>Total: ${total.toFixed(2)}$</strong>`;

    // Asignar eventos
    document.querySelectorAll(".btn-plus").forEach(btn => {
        btn.addEventListener("click", () => updateQty(parseInt(btn.dataset.id), 1));
    });

    document.querySelectorAll(".btn-minus").forEach(btn => {
        btn.addEventListener("click", () => updateQty(parseInt(btn.dataset.id), -1));
    });

    // Guardar los cambios en el carrito sincronizado
    saveCart(cart);
}

function updateQty(id, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        saveCart(cart);
        renderCart();
    }
}

window.addEventListener("DOMContentLoaded", renderCart);

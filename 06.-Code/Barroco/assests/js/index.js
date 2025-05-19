document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        card.addEventListener("click", function (e) {
            if (e.target.classList.contains("add-to-cart")) return;

            const productId = card.dataset.id;
            if (productId) {
                window.location.href = `singleProduct.php?id=${productId}`;
            }
        });
    });
});


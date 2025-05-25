document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".product-card");
    const searchInput = document.getElementById("searchInput");
    const filterLinks = document.querySelectorAll(".nav-links a");
    const logoLink = document.querySelector(".logo").parentElement;

    function showAll() {
        cards.forEach(p => p.style.display = "block");
        searchInput.value = "";
        filterLinks.forEach(l => l.classList.remove("active"));
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        cards.forEach(card => {
            const name = card.querySelector(".product-title").textContent.toLowerCase();
            const desc = card.getAttribute("data-description");

            if (name.includes(query) || desc.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });

        filterLinks.forEach(l => l.classList.remove("active"));
    });

    filterLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const category = this.getAttribute("data-filter");

            cards.forEach(card => {
                const cat = card.getAttribute("data-category");
                card.style.display = (cat === category) ? "block" : "none";
            });

            filterLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            searchInput.value = "";
        });
    });

    cards.forEach(card => {
        card.addEventListener("click", function (e) {
            if (e.target.classList.contains("add-to-cart")) return;
            const productId = card.dataset.id;
            if (productId) {
                window.location.href = `singleProduct.php?id=${productId}`;
            }
        });
    });

    logoLink.addEventListener("click", function (e) {
        e.preventDefault();
        showAll();
    });
});

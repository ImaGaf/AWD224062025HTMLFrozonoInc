
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

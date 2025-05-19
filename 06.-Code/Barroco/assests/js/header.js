
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");

    logo.addEventListener("click", function (e) {
        window.location.href = `index.php`;
    });
});

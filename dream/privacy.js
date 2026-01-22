document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const products = document.querySelectorAll('.product');

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase(); // ✅ get string
        products.forEach(product => {
            const name = product.dataset.name.toLowerCase();
            product.style.display = name.includes(value) ? 'block' : 'none';
        });
    });
});
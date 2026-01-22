const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});
function openNav()
{
    document.getElementById("mySidenav").style.width="250px";
}
function closeNav()
{
    document.getElementById("mySidenav").style.width="0";
}
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
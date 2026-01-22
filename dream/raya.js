const quantityInput=document.getElementById('quantity');
function increment()
{
    let currentQuantity=parseInt(quantityInput.value);
    quantityInput.value= ++currentQuantity;
}
function decrement()
{
    let currentQuantity=parseInt(quantityInput.value);
    if(currentQuantity>1)
    {
        quantityInput.value= --currentQuantity;
    }
}
function openNav()
{
    document.getElementById("mySidenav").style.width="250px";
}
function closeNav()
{
    document.getElementById("mySidenav").style.width="0";
}
document.addEventListener('DOMContentLoaded', function(){
    const cartIcon = document.querySelector('.cart_icon');
    const cartSidebar = document.getElementById('cart_sidebar');
    const sidebarClose = document.getElementById('sidebar_close');
    const cartItemsContainer = document.querySelector('.cart_items');
    const cartTotalElement = document.querySelector('.cart_total');
    const cartCountElement = document.querySelector('.cart_icon span');
    const addToCartbuttons = document.querySelectorAll('#btn_shop');
    const checkOut = document.querySelector('.checkout_btn');

    let cart = [];

    function updateCart(){
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart_item');
            cartItem.innerHTML = `
                <p>${item.name} -₹${item.price.toFixed(2)}</p>
                <button class="remove-btn">remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotalElement.textContent = `₹${total.toFixed(2)}`;
        cartCountElement.textContent = cart.length;
    }
    function addToCart(item){
        cart.push(item);
        updateCart();
    }
    function removeFromCart(index){
        cart.splice(index, 1);
        updateCart();
    }
    addToCartbuttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.cart_card');
            const name = card.querySelector('.card_title').textContent;
            const price = parseFloat(card.querySelector('.card_price').textContent.replace
                ('₹', ''));
            const item = { name, price };
            addToCart(item);
        });
    });
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')){
            const index = e.target.dataset.index;
            removeFromCart(index);
        }
    });
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    sidebarClose.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    checkOut.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    })
});
function myFunction(smallImg)
{
    var fullImg=document.getElementById("imagebox");
    fullImg.src=smallImg.src;
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
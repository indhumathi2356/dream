document.addEventListener('DOMContentLoaded', function()
{
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
        cart.forEach((item, index)=>{
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart_item');
            cartItem.innerHTML =' <p>${item.name} - $${item.price.toFixed(2)}</p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" data-index="${index}"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 113v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotalElement.textContent='$${total.toFixed(2)}';
        cartCountElement.textContent=cart.length;
    }
    function addToCart(item)
    {
        cart.push(item);
        updateCart();
    }
    function removeFromCart(index){
        cart.splice(index,1);
        updateCart();
    }
    addToCartbuttons.forEach((button, index)=>
    {
        button.addEventListener('click', ()=>
        {
            const card=button.closest('.cart_card');
            const name=card.querySelector('.card_title').textContent;
            const price=parseFloat(card.querySelector('.card_price').textContent.replace('$',''));
            const item = {name,price};
            addToCart(item);
        });
    });
    cartItemsContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('remove-btn')){
            const index=e.target.dataset.index;
            removeFromCart(index);
        }
    });
    cartIcon.addEventListener('click', ()=>{
        cartSidebar.classList.add('open');
    });
    sidebarClose.addEventListener('click', ()=>{
        cartSidebar.classList.remove('open');
    });
    checkOut.addEventListener('click', ()=>
    {
        cartSidebar.classList.remove('open');
    });
});
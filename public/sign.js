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
document.addEventListener("DOMContentLoaded",()=>{
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
let cartItemA2=JSON.parse(localStorage.getItem("cartItemA2"))||[];
function addToCart(productCard){
    const name=productCard.querySelector(".product-title").textContent;
    const priceText=productCard.querySelector(".product-price").textContent;
    const price=parseFloat(priceText.replace("₹",""));
   const imgSrc = productCard.querySelector(".product-img")?.src||"";
    const existingItem=cartItemA2.find((item)=>item.name ===name);
    if(existingItem){
        existingItem.quantity +=1;
    }
    else{
        cartItemA2.push({
            name,
            price,
            image:imgSrc,
            quantity:1,
        });
    }
    updateLocalStorage();
    displayCartItems();
    updateCartCount();
    showToast(`${name} added to cart`);
}
function removeItem(name)
{
    cartItemA2=cartItemA2.filter((item) =>item.name !==name);
    updateLocalStorage();
    if(document.getElementById("cartItemA2"))
    {
        displayCartItems();
        updateLocalStorage();
        updateCartCount();
    }
}
function updateCartCount()
{
    const countElement=document.getElementById("cart-count");
    const itemCount=cartItemA2.reduce((count,item) => count +item.quantity,0);
    if(countElement)
    {
        countElement.textContent=itemCount;
    }
}
function displayCartItems(){
    const cartContainer=document.getElementById("cartItemA2");
    const totalElement=document.getElementById("cartTotal");
    if(!cartContainer)return;
    cartContainer.innerHTML="";
    let total=0;
    cartItemA2.forEach((item)=>{
        const itemTotal=item.price * item.quantity;
        total +=itemTotal;
        const cartItemA2=document.createElement("div");
        cartItemA2.className="cart-item";
        cartItemA2.innerHTML=`
        <img src="${item.image}" alt="${item.name}"/>
        <div class="cart-title-price">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
        </div>
        <div class="quantity-controls">
        <button onclick="changeQuantity('${item.name}',-1)"><i class="fa-solid fa-minus"></i></button>
       <input type="text" name="" class="cart-item-quantity" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}',this.value)">
        <button onclick="changeQuantity('${item.name}',1)"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="remove-from-cart" onclick="removeItem('${item.name}')"><i class="fa-solid fa-trash"></i></div>
        `;
        cartContainer.appendChild(cartItemA2);
    });
    if(totalElement)
    {
        totalElement.textContent=`Total:₹${total.toFixed(2)}`;
    }
    }
    function changeQuantity(name,delta){
        const item=cartItemA2.find((item)=>item.name ===name);
        if(item){
            item.quantity +=delta;
            if(item.quantity <1){
                removeItem(name);
            }
            else{
                updateLocalStorage();
                displayCartItems();
            }
        }
    }
function updateLocalStorage(){
    localStorage.setItem("cartItemA2",JSON.stringify(cartItemA2));
}
window.onload=function(){
    updateLocalStorage();
    updateCartCount();
    if(document.getElementById("cartItemA2")){
        displayCartItems();
    }
    createToastContainer();
};
function createToastContainer(){
    if(document.getElementById("toast-container")) return;
    const toastContainer=document.createElement("div");
    toastContainer.id="toast-container";
    toastContainer.className="toast-container";
    document.body.appendChild(toastContainer);
}
function showToast(message){
    const toast=document.createElement("div");
    toast.className="toast";
    toast.textContent=message;
    const container=document.getElementById("toast-container");
    container.appendChild(toast);
    setTimeout(()=>{
        toast.classList.add("toast-show");
    },500);
    setTimeout(()=>{
        toast.classList.remove("toast-show");
        setTimeout(()=>{
            if(container.contains(toast)){
                container.removeChild(toast);
            }
        },500);
    },5000);
}
function login()
{
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const response=await fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password,
        })
    });
    const data = await response.json();

      document.getElementById("message").innerText = data.message;
}
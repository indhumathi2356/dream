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
function myFunction()
{
    document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick=function(e)
{
    if(!e.target.matches('.dropbtn'))
    {
        var myDropdown=document.getElementById("dropdown-content");
        if(myDropdown.classList.contains('show'))
        {
            myDropdown.classList.remove('show');
        }
    }
}
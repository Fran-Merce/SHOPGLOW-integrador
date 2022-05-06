import {displayCartItem} from "./cart.js";
const productRedirect = document.querySelector("#button-back")
const logoutBtn = document.getElementById("logoutBtn");
const menuNavMobileClose = document.querySelector('#menuNavMobileClose');
const menuNav = document.querySelector('#menuNavMobile');
const cartLink=document.querySelector("#cartLink")

!localStorage.getItem('isLogged') && window.location.replace('./register.html')
localStorage.getItem('isLogged') ==='false' && window.location.replace('./login.html')
productRedirect.addEventListener("click", () => window.location.href = "./products.html");
menuNav.addEventListener('click', () => navUl.classList.add('activeNav'))
menuNavMobileClose.addEventListener('click', () =>  navUl.classList.remove('activeNav'))
cartLink.addEventListener("click",()=> window.location.href = `/pages/cart.html`)

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogged", false);
  window.location.replace("./login.html")
})

AOS.init();
displayCartItem()
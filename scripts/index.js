import {displayProducts,displayCategories} from "./cards.js"
import { offersProducts, popularProducts } from "../data/products.js";
import { categories } from "../data/products.js";
const popularProductsContainer= document.querySelector('#popularProducts')
const offerProductsCont=document.querySelector('#saleContainerProducts')
const navUl = document.querySelector('#navUl') ;
const menuNavMobileClose = document.querySelector('#menuNavMobileClose');
const menuNav = document.querySelector('#menuNavMobile');
const cartLink=document.querySelector("#cartLink")
const btnRedirectProducts=document.querySelectorAll('.btn-redirect-products')

!localStorage.getItem('isLogged') && window.location.replace('./pages/register.html')
localStorage.getItem('isLogged') ==='false' && window.location.replace('./pages/login.html')


cartLink.addEventListener("click",()=> window.location.href = `/pages/cart.html`)
menuNav.addEventListener('click', () => navUl.classList.add('activeNav'))
menuNavMobileClose.addEventListener('click', () =>  navUl.classList.remove('activeNav'))



displayProducts(popularProducts,'cardProduct','',popularProductsContainer)
displayProducts(offersProducts,'cardProduct','',offerProductsCont)



btnRedirectProducts.forEach(btn=>{
  btn.addEventListener('click',()=>{
    localStorage.removeItem('category')
    window.location.href=`/pages/products.html`
  })
})

displayCategories(categories)
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogged", false);
  window.location.replace = "./pages/login.html";
})
AOS.init();
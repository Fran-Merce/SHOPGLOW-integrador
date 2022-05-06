import {displayCartItem} from "./cart.js";

const productRedirect = document.querySelector("#button-back")
const logoutBtn = document.getElementById("logoutBtn");
productRedirect.addEventListener("click", () => window.location.href = "./products.html");

!localStorage.getItem('isLogged') && window.location.replace('./register.html')
localStorage.getItem('isLogged') ==='false' && window.location.replace('./login.html')

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogged", false);
  window.location.href = "./login.html";
})
AOS.init();
displayCartItem()